import { circles } from './utils'

const Pool = () => {
  return (
    <svg width="100" height="300" viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg" overflow="inherit">
      <g fill="none" fillRule="evenodd">
        {circles.map((c) => (
          <circle id={c.id} key={c.id} cx={c.cx} cy={c.cy} r={5} style={{ fill: '#cbd5e1' }} />
        ))}

        {circles.map((c) => (
          <circle
            id={c.animatedId}
            key={c.animatedId}
            cx={c.cx}
            cy={c.cy}
            r={5}
            style={{ fill: '#374151', zIndex: 10 }}
          />
        ))}
      </g>
    </svg>
  )
}

export default Pool
