import { Component, EventEmitter, inject, signal } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CarrinhoService } from '../../services/CarrinhoService.service';
import { CurrencyPipe } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CartProduct } from '../../interfaces/cart-product.interface';

import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule,
    CurrencyPipe, MatFormFieldModule,
    MatSelectModule, MatInputModule,
    FormsModule, MatRadioModule
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

  total = signal(0)

  entrega: number = 0

  usernameLocalStorage = JSON.parse(localStorage.getItem('firstFormGroup') || '{}');
  userAdressLocalStorage = JSON.parse(localStorage.getItem('secondFormGroup') || '{}');

  produtosCarrinho: CartProduct[] = [];

  carrinho = inject(CarrinhoService);

  ngOnInit(): void {
    this.carregarProdutos()

    this.produtosCarrinho.forEach(produto => {
      if (!produto.qtd_product) {
        produto.qtd_product = 1;
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(CartComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  carregarProdutos() {
    this.produtosCarrinho = this.carrinho.getProdutosCarrinho()
    console.log(this.produtosCarrinho)
  }

  calcularCarrinho() {
    const valoresProdutos = this.produtosCarrinho.map((prod) => {
      return prod.product_price * parseInt(prod.qtd_product.toString());
    });

    let totalCompra = this.total();

    for (let i = 0; i < valoresProdutos.length; i++) {
      let valores = Number(valoresProdutos[i])
      totalCompra += valores;
    }
    return totalCompra
  }

  calcularParcelas() {
    return this.calcularCarrinho() / this.parcela;
  }

  finalizarPedido() {
    if (this.produtosCarrinho.length > 0) {
      let mensagem = `Olá, me chamo ${this.usernameLocalStorage.firstCtrl}! Selecionei alguns produtos do catálogo e gostaria de finalizar a compra. 😊\n\nProdutos:${this.produtosCarrinho.map((prod) => { return prod.product_name.replace('', ' ') + " - " + prod.qtd_product + " " + "uni" })
        }.\nPreço total da compra: R$${this.calcularCarrinho().toFixed(2)}.`;

      if (this.parcela) {
        const valorParcela = this.calcularParcelas();
        mensagem += `\nForma de pagamento: ${this.pay}. \nParcelado em ${this.parcela}x de R$${valorParcela.toFixed(2)}.`;
      }

      if (this.entrega == 1) {
        mensagem += `\nDesejo receber o produto no seguinte endereço: ${this.userAdressLocalStorage.secondCtrl}`
      }

      const numeroWhatsApp = "558185624853";

      const urlWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensagem)}`;

      window.open(urlWhatsApp, "_blank");
    } else {
      console.log('sem produtos')
    }
  }


}

function Output(): (target: CartComponent, propertyKey: "openEvent") => void {
  throw new Error('Function not implemented.');
}

