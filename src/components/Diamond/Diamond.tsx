import { forwardRef, useEffect, useRef, useState } from 'react'
import tw from 'twin.macro'

const Pool = ({
  offsetLeft,
  offsetTop,
  beginAnimation,
}: {
  offsetLeft?: number
  offsetTop?: number
  beginAnimation: boolean
}) => {
  const [elementA, setElementA] = useState<any>()
  const [elementB, setElementB] = useState<any>()
  console.log('offsetLeft ', offsetLeft)
  console.log('offsetTop  ', offsetTop)
  console.log('beginAnimation  ', beginAnimation)

  useEffect(() => {
    const e1 = document.getElementById('pool-1')
    const e2 = document.getElementById('circle-1')

    setElementB(e2)
    setElementA(e1)
  }, [])

  console.log('elementA', elementA?.getBoundingClientRect())
  console.log('elementB', elementB?.getBoundingClientRect())

  const x = elementA?.getBoundingClientRect().x - elementB?.getBoundingClientRect().x
  const y = elementA?.getBoundingClientRect().y - elementB?.getBoundingClientRect().y

  return (
    <svg width="100" height="300" overflow="inherit">
      <circle id="circle-1" cx="7" cy="7" r="5"></circle>

      <>
        <animate
          xlinkHref="#circle-1"
          attributeName="cx"
          from="7"
          to={x}
          dur="10s"
          begin={beginAnimation}
          fill="freeze"
          d="circ-anim"
        />

        <animate
          xlinkHref="#circle-1"
          attributeName="cy"
          from="7"
          to={y}
          dur="10s"
          begin={beginAnimation}
          fill="freeze"
          d="circ-anim"
        />
      </>

      <circle cx="21" cy="7" r="5"></circle>
      <circle cx="35" cy="7" r="5"></circle>
      <circle cx="49" cy="7" r="5"></circle>
      <circle cx="63" cy="7" r="5"></circle>
      <circle cx="7" cy="21" r="5"></circle>
      <circle cx="21" cy="21" r="5"></circle>
      <circle cx="35" cy="21" r="5"></circle>
      <circle cx="49" cy="21" r="5"></circle>
      <circle cx="63" cy="21" r="5"></circle>
      <circle cx="7" cy="35" r="5"></circle>
      <circle cx="21" cy="35" r="5"></circle>
      <circle cx="35" cy="35" r="5"></circle>
      <circle cx="49" cy="35" r="5"></circle>
      <circle cx="63" cy="35" r="5"></circle>
      <circle cx="7" cy="49" r="5"></circle>
      <circle cx="21" cy="49" r="5"></circle>
      <circle cx="35" cy="49" r="5"></circle>
      <circle cx="49" cy="49" r="5"></circle>
      <circle cx="63" cy="49" r="5"></circle>
      <circle cx="7" cy="63" r="5"></circle>
      <circle cx="21" cy="63" r="5"></circle>
      <circle cx="35" cy="63" r="5"></circle>
      <circle cx="49" cy="63" r="5"></circle>
      <circle cx="63" cy="63" r="5"></circle>
      <circle cx="7" cy="77" r="5"></circle>
      <circle cx="21" cy="77" r="5"></circle>
      <circle cx="35" cy="77" r="5"></circle>
      <circle cx="49" cy="77" r="5"></circle>
      <circle cx="63" cy="77" r="5"></circle>
      <circle cx="7" cy="91" r="5"></circle>
      <circle cx="21" cy="91" r="5"></circle>
      <circle cx="35" cy="91" r="5"></circle>
      <circle cx="49" cy="91" r="5"></circle>
      <circle cx="63" cy="91" r="5"></circle>
      <circle cx="7" cy="105" r="5"></circle>
      <circle cx="21" cy="105" r="5"></circle>
      <circle cx="35" cy="105" r="5"></circle>
      <circle cx="49" cy="105" r="5"></circle>
      <circle cx="63" cy="105" r="5"></circle>
      <circle cx="7" cy="119" r="5"></circle>
      <circle cx="21" cy="119" r="5"></circle>
      <circle cx="35" cy="119" r="5"></circle>
      <circle cx="49" cy="119" r="5"></circle>
      <circle cx="63" cy="119" r="5"></circle>
      <circle cx="7" cy="133" r="5"></circle>
      <circle cx="21" cy="133" r="5"></circle>
      <circle cx="35" cy="133" r="5"></circle>
      <circle cx="49" cy="133" r="5"></circle>
      <circle cx="63" cy="133" r="5"></circle>
      <circle cx="7" cy="147" r="5"></circle>
      <circle cx="21" cy="147" r="5"></circle>
      <circle cx="35" cy="147" r="5"></circle>
      <circle cx="49" cy="147" r="5"></circle>
      <circle cx="63" cy="147" r="5"></circle>
      <circle cx="7" cy="161" r="5"></circle>
      <circle cx="21" cy="161" r="5"></circle>
      <circle cx="35" cy="161" r="5"></circle>
      <circle cx="49" cy="161" r="5"></circle>
      <circle cx="63" cy="161" r="5"></circle>
      <circle cx="7" cy="175" r="5"></circle>
      <circle cx="21" cy="175" r="5"></circle>
      <circle cx="35" cy="175" r="5"></circle>
      <circle cx="49" cy="175" r="5"></circle>
      <circle cx="63" cy="175" r="5"></circle>
      <circle cx="7" cy="189" r="5"></circle>
      <circle cx="21" cy="189" r="5"></circle>
      <circle cx="35" cy="189" r="5"></circle>
      <circle cx="49" cy="189" r="5"></circle>
      <circle cx="63" cy="189" r="5"></circle>
      <circle cx="7" cy="203" r="5"></circle>
      <circle cx="21" cy="203" r="5"></circle>
      <circle cx="35" cy="203" r="5"></circle>
      <circle cx="49" cy="203" r="5"></circle>
      <circle cx="63" cy="203" r="5"></circle>
      <circle cx="7" cy="217" r="5"></circle>
      <circle cx="21" cy="217" r="5"></circle>
      <circle cx="35" cy="217" r="5"></circle>
      <circle cx="49" cy="217" r="5"></circle>
      <circle cx="63" cy="217" r="5"></circle>
      <circle cx="7" cy="231" r="5"></circle>
      <circle cx="21" cy="231" r="5"></circle>
      <circle cx="35" cy="231" r="5"></circle>
      <circle cx="49" cy="231" r="5"></circle>
      <circle cx="63" cy="231" r="5"></circle>
      <circle cx="7" cy="245" r="5"></circle>
      <circle cx="21" cy="245" r="5"></circle>
      <circle cx="35" cy="245" r="5"></circle>
      <circle cx="49" cy="245" r="5"></circle>
      <circle cx="63" cy="245" r="5"></circle>
      <circle cx="7" cy="259" r="5"></circle>
      <circle cx="21" cy="259" r="5"></circle>
      <circle cx="35" cy="259" r="5"></circle>
      <circle cx="49" cy="259" r="5"></circle>
      <circle cx="63" cy="259" r="5"></circle>
      <circle cx="7" cy="273" r="5"></circle>
      <circle cx="21" cy="273" r="5"></circle>
      <circle cx="35" cy="273" r="5"></circle>
      <circle cx="49" cy="273" r="5"></circle>
      <circle cx="63" cy="273" r="5"></circle>
    </svg>
  )
}

