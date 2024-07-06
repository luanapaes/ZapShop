import { Component } from '@angular/core';
import { FormAddProdutoComponent } from '../../shared/components/form-add-produto/form-add-produto.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-cadastro-produtos',
  standalone: true,
  imports: [HeaderComponent,FormAddProdutoComponent],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.scss'
})
export class CadastroProdutosComponent {

}
