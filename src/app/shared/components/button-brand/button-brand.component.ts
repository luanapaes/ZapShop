import { Component, signal } from '@angular/core';
import { Categoria } from '../../interfaces/categoria.interface';

@Component({
  selector: 'app-button-brand',
  standalone: true,
  imports: [],
  templateUrl: './button-brand.component.html',
  styleUrl: './button-brand.component.scss'
})
export class ButtonBrandComponent {
  public listCategorias = signal<Categoria[]>([
    {
      categoria_name: "Perfumes",
      categoria_url: "/perfumes"
    },
    {
      categoria_name: "Hidratantes",
      categoria_url: "/hidratantes"
    },
    {
      categoria_name: "Sabonetes",
      categoria_url: "/sabonetes"
    },
    {
      categoria_name: "Kits",
      categoria_url: "/kits"
    }
  ])
}
