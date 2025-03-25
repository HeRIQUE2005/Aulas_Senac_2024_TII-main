import prismaClient from "../../Prisma";

interface CadCarrinho {
    valor_unitario: string
    valor_total: string
    quantidade: string
}

class CarrinhoServices {
    async cadastrarCarrinho({ valor_unitario, quantidade, valor_total }: CadCarrinho) {
        const consultaValor_unitario = await prismaClient.carrinho.findFirst({
            where: {
                valor_unitario: valor_unitario
            }
        })

        if (consultaValor_unitario) {
            throw new Error("Cadastro de Produto Concluido")

        }

        await prismaClient.carrinho.create({
            data: {
                valor_unitario: valor_unitario,
                quantidade: quantidade,
                valor_total: valor_total
            }
        })
        return ({ dados: 'Cadastro de Item feito com sucesso' })
    }
}

export { CarrinhoServices }
