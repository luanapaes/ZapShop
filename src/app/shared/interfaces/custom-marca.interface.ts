import { Produto } from "./produto.interface";

export interface CustomMarca {
    id: string,
    usuarioId: string,
    nome_marca: string;
    categorias: string | string[],
    logomarca: string,
    produtos: Produto[]
}