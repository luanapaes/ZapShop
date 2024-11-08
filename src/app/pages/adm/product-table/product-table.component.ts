import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ProdutosService } from '../../../shared/services/ProdutosService.service';
import { Produto } from '../../../shared/interfaces/produto.interface';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MarcasService } from '../../../shared/services/MarcasService.service';
import { ConfirmDeleteComponent } from '../../../shared/components/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})

export class ProductTableComponent {
  constructor(public dialog: MatDialog) { }
  
  produtosService = inject(ProdutosService)
  produtosArray: Produto[] = [];

  marcasService = inject(MarcasService);
  nomeMarca: string = '';

  router = inject(Router)

  ngOnInit(): void {
    this.carregarProdutos()
  }

  //carrega nome da marca pelo id 
  getMarcaByID(id: number) {
    this.marcasService.getMarcaByID(id).subscribe(
      (marca) => {
        this.nomeMarca = marca.nome_marca
      }
    )
  }

  carregarProdutos() {
    this.produtosService.getProdutos().subscribe(
      (produto: Produto[]) => {
        produto.map((prod) => this.getMarcaByID(prod.marcaId!)) //carrega nome da marca
        this.produtosArray = produto
      }
    )
  }

  onEdit(produto: Produto) {
    this.router.navigate(['edit-product', produto.id])
  }

  openDialog(): Observable<boolean> {
    return this.dialog.open(ConfirmDeleteComponent, 
      { 
        height: 'auto', 
        width: '280px' 
      }
    ).afterClosed()
  }

  onDelete(id: number){
    this.openDialog()
    .pipe(filter((anwser) => anwser === true))
      .subscribe(() => {
        this.produtosService.deleteProductById(id).subscribe(() => {
          this.produtosService.getProdutos().subscribe((prod) => {
            this.produtosArray = prod
          })
        });
      })
  }
  
}
