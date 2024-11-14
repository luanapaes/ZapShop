import { Component, inject, signal } from '@angular/core';
import { CardProdutoComponent } from '../../shared/components/card-produto/card-produto.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Produto } from '../../shared/interfaces/produto.interface';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { FiltrosComponent } from '../../shared/components/filtros/filtros.component';
import { MarcasService } from '../../shared/services/MarcasService.service';
import { CustomMarca } from '../../shared/interfaces/custom-marca.interface';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [CardProdutoComponent, HeaderComponent, FooterComponent, FiltrosComponent],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.scss'
})
export class ProdutosComponent {
  produtos = signal<Produto[]>(inject(ActivatedRoute).snapshot.data['produtos'])
  nomeMarca: string = '';

  marca = signal<string>('');
  arrayProdutosFiltrados = signal<Produto[]>([])

  marcasService = inject(MarcasService);

  filtrarProdutos() {
    this.marca.set(this.getMarca())
  
    this.marcasService.getProdutosFiltrados(this.marca()).subscribe(
      (marca: CustomMarca) => {
        this.arrayProdutosFiltrados.set(marca.produtos)
      }
    )
  }

  getMarca() {
    const marca = this.marcasService.getMarca(); //guarda valor do retorno em uma const
    this.marca.set(marca); // atributi o valor à propriedade marca
    return marca;
  }
}
