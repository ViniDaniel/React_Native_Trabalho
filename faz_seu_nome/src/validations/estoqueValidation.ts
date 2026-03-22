export function estoqueValidation(
  nome: string,
  marca: string,
  quantidade: number,
  valor: number,
) {
    if(!nome || nome.trim().length < 1){
        return "Nome do produto inválido"
    }
    if(!marca || marca.trim().length < 1){
        return "Marca inválida"
    }
    if(quantidade < 0 ){
        return "Quantidade inválida"
    }
    if(valor < 0){
        return "Valor inválido!"
    }

    return null
}
