import { Component, inject, signal } from '@angular/core';
import { CardProdutoComponent } from '../../shared/components/card-produto/card-produto.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Produto } from '../../shared/interfaces/produto.interface';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ProdutosService } from '../../shared/services/ProdutosService.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CardProdutoComponent, HeaderComponent, FooterComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {
  produtos = signal<Produto[]>(inject(ActivatedRoute).snapshot.data['produtos'])

  
}
