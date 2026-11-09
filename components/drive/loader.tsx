const LOGO_STROKES = [
  'M0 40 L14 0 L28 40',
  'M6.5 26 H21.5',
  'M40 40 V0 H56 A10 10 0 0 1 56 20 H40',
  'M98 0 H74 V40 H98',
  'M74 20 H94',
  'M108 0 L136 40',
  'M136 0 L108 40',
]

/** Pure CSS so it paints with the first HTML response. */
export function Loader() {
  return (
    <div className="drive-loader" aria-hidden="true">
      <svg viewBox="-4 -4 144 48" className="w-[min(58vw,260px)] overflow-visible">
        {LOGO_STROKES.map((d, i) => (
          <path
            key={d}
            d={d}
            pathLength={1}
            className="loader-stroke"
            style={{ animationDelay: `${0.04 + i * 0.06}s` }}
          />
        ))}
      </svg>
    </div>
  )
}
