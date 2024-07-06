import { Routes } from '@angular/router';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroProdutosComponent } from './pages/cadastro-produtos/cadastro-produtos.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'produtos',
        component: ProdutosComponent
    },{
        path: 'cadastrar-produto',
        component: CadastroProdutosComponent
    }
];
