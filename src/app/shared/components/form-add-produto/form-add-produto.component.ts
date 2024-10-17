import { Component, ElementRef, inject, Signal, signal, SimpleChanges, viewChild, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProdutosService } from '../../services/ProdutosService.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MarcasService } from '../../services/MarcasService.service';
import { Marca } from '../../interfaces/marca.interface';

@Component({
  selector: 'app-form-add-produto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule,
    MatSelectModule, MatInputModule],
  templateUrl: './form-add-produto.component.html',
  styleUrl: './form-add-produto.component.scss'
})
export class FormAddProdutoComponent {
  matSnackBar = inject(MatSnackBar)
  produtosService = inject(ProdutosService);
  marcasService = inject(MarcasService);
  router = inject(Router)

  arrayMarcas: string[] = [];

  imageSrc: string | ArrayBuffer | File| null = null;
  categoriasList: string[] = [];


  myProductForm = new FormGroup({
    product_id: new FormControl(),
    product_name: new FormControl(),
    produto_image: new FormControl(),
    product_price: new FormControl(),
    product_marca: new FormControl(),
    product_description: new FormControl(),
    product_categoria: new FormControl(),
  });

  constructor() {
    this.carregarMarcas()

    // fica observando as mudanças no campo de marca e carrega as categorias quando o valor mudar
    this.myProductForm.get('product_marca')?.valueChanges.subscribe(value => {
      this.carregarCategorias(this.myProductForm.controls.product_marca.value);
    });
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

  selectedMarca: Signal<string> = signal<string>('');
  categorias: string = '';

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


  onSubmit() {
    if (this.myProductForm.valid) {
      this.produtosService.addNewProduct(
        this.myProductForm.value.product_name,
        this.imageSrc as File,
        this.myProductForm.value.product_price,
        this.myProductForm.value.product_description,
        this.myProductForm.value.product_marca,
        this.myProductForm.value.product_categoria
      ).subscribe(() => {
        this.matSnackBar.open("Produto cadastrado com sucesso!", "OK")
        this.router.navigate(['produtos'])
      })
    } else {
      this.matSnackBar.open("Preencha os campos necessários.", "OK")
      console.log("Não enviado.")
    }
  }

}
