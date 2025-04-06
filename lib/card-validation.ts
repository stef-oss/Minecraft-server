// Credit card validation utilities

export interface CardType {
  name: string
  pattern: RegExp
  format: RegExp
  lengths: number[]
  cvvLength: number
  luhn: boolean
}

export const cardTypes: CardType[] = [
  {
    name: "visa",
    pattern: /^4/,
    format: /(\d{1,4})/g,
    lengths: [16, 18, 19],
    cvvLength: 3,
    luhn: true,
  },
  {
    name: "mastercard",
    pattern: /^(5[1-5]|2[2-7])/,
    format: /(\d{1,4})/g,
    lengths: [16],
    cvvLength: 3,
    luhn: true,
  },
  {
    name: "amex",
    pattern: /^3[47]/,
    format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
    lengths: [15],
    cvvLength: 4,
    luhn: true,
  },
  {
    name: "discover",
    pattern: /^(6011|65|64[4-9]|622)/,
    format: /(\d{1,4})/g,
    lengths: [16, 19],
    cvvLength: 3,
    luhn: true,
  },
]

export function getCardType(cardNumber: string): CardType | null {
  const sanitized = cardNumber.replace(/\D/g, "")
  return cardTypes.find((type) => type.pattern.test(sanitized)) || null
}

export function formatCardNumber(cardNumber: string): string {
  const sanitized = cardNumber.replace(/\D/g, "")
  const cardType = getCardType(sanitized)

  if (!cardType) {
    return sanitized.replace(/(\d{4})/g, "$1 ").trim()
  }

  const matches = sanitized.match(cardType.format)
  if (!matches) {
    return sanitized
  }

  return matches.join(" ").trim()
}

// Luhn algorithm for card number validation
export function validateCardNumber(cardNumber: string): boolean {
  const sanitized = cardNumber.replace(/\D/g, "")
  const cardType = getCardType(sanitized)

  if (!cardType) {
    return false
  }

  if (!cardType.lengths.includes(sanitized.length)) {
    return false
  }

  if (!cardType.luhn) {
    return true
  }

  let sum = 0
  let shouldDouble = false

  // Loop through digits in reverse
  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(sanitized.charAt(i))

    if (shouldDouble) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

export function validateExpiryDate(month: string, year: string): boolean {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  const expiryYear = Number.parseInt(year.length === 2 ? "20" + year : year)
  const expiryMonth = Number.parseInt(month)

  if (isNaN(expiryMonth) || isNaN(expiryYear)) {
    return false
  }

  if (expiryMonth < 1 || expiryMonth > 12) {
    return false
  }

  if (expiryYear < currentYear) {
    return false
  }

  if (expiryYear === currentYear && expiryMonth < currentMonth) {
    return false
  }

  return true
}

export function validateCVV(cvv: string, cardType: CardType | null): boolean {
  if (!cardType) {
    return cvv.length >= 3 && cvv.length <= 4
  }

  return cvv.length === cardType.cvvLength
}

