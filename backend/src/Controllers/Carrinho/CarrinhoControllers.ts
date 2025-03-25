import { Request, Response } from "express";
import {CarrinhoServices} from '../../Services/Carrinho/CarrinhoServices'

class CarrinhoController {
    async cadastrarcarrinho(req: Request, res: Response) {
        const{
            valor_unitario,
            quantidade,
            valor_total,
        } = req.body
        
        const enviarDadosServices = new CarrinhoServices()
        const resposta = await enviarDadosServices.cadastrarCarrinho({
            valor_unitario,
            quantidade,
            valor_total,
        })
        return res.json(resposta)
    }
}

export {CarrinhoController}