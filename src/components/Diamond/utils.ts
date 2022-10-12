let row = 1
let cyIncrement = 1
const cxMap = [7, 21, 35, 49, 63]
let index = 0

export const circles = [...Array(100)].map((x, item) => {
  if (item > 0) {
    index++
  }

  if (item > 0 && item % 5 === 0) {
    row = row + 1
    cyIncrement = cyIncrement + 2
    index = 0
  }

  return {
    id: `pool-${item}`,
    animatedId: `animated-${item}`,
    link: `#pool-${item}`,
    cy: cyIncrement * 7,
    cx: cxMap[index],
  }
})
