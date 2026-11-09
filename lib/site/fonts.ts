// The dealt type, self-hosted by next/font. The page's font stack names the families directly
// (kit-document.tsx), so next/font's generated fallback faces never sit in front of IBM Plex Sans Arabic.
import { DM_Mono, Outfit } from 'next/font/google'

export const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-outfit', display: 'swap' })
export const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--f-mono', display: 'swap' })
