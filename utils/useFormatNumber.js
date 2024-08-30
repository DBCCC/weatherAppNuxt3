
export function formatNumber(number) {
  if (number === null || number === undefined) return ''

  const [integerPart, decimalPart] = number.toString().split('.')

  if (decimalPart) {
    if (decimalPart === '00') {
      return integerPart;
    } else {
      return `${integerPart}.${decimalPart[0]}`
    }
  } else {
    return integerPart
  }
}
