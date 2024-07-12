import { Component, EventEmitter, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CarrinhoService } from '../../services/CarrinhoService.service';
import { Produto } from '../../interfaces/produto.interface';
import { CurrencyPipe } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, 
    CurrencyPipe, MatFormFieldModule, 
    MatSelectModule, MatInputModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  constructor(public dialog: MatDialog) { 
  }

  pagamentos: string[] = [
    'Dinheiro',
    'Pix',
    'Cartão',
  ];

  pay = '';

  parcelas: number[] = [1, 2, 3, 4, 5, 6];

  parcela = 0;

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
      return prod.product_price;
    });
    
    const total = valoresProdutos.reduce((acc, curr) => acc + curr, 0);
    
    return total;
  }

  calcularParcelas(){
    return this.calcularCarrinho()/this.parcela;
  }

  finalizarPedido(){
    if(this.produtosCarrinho.length > 0){
      let mensagem = `Olá! Escolhi alguns produtos através do catálogo e desejo finalizar a compra! 😊\nProdutos:${this.produtosCarrinho.map((prod) => { return prod.product_name.replace('', ' ') })
        }.\nPreço total da compra: R$${this.calcularCarrinho()}.`;

      if (this.parcela) {
        const valorParcela = this.calcularParcelas();
        mensagem += `\nForma de pagamento: ${this.pay}. \nParcelado em ${this.parcela}x de R$${valorParcela.toFixed(2)}.`;
      }

      const numeroWhatsApp = "558185624853";

      const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;

      window.open(urlWhatsApp, "_blank");
    }else{
      console.log('sem produtos')
    }
  }
}

function Output(): (target: CartComponent, propertyKey: "openEvent") => void {
  throw new Error('Function not implemented.');
}

