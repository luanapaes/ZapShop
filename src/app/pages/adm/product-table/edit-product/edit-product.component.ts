import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ProdutosService } from '../../../../shared/services/ProdutosService.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from '../../../../shared/interfaces/produto.interface';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  produtosService = inject(ProdutosService)
  matSnackBar = inject(MatSnackBar)
  product: Produto = inject(ActivatedRoute).snapshot.data['produto'] //carrega o produto vindo da url
  router = inject(Router)

  onSubmit(product: Produto) {
    this.produtosService.editProduct(this.product.product_id, product).
      subscribe(() => {
        this.matSnackBar.open("Produto editado com sucesso!", "Ok")
        this.router.navigateByUrl('/')
      })
  }
}
