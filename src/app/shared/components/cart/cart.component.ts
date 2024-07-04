import { Component, EventEmitter, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CarrinhoService } from '../../services/CarrinhoService.service';
import { Produto } from '../../interfaces/produto.interface';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public dialog: MatDialog) { 
  }
  produtosCarrinho: Produto[] = [];

  carrinho = inject(CarrinhoService);

  ngOnInit(): void {
    this.carregarProdutos()
    
  }

  openDialog() {
    const dialogRef = this.dialog.open(CartComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  carregarProdutos(){
    this.produtosCarrinho = this.carrinho.getProdutosCarrinho()
    console.log(this.produtosCarrinho)
  }

  calcularCarrinho() {
    const valoresProdutos = this.produtosCarrinho.map((prod) => {
      return parseFloat(prod.product_price);
    });
    
    const total = valoresProdutos.reduce((acc, curr) => acc + curr, 0);

    return total;
  }
}

function Output(): (target: CartComponent, propertyKey: "openEvent") => void {
  throw new Error('Function not implemented.');
}

