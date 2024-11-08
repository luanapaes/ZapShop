import { Component, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProdutosService } from '../../../../shared/services/ProdutosService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from '../../../../shared/interfaces/produto.interface';
import { FormAddProdutoComponent } from '../../../../shared/components/form-add-produto/form-add-produto.component';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Marca } from '../../../../shared/interfaces/marca.interface';
import { MarcasService } from '../../../../shared/services/MarcasService.service';
import { CurrencyPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    FormAddProdutoComponent, HeaderComponent,
    ReactiveFormsModule, FormsModule,
    MatFormFieldModule, MatSelectModule,
    MatInputModule, CurrencyPipe
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  produtosService = inject(ProdutosService)
  matSnackBar = inject(MatSnackBar)
  product: Produto = inject(ActivatedRoute).snapshot.data['produto'] //carrega o produto vindo da url
  router = inject(Router)

  marcasService = inject(MarcasService);

  produto: Produto = {
    nome_produto: '',
    categorias: '',
    produto_preco: 0,
    produto_descricao: '',
    nome_marca: '',
    produto_imagem: ''
  };

  produtoID = ''
  isEdit: boolean = true;

  arrayMarcas: string[] = [];

  imageSrc: string | ArrayBuffer | File | null = null;
  categoriasList: string[] = [];

  selectedMarca: Signal<string> = signal<string>('');
  categorias: string = '';

  myProductForm = new FormGroup({
    product_id: new FormControl(),
    product_name: new FormControl(),
    produto_image: new FormControl(),
    product_price: new FormControl(),
    product_marca: new FormControl(),
    product_description: new FormControl(),
    product_categoria: new FormControl(),
  });


  constructor(private route: ActivatedRoute) {
    this.carregarMarcas()

    // fica observando as mudanças no campo de marca e carrega as categorias quando o valor mudar
    this.myProductForm.get('product_marca')?.valueChanges.subscribe(value => {
      this.carregarCategorias(this.myProductForm.controls.product_marca.value);
    });

    this.route.params.subscribe(params => {
      const id = params['id'];
      this.produtoID = id
      if (id) {
        this.getProduto(id); // Carrega o produto sempre que o ID mudar
      }
    });
  }

  getProduto(id: string) {
    this.produtosService.getProdutoById(id).
      subscribe((prod) => {
        this.produto = {
          nome_produto: prod.nome_produto,
          categorias: prod.categorias,
          produto_preco: prod.produto_preco,
          produto_descricao: prod.produto_descricao,
          nome_marca: prod.nome_marca,
          produto_imagem: prod.produto_imagem
        }

        // Atualiza o formulário com os dados do produto carregado
        this.myProductForm.patchValue({
          product_name: prod.nome_produto,
          product_price: prod.produto_preco,
          product_description: prod.produto_descricao,
          product_marca: prod.nome_marca,
          product_categoria: prod.categorias
        });
      })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imageSrc = reader.result as string | ArrayBuffer;
      };

      reader.readAsDataURL(file);
    }
  }

  setMarca(marca: string) {
    return this.marcasService.setMarca(marca)
  }

  carregarCategorias(marca: string) {
    // const selectedMarca = this.myProductForm.value.product_marca;

    var re = /\s*,\s*/; // para remover espaços e vírgulas

    if (marca) {
      this.marcasService.getMarcaByName(marca).subscribe(
        (marca: Marca) => {
          var retorno = marca.categorias as string; //forcei para transformar em string
          this.categoriasList = retorno.split(re);
        }
      )
    }
  }

  carregarMarcas() {
    this.marcasService.get().subscribe((marcas: Marca[]) => {
      // usa o map para transformar o array de objetos Marca em um array de strings com os nomes das marcas
      this.arrayMarcas = marcas.map(marca => marca.nome_marca);
    });
  }

  onEdit() {
    if (this.myProductForm) {
      this.produtosService.editProduct(
        this.produtoID,
        this.myProductForm.value.product_name,
        this.imageSrc as File,
        this.myProductForm.value.product_price,
        this.myProductForm.value.product_description,
        this.myProductForm.value.product_marca,
        this.myProductForm.value.product_categoria
      ).subscribe(() => {
        this.matSnackBar.open("Produto cadastrado com sucesso!", "OK");
        this.router.navigate(['produtos'])
      })
    } else {
      this.matSnackBar.open("Preencha os campos necessários.", "OK");
    }
  }
}