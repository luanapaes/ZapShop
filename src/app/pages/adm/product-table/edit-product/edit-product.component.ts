import { Component, Inject, inject, Signal, signal } from '@angular/core';
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
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [
    ReactiveFormsModule, FormsModule,
    MatFormFieldModule, MatSelectModule,
    MatInputModule,
    MatDialogTitle, MatDialogContent,
    MatDialogActions, MatDialogClose,
    MatButtonModule, MatFormFieldModule,
    MatSelectModule, FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  produtosService = inject(ProdutosService)
  matSnackBar = inject(MatSnackBar)
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

  produtoID: string | undefined = '';
  isEdit: boolean = true;

  idProd = ''
  arrayMarcas: string[] = [];

  imageSrc: string | ArrayBuffer | File | null | undefined = null;
  categoriasList: string[] = [];

  marcas: Marca = {
    nome_marca: '',
    categorias: '',
    logomarca: ''
  };

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: string },
    private dialogRef: MatDialogRef<EditProductComponent>,
  ) {
    this.carregarMarcas()

    // fica observando as mudanças no campo de marca e carrega as categorias quando o valor mudar
    this.myProductForm.get('product_marca')?.valueChanges.subscribe(value => {
      this.carregarCategorias(this.myProductForm.controls.product_marca.value);
    });
  }

  ngOnInit() {
    this.produtoID = this.data.id
    this.getProduto(this.data.id);
  }

  //----------------------------
  onCancel() {
    this.dialogRef.close(true);
  }


  getProduto(id: string) {
    this.produtosService.getProdutoById(id).subscribe((produto) => {

      if (produto.marcaId !== undefined) {
        this.getMarcaProd(produto.marcaId).subscribe((marca) => {
          this.marcas = {
            nome_marca: marca.nome_marca,
            categorias: marca.categorias,
            logomarca: marca.logomarca
          }
        });
      }

      this.carregarCategorias(this.marcas.nome_marca);

      // Atribui os dados recebidos ao modelo de produto
      this.produto = produto;
      this.myProductForm.patchValue({
        product_name: produto.nome_produto,
        product_price: produto.produto_preco,
        product_description: produto.produto_descricao,
        product_marca: this.marcas.nome_marca,
        product_categoria: produto.categorias.split(',').map(item => item.trim())
      });
    });
  }

  getMarcaProd(id: number | string): Observable<Marca> {
    return this.marcasService.getMarcaByID(id).pipe(
      map((marca: Marca) => ({
        nome_marca: marca.nome_marca,
        categorias: marca.categorias,
        logomarca: marca.logomarca,
      }))
    );
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
        this.produtoID as string,
        this.myProductForm.value.product_name,
        this.imageSrc as File,
        this.myProductForm.value.product_price,
        this.myProductForm.value.product_description,
        this.myProductForm.value.product_marca,
        this.myProductForm.value.product_categoria
      ).subscribe(() => {
        this.matSnackBar.open("Produto editado com sucesso!", "OK");
        this.dialogRef.close('Produto editado com sucesso!');
        this.router.navigate(['produtos'])
      })
    } else {
      this.matSnackBar.open("Preencha os campos necessários.", "OK");
    }
  }
}