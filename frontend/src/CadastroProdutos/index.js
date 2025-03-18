import { useState, useContext } from 'react'
import { AutenticadoContexto } from '../Contexts/authContexts'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import apiLocal from '../Api/apiLocal'
import './estilo.cadastroProdutos.scss'

export default function CadastroProdutos() {

    const { verificarToken, token } = useContext(AutenticadoContexto)
    verificarToken()

    const navegar = useNavigate()

    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState('')
    const [imagem, setImagem] = useState(null)
    console.log(nome, preco)

    function pegarImagem(e) {
        if (!e.target.files) {
            return
        }
        const image = e.target.files[0]
        if (image.type === 'image/png' || image.type === 'image/jpeg' || image.type === 'image/jpg') {
            setImagem(image)
        }
    }

    async function cadastrarProduto(e) {
        try {
            e.preventDefault()
            const data = new FormData()
            data.append('nome', nome)
            data.append('preco', preco)
            data.append('file', imagem)
            const resposta = await apiLocal.post('/CadastrarProdutos', data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast.success(resposta.data.dados, {
                toastId: 'ToastId'
            })
            navegar('/')
        } catch (err) {
            console.log(err)
        }
        setNome('')
        setPreco('')
        setImagem(null)
    }

    return (
        <div className='conteinerGeralCadastroProdutos'>
            <h1>Produtos</h1>
            <form onSubmit={cadastrarProduto}>                   
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />                  
                    <input
                        type="text"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                    />
                    
                    <input
                        type="file"
                        accept='image/jpeg, image/png'
                        onChange={pegarImagem}
                    />
                    <button type='submit'>Cadastrar</button>
                </form>
        </div>
    )
}