import { Routes } from '@angular/router';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroProdutosComponent } from './pages/cadastro-produtos/cadastro-produtos.component';
import { getProdutos } from './shared/resolvers/getProdutos.resolver';
import { AdmComponent } from './pages/adm/adm.component';
import { getProduto } from './shared/resolvers/getProduto.resolver';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
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
    },
    {
        path: 'edit-product/:id',
        resolve: {
            product: getProduto //função do file(resolvers/get-product)
        },
        loadComponent: () =>
            import('./pages/adm/product-table/edit-product/edit-product.component').then(
                (m) => m.EditProductComponent
            ),

    }
];
