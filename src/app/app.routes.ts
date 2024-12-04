import { Routes } from '@angular/router';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { HomeComponent } from './pages/home/home.component';
import { CadastroProdutosComponent } from './pages/cadastro-produtos/cadastro-produtos.component';
import { getProdutos } from './shared/resolvers/getProdutos.resolver';
import { AdmComponent } from './pages/adm/adm.component';
import { getProduto } from './shared/resolvers/getProduto.resolver';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { getMarca } from './shared/resolvers/getMarca.resolver';

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
        component: CadastroProdutosComponent,
        canActivate: [AuthGuard] // Protegendo esta rota
    },
    {
        path: 'area-adm',
        component: AdmComponent,
        canActivate: [AuthGuard] // Protegendo esta rota
    },
    {
        path: 'produto/:id',
        resolve: {
            product: getProduto //função do file(resolvers/get-product)
        },
        component: AdmComponent,
        canActivate: [AuthGuard] // Protegendo esta rota

    },
    {
        path: 'marcas',
        component: MarcasComponent,
        canActivate: [AuthGuard] // Protegendo esta rota
    },
    {
        path: 'marcas/:id',
        resolve: {
            marca: getMarca
        },
        component: MarcasComponent,
        canActivate: [AuthGuard]
    }
];
