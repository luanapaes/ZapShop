import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { ProdutosService } from '../../../shared/services/ProdutosService.service';
import { Produto } from '../../../shared/interfaces/produto.interface';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MarcasService } from '../../../shared/services/MarcasService.service';
import { ConfirmDeleteComponent } from '../../../shared/components/confirm-delete/confirm-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { filter, forkJoin, map, Observable } from 'rxjs';
import { EditProductComponent } from './edit-product/edit-product.component';

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
  nomeMarca = signal<string>('');

  router = inject(Router)

  ngOnInit(): void {
    this.carregarProdutos()
  }

  //carrega nome da marca pelo id 
  getMarcaByID(id: number) {
    this.marcasService.getMarcaByID(id).subscribe(
      (marca) => {
        this.nomeMarca.set(marca.nome_marca)
      }
    )
  }

  carregarProdutos() {
    this.produtosService.getProdutos().subscribe(
      (produtos: Produto[]) => {
        // cria um array de observáveis para buscar as marcas
        const produtosComMarcas$ = produtos.map((produto) =>
          this.marcasService.getMarcaByID(produto.marcaId!).pipe(
            map(marca => ({
              ...produto,
              nome_marca: marca.nome_marca // adiciona o nome da marca ao produto
            }))
          )
        );

        // console.log("chegou aqui", produtosComMarcas$)

        // usei o forkJoin para esperar todas as requisições
        forkJoin(produtosComMarcas$).subscribe(
          (produtosComMarcas) => {
            this.produtosArray = produtosComMarcas;
          },
          (error) => {
            console.error("Erro ao carregar produtos com marcas:", error);
          }
        );
      },
      (error) => {
        console.error("Erro ao carregar produtos:", error);
      }
    );
  }

  openDialogEditProduct(id: number) {
    this.router.navigate(['produto', id]).then(() => {
      const dialogRef = this.dialog.open(EditProductComponent, {
        data: { id: String(id) }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.router.navigate(['area-adm']); 
        }
      });
    });
  }



  openDialog(): Observable<boolean> {
    return this.dialog.open(ConfirmDeleteComponent,
      {
        height: 'auto',
        width: '280px'
      }
    ).afterClosed()
  }

  onDelete(id: number) {
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
