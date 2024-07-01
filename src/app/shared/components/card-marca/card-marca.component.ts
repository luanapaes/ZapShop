import { Component, signal } from '@angular/core';
import { Marca } from '../../interfaces/marca.interface';
import { NgClass, NgStyle } from '@angular/common';


@Component({
  selector: 'app-card-marca',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './card-marca.component.html',
  styleUrl: './card-marca.component.scss'
})
export class CardMarcaComponent {

  public listMarcas = signal<Marca[]>([
    {
      nome_marca: "Natura",
      categorias: ['perfume', 'hidratante', 'sabonete'],
      url_logo: '../../../../assets/marcas/logo-natura.png'
    },
    {
      nome_marca: "oBoticario",
      categorias: ['perfume', 'hidratante', 'sabonete'],
      url_logo: '../../../../assets/marcas/logo-oboticario.jpg'
    },
    {
      nome_marca: "Eudora",
      categorias: ['perfume', 'hidratante', 'sabonete'],
      url_logo: '../../../../assets/marcas/logo-eudora2.png'
    },
    {
      nome_marca: "Hinode",
      categorias: ['perfume', 'hidratante', 'sabonete'],
      url_logo: '../../../../assets/marcas/logo-hinode2.png'
    },
  ])
}
