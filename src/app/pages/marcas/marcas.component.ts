import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AdmComponent } from "../adm/adm.component";
import { MarcasService } from '../../shared/services/MarcasService.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateMarcaDialogComponent } from '../adm/product-table/create-marca-dialog/create-marca-dialog.component';
import { CustomMarca } from '../../shared/interfaces/custom-marca.interface';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [HeaderComponent, AdmComponent],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss'
})
export class MarcasComponent {
  marcasService = inject(MarcasService);
  arrayMarcas: CustomMarca[] = [];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.carregarMarcas()
  }

  carregarMarcas(){
    this.marcasService.get().subscribe(
      (marcas) => {
        this.arrayMarcas = marcas
      }
    )
  }

  openDialog() {
    this.dialog.open(CreateMarcaDialogComponent);
  }

  onDelete(id: string){

  }

  onEdit(marca: CustomMarca){

  }
}
