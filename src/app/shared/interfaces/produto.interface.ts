export interface Produto {
    id?: number;
    nome_produto: string;
    produto_imagem?: string;
    produto_preco: number;
    produto_descricao: string;
    categorias: string;
    marcaId?: number;
    nome_marca: string;
}