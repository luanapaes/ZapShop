import { Component, inject, signal } from '@angular/core';
import { Marca } from '../../interfaces/marca.interface';
import { NgClass, NgStyle } from '@angular/common';
import { MarcasService } from '../../services/MarcasService.service';


@Component({
  selector: 'app-card-marca',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './card-marca.component.html',
  styleUrl: './card-marca.component.scss'
})
export class CardMarcaComponent {
  marcas: Marca[] = [];
  marcaService = inject(MarcasService);

  ngOnInit(): void {
    this.getMarcas()
  }

  getMarcas(){
    this.marcaService.get().subscribe(
      (data: Marca[]) =>{
        this.marcas = data
      }
    )
  }
}
