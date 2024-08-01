import { Routes } from '@angular/router';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroProdutosComponent } from './pages/cadastro-produtos/cadastro-produtos.component';
import { getProdutos } from './shared/resolvers/getProdutos.resolver';
import { AdmComponent } from './pages/adm/adm.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'produtos',
        resolve: {
            produtos: getProdutos
        },
        component: ProdutosComponent
    },
    {
        path: 'cadastrar-produto',
        component: CadastroProdutosComponent
    },
    {
        path: 'area-adm',
        component: AdmComponent
    }
];
