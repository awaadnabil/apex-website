// Arabic pages only, so the English pages never preload it.
import { IBM_Plex_Sans_Arabic } from 'next/font/google'

export const plexAr = IBM_Plex_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '500', '600'], variable: '--f-plex-ar', display: 'swap' })
