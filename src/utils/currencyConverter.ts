/**
 * Convert to BRL currencyFormat
 * @param value - Number  to be converted
 * @returns Converted BRL String
 */

export function currencyConverter (value: number): string {
    return new Intl.NumberFormat('pt-BR' , {
        style: 'currency',
        currency: 'BRL',
    }). format(value)
}


//converter valores para o formato de moeda brasileira://