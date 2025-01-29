import { highlightTextConverter } from '@/utils'

describe('highlightTextConverter', () => {
  it('should return the correct text for alert', () => {
    expect(highlightTextConverter('alert')).toBe('*Meta longe de ser batida')
  })

  it('should return the correct text for success', () => {
    expect(highlightTextConverter('warning')).toBe('*Falta pouco, vamos la')
  })

  it('should return the correct text for warning', () => {
    expect(highlightTextConverter('success')).toBe('*A meta do mes foi batida')
  })

  it('should return the correct text for unknown input', () => {
    expect(highlightTextConverter('un')).toBe('* Sem dados no momento')
  })
})
