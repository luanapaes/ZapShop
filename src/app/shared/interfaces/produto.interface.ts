export interface Produto {
    produto_id?: number;
    nome_produto: string;
    produto_image: string;
    produto_preco: number;
    produto_descricao: string;
    categorias: string;
    marcaId?: number;
    nome_marca: string;
}