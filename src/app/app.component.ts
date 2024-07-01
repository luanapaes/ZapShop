import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FaixaAnimadaComponent } from './shared/components/faixa-animada/faixa-animada.component';
import { ButtonBrandComponent } from './shared/components/button-brand/button-brand.component';
import { CardMarcaComponent } from './shared/components/card-marca/card-marca.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CardProdutoComponent } from './shared/components/card-produto/card-produto.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
