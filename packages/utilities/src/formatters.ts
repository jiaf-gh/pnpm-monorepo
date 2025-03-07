/**
 * Remove all characters but numbers from a text.
 * @param value - The incoming text.
 * @returns The resulting string only with numbers.
 */
export function leaveOnlyNumbers(value: string) {
  if (!value || !value.length) {
    return ''
  }
  return value.replace(/\D/g, '')
}
