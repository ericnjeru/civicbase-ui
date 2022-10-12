const Diamond = ({ index }: { index: number }) => {
  return (
    <svg width={220} height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(220,110)">
        <circle id={`diamond-${index}0`} r="5" cx="-20" cy="0" fill="#cbd5e1" style={{ zIndex: -10 }}></circle>
        <circle id={`diamond-${index}2`} r="5" cx="-40" cy="0" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}1`} r="5" cx="-30" cy="-10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}3`} r="5" cx="-30" cy="10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}6`} r="5" cx="-60" cy="0" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}5`} r="5" cx="-50" cy="-10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}7`} r="5" cx="-50" cy="10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}4`} r="5" cx="-40" cy="-20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}8`} r="5" cx="-40" cy="20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}12`} r="5" cx="-80" cy="0" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}11`} r="5" cx="-70" cy="-10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}13`} r="5" cx="-70" cy="10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}10`} r="5" cx="-60" cy="-20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}14`} r="5" cx="-60" cy="20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}9`} r="5" cx="-50" cy="-30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}15`} r="5" cx="-50" cy="30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}20`} r="5" cx="-100" cy="0" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}19`} r="5" cx="-90" cy="-10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}21`} r="5" cx="-90" cy="10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}18`} r="5" cx="-80" cy="-20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}22`} r="5" cx="-80" cy="20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}17`} r="5" cx="-70" cy="-30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}23`} r="5" cx="-70" cy="30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}16`} r="5" cx="-60" cy="-40" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}24`} r="5" cx="-60" cy="40" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}30`} r="5" cx="-120" cy="0" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}29`} r="5" cx="-110" cy="-10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}31`} r="5" cx="-110" cy="10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}28`} r="5" cx="-100" cy="-20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}32`} r="5" cx="-100" cy="20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}27`} r="5" cx="-90" cy="-30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}33`} r="5" cx="-90" cy="30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}26`} r="5" cx="-80" cy="-40" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}34`} r="5" cx="-80" cy="40" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}25`} r="5" cx="-70" cy="-50" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}35`} r="5" cx="-70" cy="50" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}42`} r="5" cx="-140" cy="0" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}41`} r="5" cx="-130" cy="-10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}43`} r="5" cx="-130" cy="10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}40`} r="5" cx="-120" cy="-20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}44`} r="5" cx="-120" cy="20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}39`} r="5" cx="-110" cy="-30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}45`} r="5" cx="-110" cy="30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}38`} r="5" cx="-100" cy="-40" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}46`} r="5" cx="-100" cy="40" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}37`} r="5" cx="-90" cy="-50" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}47`} r="5" cx="-90" cy="50" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}36`} r="5" cx="-80" cy="-60" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}48`} r="5" cx="-80" cy="60" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}56`} r="5" cx="-160" cy="0" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}55`} r="5" cx="-150" cy="-10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}57`} r="5" cx="-150" cy="10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}54`} r="5" cx="-140" cy="-20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}58`} r="5" cx="-140" cy="20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}53`} r="5" cx="-130" cy="-30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}59`} r="5" cx="-130" cy="30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}52`} r="5" cx="-120" cy="-40" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}60`} r="5" cx="-120" cy="40" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}51`} r="5" cx="-110" cy="-50" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}61`} r="5" cx="-110" cy="50" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}50`} r="5" cx="-100" cy="-60" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}62`} r="5" cx="-100" cy="60" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}49`} r="5" cx="-90" cy="-70" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}63`} r="5" cx="-90" cy="70" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}72`} r="5" cx="-180" cy="0" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}71`} r="5" cx="-170" cy="-10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}73`} r="5" cx="-170" cy="10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}70`} r="5" cx="-160" cy="-20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}74`} r="5" cx="-160" cy="20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}69`} r="5" cx="-150" cy="-30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}75`} r="5" cx="-150" cy="30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}68`} r="5" cx="-140" cy="-40" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}76`} r="5" cx="-140" cy="40" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}67`} r="5" cx="-130" cy="-50" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}77`} r="5" cx="-130" cy="50" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}66`} r="5" cx="-120" cy="-60" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}78`} r="5" cx="-120" cy="60" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}65`} r="5" cx="-110" cy="-70" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}79`} r="5" cx="-110" cy="70" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}64`} r="5" cx="-100" cy="-80" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}80`} r="5" cx="-100" cy="80" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}90`} r="5" cx="-200" cy="0" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}89`} r="5" cx="-190" cy="-10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}91`} r="5" cx="-190" cy="10" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}88`} r="5" cx="-180" cy="-20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}92`} r="5" cx="-180" cy="20" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}87`} r="5" cx="-170" cy="-30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}93`} r="5" cx="-170" cy="30" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}86`} r="5" cx="-160" cy="-40" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}94`} r="5" cx="-160" cy="40" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}85`} r="5" cx="-150" cy="-50" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}95`} r="5" cx="-150" cy="50" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}84`} r="5" cx="-140" cy="-60" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}96`} r="5" cx="-140" cy="60" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}83`} r="5" cx="-130" cy="-70" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}97`} r="5" cx="-130" cy="70" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}82`} r="5" cx="-120" cy="-80" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}98`} r="5" cx="-120" cy="80" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}81`} r="5" cx="-110" cy="-90" fill="#cbd5e1"></circle>
        <circle id={`diamond-${index}99`} r="5" cx="-110" cy="90" fill="#cbd5e1"></circle>
      </g>
    </svg>
  )
}

export default Diamond
