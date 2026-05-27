export const FORMAS_PAGAMENTO = [
    "Dinheiro",
    "Débito",
    "Crédito à Vista",
    "Crédito Parcelado",
    "Pix",
    "Boleto",
    "Outros",
    "Não Informado",
]

export type FormaPagamento = typeof FORMAS_PAGAMENTO[number]