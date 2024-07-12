import { inject } from "@angular/core";
import { ProdutosService } from "../services/ProdutosService.service";

export const getProdutos = () => {
    const produtosServices = inject(ProdutosService)
    return produtosServices.getProdutos()
}