/**
 * Converte um valor monetário em Reais (BRL) para centavos.
 * @param {string} amount - O valor monetário em Real (BRL) a ser convertido.
 * @returns {number} O valor convertido em centavos.
 * @example
 * convertRealToCents("1.300,50"); // Returns 130050
 */
export function convertRealToCents(amount: string) {
  const numericPrice = parseFloat(amount.replace(/\./g, "").replace(",", "."));
  const priceInCents = Math.round(numericPrice * 100);

  return priceInCents;
}

const CURRENCY_FORMATTER = new Intl.NumberFormat("pt-BR", {
  currency: "BRL",
  style: "currency",
  minimumFractionDigits: 0
})

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number)
}