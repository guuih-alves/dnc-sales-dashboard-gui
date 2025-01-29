/**
 * Convert text from highlight api
 * @param text - Text to be converted
 * @returns The convertd text
 */

export function highlightTextConverter(text: string): string {
  switch (text) {
    case 'alert':
      return '*Meta longe de ser batida'
    case 'success':
      return '*A meta do mes foi batida'
    case 'warning':
      return '*Falta pouco, vamos la'
    default:
      return '* Sem dados no momento'
  }
}
