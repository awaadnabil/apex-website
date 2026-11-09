// Gulf keyboards often type Eastern Arabic (٠-٩) or Persian (۰-۹) digits. Phone numbers are stored and
// checked with ASCII digits, so both are folded before validation. Nothing else in the text is touched
// (ZWNJ and letter variants are kept as typed).
export function toAsciiDigits(s: string): string {
  return s.replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660)).replace(/[\u06f0-\u06f9]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
}
