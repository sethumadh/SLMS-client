export function formatString(str: string) {
  // Replace all periods with spaces
  let formattedStr = str.replace(/\./g, " ")

  // Capitalize the first letter
  formattedStr = formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1)

  return formattedStr
}
