import prismaClient from "../../Prisma";
import { hash } from "bcryptjs"

interface  CadCarrinho{
    valor_unitario: string
    quantidade: string
    valor_total: string

}

class CarrinhoServices{
    async cadastrarCarrinho({valor_unitario,valor_total,quantidade}:CadCarrinho) {
    const consultavalor_unitario = await prismaClient.carrinho.findFirst({
        where:{
            valor_unitario: valor_unitario
        }
    })

    if (consultavalor_unitario) {
        throw new Error("Cadastro de Produto Concluido")

    }
    const 
    }
}
