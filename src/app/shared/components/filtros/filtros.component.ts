import { Component, effect, inject, signal, SimpleChanges } from '@angular/core';
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
  constructor(){

    //monitora mudança nas propriedades e chama a função
    effect(() => {
      const marca = this.selectedMarca();
      const categoria = this.selectedCategoria();
      this.filtrarProdutos(marca, categoria);
    })
  }
  
  marcas: Marca[] = [];
  marcasServices = inject(MarcasService);
  produtosServices = inject(ProdutosService);

  categoriasDaMarcaSelecionada: Marca[] = [];

  produtosFiltrados: Produto[] = [];

  selectedMarca = signal<string>('');
  selectedCategoria = signal<string>('');

  ngOnInit(): void {
    this.carregarMarcas()
  }

  ngAfterContentInit(): void {
    this.carregarCategoriasDaMarca()
  }

  carregarMarcas() {
    this.marcasServices.get().subscribe(
      (marca: Marca[]) => {
        this.marcas = marca
      }
    )
  }

  carregarCategoriasDaMarca() {
    this.marcasServices.getMarca(this.selectedMarca()).subscribe(
      (categorias: Marca[]) => {
        this.categoriasDaMarcaSelecionada = categorias
      }
    )
  }

  filtrarProdutos(marca: string, categoria: string) {
    this.marcasServices.getProdutosFiltrados(marca, categoria).subscribe(
      (produtos: Produto[]) => {
        this.produtosFiltrados = produtos;
      }
    )
  }
}
