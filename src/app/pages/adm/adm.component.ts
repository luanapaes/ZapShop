import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { ProductTableComponent } from "./product-table/product-table.component";
import { Produto } from '../../shared/interfaces/produto.interface';
import { Marca } from '../../shared/interfaces/marca.interface';
import { ProdutosService } from '../../shared/services/ProdutosService.service';
import { MarcasService } from '../../shared/services/MarcasService.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-adm',
  standalone: true,
  imports: [HeaderComponent, ProductTableComponent, RouterLink],
  templateUrl: './adm.component.html',
  styleUrl: './adm.component.scss'
})
export class AdmComponent {
  produtos: Produto[] = []
  produtosService = inject(ProdutosService)
  
  marcas: Marca[] = []
  marcasService = inject(MarcasService)

  ngOnInit(): void {
    this.carregarMarcas();
    this.carregarProdutos() 
  }

  carregarProdutos() {
    this.produtosService.getProdutos().subscribe(
      (produto: Produto[]) => {
        this.produtos = produto
      }
    )
  }

  carregarMarcas(){
    this.marcasService.get().subscribe(
      (marca: Marca[]) =>{
        this.marcas = marca
      }
    )
  }
  
}
