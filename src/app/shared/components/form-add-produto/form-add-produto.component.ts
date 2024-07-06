import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Categoria } from '../../interfaces/categoria.interface';
import { ProdutosService } from '../../services/ProdutosService.service';

@Component({
  selector: 'app-form-add-produto',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule,
    MatSelectModule, MatInputModule],
  templateUrl: './form-add-produto.component.html',
  styleUrl: './form-add-produto.component.scss'
})
export class FormAddProdutoComponent {
  produtosService = inject(ProdutosService)

  myProductForm = new FormGroup({
    product_id: new FormControl(), 
    product_name: new FormControl(),
    product_price: new FormControl(),
    product_marca: new FormControl(),
    product_description: new FormControl(),
    product_categoria: new FormControl(),
  });

  categorias: string[] = [
    'perfume', 'hidratante', 'kit'
  ]
  categoria = '';
  
  onSubmit(){
    if(this.myProductForm.valid){
      console.log("Enviou")
      this.produtosService.addNewProduct(
        this.myProductForm.value.product_id,
        this.myProductForm.value.product_name,
        this.myProductForm.value.product_price,
        this.myProductForm.value.product_description,
        this.myProductForm.value.product_marca,
        this.myProductForm.value.product_categoria
      )
      console.log(this.produtosService.getProdutos())
    } else{
      console.log("Não enviado.")
    }
  }

  
}
