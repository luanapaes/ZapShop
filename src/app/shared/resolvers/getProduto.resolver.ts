import { inject } from "@angular/core"
import { ProdutosService } from "../services/ProdutosService.service"
import { ActivatedRouteSnapshot } from "@angular/router"

export const getProduto = (route: ActivatedRouteSnapshot) =>{
    const produtosService = inject(ProdutosService)
    return produtosService.getProdutoById(route.paramMap.get('product_id') as string)
}