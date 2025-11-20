export function formatPhoneNumber(phoneNumber: string): string {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, "");

  if (cleaned.length > 11) {
    return phoneNumber.slice(0, 15); // Limit to 15 characters if too long
  }

  // Apply mask
  const formatted = cleaned
    .replace(/^(\d{2})(\d)/g, "($1) $2")
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2");

  return formatted;
}

// Função utilitária para remover a formatação do número de telefone
export function unformatPhoneNumber(formattedPhoneNumber: string): string {
  return formattedPhoneNumber.replace(/[\(\)\s-]/g, "");
}
