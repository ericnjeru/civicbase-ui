import Button from 'components/Button'
import Typography from 'components/Typography'
// import useQuadratic from 'hooks/use-quadratic'
import { useState } from 'react'
import tw from 'twin.macro'
import Diamond from './Diamond'
import Pool from './Pool'

const TOTAL_CREDITS = 100

// const survey = {

// }

const DiamondVote = () => {
  const [questions, setQuestions] = useState([{ vote: 0 }, { vote: 0 }])
  // const { questions, availableCredits, vote, canVote } = useQuadratic(survey)

  const canVote = (index: number, vote: number) => {
    const cost = questions.reduce((sum, q, i) => {
      if (index === i) {
        return sum + (q.vote + vote) * (q.vote + vote)
      } else {
        return sum + q.vote * q.vote
      }
    }, 0)

    return cost < TOTAL_CREDITS
  }

  const animate = (questionIdx: number, vote: number) => {
    const { difference, animatedArr, diamondArr } = calculate(vote)

    if (animatedArr.length === 0) {
      return
    }

    for (let index = 0; index < difference; index++) {
      const animatedIdx = animatedArr[index]
      const diamondIdx = diamondArr[index]

      const animatedCircle = document.getElementById(`animated-${animatedIdx}`)
      const diamondCircle = document.getElementById(`diamond-${questionIdx}${diamondIdx}`)

      if (animatedCircle && diamondCircle) {
        const rectA = animatedCircle.getBoundingClientRect()
        const rectB = diamondCircle.getBoundingClientRect()
        const x = rectB.left - rectA.left
        const y = rectB.top - rectA.top

        animatedCircle.animate([{ transform: `translate(${x}px, ${y}px)` }], {
          duration: 1000,
          fill: 'both',
        })

        animatedCircle.animate([
          { fill: 'red' },
          {
            duration: 300,
            delay: 700,
          },
        ])
      }
    }
  }

  const calculate = (vote: number) => {
    let from = calculateTotalCreditSpent()
    const posVote = vote > 0 ? vote : vote * -1
    const prevCredits = (posVote - 1) * (posVote - 1)
    const credits = posVote * posVote
    const difference = credits - prevCredits
    const animatedArr = []
    const diamondArr = []

    for (let index = prevCredits; index < credits; index++) {
      animatedArr.push(from)
      diamondArr.push(index)
      from++
    }

    console.log(`animated: [${animatedArr}] diamond: [${diamondArr}]`)

    return {
      difference,
      animatedArr,
      diamondArr,
    }
  }

  const calculateTotalCreditSpent = () => {
    return questions.reduce((sum, question) => sum + question.vote * question.vote, 0)
  }

  const handleVoteUp = (index: number) => {
    const vote = questions[index].vote

    if (vote < 10 && canVote(index, 1)) {
      animate(index, vote + 1)

      setQuestions((prev) => {
        prev[index].vote = prev[index].vote + 1
        return [...prev]
      })
    }
  }
  const handleVoteDown = (index: number) => {
    const vote = questions[index].vote
    if (vote > -10 && canVote(index, -1)) {
      animate(index, vote - 1)

      setQuestions((prev) => {
        prev[index].vote = prev[index].vote - 1
        return [...prev]
      })
    }
  }

  return (
    <div css={tw`flex space-x-40`}>
      <Pool />

      <div css={tw`flex flex-col space-y-10`}>
        <div css={tw`flex flex-col`}>
          <Typography css={tw`text-center`}>Yooo {questions[0].vote}</Typography>

          <div css={tw`flex items-center`}>
            <Button
              css={tw`border-2 rounded-3xl border-black`}
              style={{ height: 'min-content' }}
              onClick={() => handleVoteUp(0)}
            >
              Agree
            </Button>
            <Diamond index={0} />
            <Button
              css={tw`border-2 rounded-3xl border-black`}
              style={{ height: 'min-content' }}
              onClick={() => handleVoteDown(0)}
            >
              Disagree
            </Button>
          </div>
        </div>

        <div css={tw`flex flex-col`}>
          <Typography css={tw`text-center`}>Taut {questions[1].vote}</Typography>

          <div css={tw`flex items-center`}>
            <Button
              css={tw`border-2 rounded-3xl border-black`}
              style={{ height: 'min-content' }}
              onClick={() => handleVoteUp(1)}
            >
              Agree
            </Button>
            <Diamond index={1} />
            <Button
              css={tw`border-2 rounded-3xl border-black`}
              style={{ height: 'min-content' }}
              onClick={() => handleVoteDown(1)}
            >
              Disagree
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiamondVote
