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
import { Categoria } from '../../interfaces/categoria.interface';

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

  imageSrc: string | ArrayBuffer | null = null;
  categoriasList: string[] = []; // Inicia com array vazio

  myProductForm = new FormGroup({
    product_id: new FormControl(),
    product_name: new FormControl(),
    product_image: new FormControl(),
    product_price: new FormControl(),
    product_marca: new FormControl(),
    product_description: new FormControl(),
    product_categoria: new FormControl(),
  });

  constructor() {
    // Observa mudanças no campo de marca e carrega as categorias quando o valor mudar
    this.myProductForm.get('product_marca')?.valueChanges.subscribe(value => {
      this.carregarCategorias();
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log("categorias", this.carregarCategorias())
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

  carregarCategorias() {
    const selectedMarca = this.myProductForm.value.product_marca;
    console.log(selectedMarca)
    if (selectedMarca) {
      this.marcasService.getMarcaByName(selectedMarca).subscribe(
        (marca: Marca) => {
          console.log(marca)
          return marca.categorias as string[]
        }
      )
    }
  }


  onSubmit() {
    if (this.myProductForm.valid) {
      this.produtosService.addNewProduct(
        this.myProductForm.value.product_id,
        this.myProductForm.value.product_name,
        this.myProductForm.value.product_image,
        this.myProductForm.value.product_price,
        this.myProductForm.value.product_description,
        this.myProductForm.value.product_marca,
        this.myProductForm.value.product_categoria
      ).subscribe(() => {
        this.matSnackBar.open("Produto cadastrado com sucesso!", "OK")
        this.router.navigate(['produtos'])
      })
    } else {
      console.log("Não enviado.")
    }
  }

}