const Diamond = forwardRef<HTMLDivElement | undefined>((props, ref) => {
  return (
    <div ref={ref}>
      <svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(220,110)">
          <circle id="pool-1" r="5" cx="-20" cy="0" data-level="1" data-ai="0"></circle>
          <circle r="5" cx="-40" cy="0" data-level="2" data-ai="0"></circle>
          <circle r="5" cx="-30" cy="-10" data-level="2" data-ai="1"></circle>
          <circle r="5" cx="-30" cy="10" data-level="2" data-ai="2"></circle>
          <circle r="5" cx="-60" cy="0" data-level="3" data-ai="0"></circle>
          <circle r="5" cx="-50" cy="-10" data-level="3" data-ai="1"></circle>
          <circle r="5" cx="-50" cy="10" data-level="3" data-ai="2"></circle>
          <circle r="5" cx="-40" cy="-20" data-level="3" data-ai="3"></circle>
          <circle r="5" cx="-40" cy="20" data-level="3" data-ai="4"></circle>
          <circle r="5" cx="-80" cy="0" data-level="4" data-ai="0"></circle>
          <circle r="5" cx="-70" cy="-10" data-level="4" data-ai="1"></circle>
          <circle r="5" cx="-70" cy="10" data-level="4" data-ai="2"></circle>
          <circle r="5" cx="-60" cy="-20" data-level="4" data-ai="3"></circle>
          <circle r="5" cx="-60" cy="20" data-level="4" data-ai="4"></circle>
          <circle r="5" cx="-50" cy="-30" data-level="4" data-ai="5"></circle>
          <circle r="5" cx="-50" cy="30" data-level="4" data-ai="6"></circle>
          <circle r="5" cx="-100" cy="0" data-level="5" data-ai="0"></circle>
          <circle r="5" cx="-90" cy="-10" data-level="5" data-ai="1"></circle>
          <circle r="5" cx="-90" cy="10" data-level="5" data-ai="2"></circle>
          <circle r="5" cx="-80" cy="-20" data-level="5" data-ai="3"></circle>
          <circle r="5" cx="-80" cy="20" data-level="5" data-ai="4"></circle>
          <circle r="5" cx="-70" cy="-30" data-level="5" data-ai="5"></circle>
          <circle r="5" cx="-70" cy="30" data-level="5" data-ai="6"></circle>
          <circle r="5" cx="-60" cy="-40" data-level="5" data-ai="7"></circle>
          <circle r="5" cx="-60" cy="40" data-level="5" data-ai="8"></circle>
          <circle r="5" cx="-120" cy="0" data-level="6" data-ai="0"></circle>
          <circle r="5" cx="-110" cy="-10" data-level="6" data-ai="1"></circle>
          <circle r="5" cx="-110" cy="10" data-level="6" data-ai="2"></circle>
          <circle r="5" cx="-100" cy="-20" data-level="6" data-ai="3"></circle>
          <circle r="5" cx="-100" cy="20" data-level="6" data-ai="4"></circle>
          <circle r="5" cx="-90" cy="-30" data-level="6" data-ai="5"></circle>
          <circle r="5" cx="-90" cy="30" data-level="6" data-ai="6"></circle>
          <circle r="5" cx="-80" cy="-40" data-level="6" data-ai="7"></circle>
          <circle r="5" cx="-80" cy="40" data-level="6" data-ai="8"></circle>
          <circle r="5" cx="-70" cy="-50" data-level="6" data-ai="9"></circle>
          <circle r="5" cx="-70" cy="50" data-level="6" data-ai="10"></circle>
          <circle r="5" cx="-140" cy="0" data-level="7" data-ai="0"></circle>
          <circle r="5" cx="-130" cy="-10" data-level="7" data-ai="1"></circle>
          <circle r="5" cx="-130" cy="10" data-level="7" data-ai="2"></circle>
          <circle r="5" cx="-120" cy="-20" data-level="7" data-ai="3"></circle>
          <circle r="5" cx="-120" cy="20" data-level="7" data-ai="4"></circle>
          <circle r="5" cx="-110" cy="-30" data-level="7" data-ai="5"></circle>
          <circle r="5" cx="-110" cy="30" data-level="7" data-ai="6"></circle>
          <circle r="5" cx="-100" cy="-40" data-level="7" data-ai="7"></circle>
          <circle r="5" cx="-100" cy="40" data-level="7" data-ai="8"></circle>
          <circle r="5" cx="-90" cy="-50" data-level="7" data-ai="9"></circle>
          <circle r="5" cx="-90" cy="50" data-level="7" data-ai="10"></circle>
          <circle r="5" cx="-80" cy="-60" data-level="7" data-ai="11"></circle>
          <circle r="5" cx="-80" cy="60" data-level="7" data-ai="12"></circle>
          <circle r="5" cx="-160" cy="0" data-level="8" data-ai="0"></circle>
          <circle r="5" cx="-150" cy="-10" data-level="8" data-ai="1"></circle>
          <circle r="5" cx="-150" cy="10" data-level="8" data-ai="2"></circle>
          <circle r="5" cx="-140" cy="-20" data-level="8" data-ai="3"></circle>
          <circle r="5" cx="-140" cy="20" data-level="8" data-ai="4"></circle>
          <circle r="5" cx="-130" cy="-30" data-level="8" data-ai="5"></circle>
          <circle r="5" cx="-130" cy="30" data-level="8" data-ai="6"></circle>
          <circle r="5" cx="-120" cy="-40" data-level="8" data-ai="7"></circle>
          <circle r="5" cx="-120" cy="40" data-level="8" data-ai="8"></circle>
          <circle r="5" cx="-110" cy="-50" data-level="8" data-ai="9"></circle>
          <circle r="5" cx="-110" cy="50" data-level="8" data-ai="10"></circle>
          <circle r="5" cx="-100" cy="-60" data-level="8" data-ai="11"></circle>
          <circle r="5" cx="-100" cy="60" data-level="8" data-ai="12"></circle>
          <circle r="5" cx="-90" cy="-70" data-level="8" data-ai="13"></circle>
          <circle r="5" cx="-90" cy="70" data-level="8" data-ai="14"></circle>
          <circle r="5" cx="-180" cy="0" data-level="9" data-ai="0"></circle>
          <circle r="5" cx="-170" cy="-10" data-level="9" data-ai="1"></circle>
          <circle r="5" cx="-170" cy="10" data-level="9" data-ai="2"></circle>
          <circle r="5" cx="-160" cy="-20" data-level="9" data-ai="3"></circle>
          <circle r="5" cx="-160" cy="20" data-level="9" data-ai="4"></circle>
          <circle r="5" cx="-150" cy="-30" data-level="9" data-ai="5"></circle>
          <circle r="5" cx="-150" cy="30" data-level="9" data-ai="6"></circle>
          <circle r="5" cx="-140" cy="-40" data-level="9" data-ai="7"></circle>
          <circle r="5" cx="-140" cy="40" data-level="9" data-ai="8"></circle>
          <circle r="5" cx="-130" cy="-50" data-level="9" data-ai="9"></circle>
          <circle r="5" cx="-130" cy="50" data-level="9" data-ai="10"></circle>
          <circle r="5" cx="-120" cy="-60" data-level="9" data-ai="11"></circle>
          <circle r="5" cx="-120" cy="60" data-level="9" data-ai="12"></circle>
          <circle r="5" cx="-110" cy="-70" data-level="9" data-ai="13"></circle>
          <circle r="5" cx="-110" cy="70" data-level="9" data-ai="14"></circle>
          <circle r="5" cx="-100" cy="-80" data-level="9" data-ai="15"></circle>
          <circle r="5" cx="-100" cy="80" data-level="9" data-ai="16"></circle>
          <circle r="5" cx="-200" cy="0" data-level="10" data-ai="0"></circle>
          <circle r="5" cx="-190" cy="-10" data-level="10" data-ai="1"></circle>
          <circle r="5" cx="-190" cy="10" data-level="10" data-ai="2"></circle>
          <circle r="5" cx="-180" cy="-20" data-level="10" data-ai="3"></circle>
          <circle r="5" cx="-180" cy="20" data-level="10" data-ai="4"></circle>
          <circle r="5" cx="-170" cy="-30" data-level="10" data-ai="5"></circle>
          <circle r="5" cx="-170" cy="30" data-level="10" data-ai="6"></circle>
          <circle r="5" cx="-160" cy="-40" data-level="10" data-ai="7"></circle>
          <circle r="5" cx="-160" cy="40" data-level="10" data-ai="8"></circle>
          <circle r="5" cx="-150" cy="-50" data-level="10" data-ai="9"></circle>
          <circle r="5" cx="-150" cy="50" data-level="10" data-ai="10"></circle>
          <circle r="5" cx="-140" cy="-60" data-level="10" data-ai="11"></circle>
          <circle r="5" cx="-140" cy="60" data-level="10" data-ai="12"></circle>
          <circle r="5" cx="-130" cy="-70" data-level="10" data-ai="13"></circle>
          <circle r="5" cx="-130" cy="70" data-level="10" data-ai="14"></circle>
          <circle r="5" cx="-120" cy="-80" data-level="10" data-ai="15"></circle>
          <circle r="5" cx="-120" cy="80" data-level="10" data-ai="16"></circle>
          <circle r="5" cx="-110" cy="-90" data-level="10" data-ai="17"></circle>
          <circle r="5" cx="-110" cy="90" data-level="10" data-ai="18"></circle>
        </g>
      </svg>
    </div>
  )
})

Diamond.displayName = 'Diamond'

const DiamondVote = () => {
  const diamondRef = useRef()
  const [animation, setAnimation] = useState(false)

  const handleVote = () => {
    setAnimation(true)
  }

  return (
    <>
      <div css={tw`container grid-cols-2 gap-36 flex`}>
        <Pool
          offsetLeft={diamondRef?.current?.offsetLeft}
          offsetTop={diamondRef?.current?.offsetTop}
          beginAnimation={animation}
        />

        <Diamond ref={diamondRef} />
      </div>

      <button onClick={handleVote}>Vote</button>
    </>
  )
}

export default DiamondVote
