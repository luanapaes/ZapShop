import { Component, EventEmitter, inject, Output, Signal, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MarcasService } from '../../services/MarcasService.service';
import { Marca } from '../../interfaces/marca.interface';
import { FormsModule } from '@angular/forms';
import { ProdutosService } from '../../services/ProdutosService.service';
import { Produto } from '../../interfaces/produto.interface';

@Component({
  selector: 'app-filtros',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss'
})
export class FiltrosComponent {
  marcas: Marca[] = [];
  marcasServices = inject(MarcasService);
  produtosServices = inject(ProdutosService);

  categoriasDaMarcaSelecionada: Marca[] = [];

  produtosFiltrados: Produto[] = [];

  selectedMarca: Signal<string> = signal<string>('');

  ngOnInit(): void {
    this.carregarMarcas()
  }

  ngAfterContentInit(): void {
    this.carregarProdutosDaMarca()
  }

  //carrega todas as marcas para ficarem visíveis no select
  carregarMarcas() {
    this.marcasServices.get().subscribe(
      (marca: Marca[]) => {
        this.marcas = marca
      }
    )
  }

  //carrega os produtos da marca selecionada no select
  carregarProdutosDaMarca() {
    this.marcasServices.getProdutosDaMarca(this.selectedMarca()).subscribe(
      (categorias: Marca[]) => {
        this.categoriasDaMarcaSelecionada = categorias
      }
    )
  }

  // setMarca(marca: string){
  //   return this.marcasServices.setMarca(marca)
  // }
}
