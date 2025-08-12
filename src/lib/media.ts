export function toSrc(input?: string | File | { src?: string } | null): string {
  if (!input) return ''
  if (typeof input === 'string') return input
  if (typeof (input as any).src === 'string') return (input as any).src
  if (typeof window !== 'undefined' && input instanceof File) {
    try {
      return URL.createObjectURL(input)
    } catch {
      return ''
    }
  }
  return ''
}
