import { Produto } from "./produto.interface";

export interface CartProduct extends Produto{
    qtd_product: number;
}