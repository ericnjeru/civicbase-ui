import { useEffect, useState } from 'react'
import { createQuestions } from 'utilities/survey'
import { SurveyRespondent } from '../../types/survey'

export type Question = {
  id: string
  statement: string
  vote: number
  credits: number
  order: number
  status?: Status
  animated: number[]
}

export enum Status {
  ADD = 'add',
  REMOVE = 'remove',
}

const negative = [
  '#FF9EBC',
  '#FF9EBC',
  '#FF85A3',
  '#FF85A3',
  '#FF6B89',
  '#FF6B89',
  '#FF5270',
  '#FF5270',
  '#FF3856',
  '#FF3856',
]
const positive = [
  '#73F297',
  '#73F297',
  '#5AD97E',
  '#5AD97E',
  '#40BF64',
  '#40BF64',
  '#27A64B',
  '#27A64B',
  '#0D8C31',
  '#0D8C31',
]

const useQuadraticAnimated = (survey: SurveyRespondent) => {
  const {
    setup: { credits },
    quadratic,
  } = survey
  const [pool, setPool] = useState(Array.from(Array(credits).keys()))
  const [questions, setQuestions] = useState<Question[]>([])
  const [availableCredits, setAvailableCredits] = useState(credits || 0)

  const canVote = (index: number, vote: number) => {
    let simulatedCost = 0

    questions.forEach((q, i) => {
      if (i === index) {
        simulatedCost += Math.pow(q.vote + vote, 2)
      } else {
        simulatedCost += q.credits
      }
    })

    if (!credits) {
      return false
    }

    return simulatedCost <= credits
  }

  const getStatus = (question: Question, vote: number): Status => {
    const t = question.vote
    let status: Status

    if (t + vote > 0) {
      status = t + vote > t ? Status.ADD : Status.REMOVE
    } else {
      status = t > t + vote && t + vote !== 0 ? Status.ADD : Status.REMOVE
    }

    return status
  }

  const getNElements = (status: Status, prevVote: number, vote: number) => {
    switch (status) {
      case Status.ADD: {
        return vote * vote - prevVote * prevVote
      }

      case Status.REMOVE: {
        return prevVote * prevVote - vote * vote
      }
    }
  }

  const animate = (id: string, level: number, elements: number[], status: Status, vote: number) => {
    switch (status) {
      case Status.ADD: {
        if (credits) {
          let from = credits - availableCredits

          elements.forEach((element, index) => {
            const poolCircle = document.getElementById(`pool-${from}`)
            const animatedCircle = document.getElementById(`animated-${element}`)
            const diamondCircle = document.getElementById(`diamond-${id}${level}${index}`)

            if (animatedCircle && diamondCircle && poolCircle) {
              const rectA = poolCircle.getBoundingClientRect()
              const rectB = diamondCircle.getBoundingClientRect()
              const x = rectB.left - rectA.left
              const y = rectB.top - rectA.top

              const cx = poolCircle?.getAttribute('cx')
              const cy = poolCircle?.getAttribute('cy')

              if (cx && cy) {
                animatedCircle.animate(
                  {
                    cx: `${x + Number(cx)}px`,
                    cy: `${y + Number(cy)}px`,
                  },
                  { duration: 1000, fill: 'both' },
                )

                animatedCircle.animate(
                  [
                    {
                      fill: vote > 0 ? positive[level - 1] : negative[level - 1],
                    },
                  ],
                  {
                    duration: 500,
                    delay: 500,
                    fill: 'both',
                  },
                )
              }

              from = from + 1
            }
          })
        }

        break
      }
      case Status.REMOVE: {
        if (credits) {
          const spentCredits = credits - availableCredits
          let from = spentCredits - elements.length

          elements.forEach((element) => {
            const animatedCircle = document.getElementById(`animated-${element}`)
            const poolCircle = document.getElementById(`pool-${from}`)

            if (animatedCircle && poolCircle) {
              // const rectA = animatedCircle.getBoundingClientRect()
              // const rectB = poolCircle.getBoundingClientRect()

              const cx = poolCircle?.getAttribute('cx')
              const cy = poolCircle?.getAttribute('cy')

              if (cx && cy) {
                animatedCircle.animate(
                  {
                    cx: `${cx}px`,
                    cy: `${cy}px`,
                  },
                  { duration: 1000, fill: 'both' },
                )

                animatedCircle.animate(
                  [
                    {
                      fill: '#374151',
                    },
                  ],
                  {
                    duration: 500,
                    delay: 500,
                    fill: 'both',
                  },
                )
              }
            }

            from = from + 1
          })
        }

        break
      }
    }
  }

  const vote = (index: number, vote: number) => {
    if (canVote(index, vote)) {
      const question = { ...questions[index] }
      const newPool = [...pool]
      const status = getStatus(question, vote)
      const n = getNElements(status, question.vote, question.vote + vote)
      let level = question.vote + vote
      level = level < 0 ? level * -1 : level

      switch (status) {
        case Status.ADD: {
          const addElements = newPool.splice(0, n)

          animate(question.id, level, addElements, status, question.vote + vote)
          setPool(newPool)
          setQuestions((questions) => {
            return questions.map((q) => {
              if (q.id === question.id) {
                return {
                  ...q,
                  vote: q.vote + vote,
                  credits: Math.pow(question.vote + vote, 2),
                  animated: [...question.animated, ...addElements],
                  status,
                }
              }
              return q
            })
          })

          break
        }
        case Status.REMOVE: {
          const from = question.animated.length - n
          const removeElements = question.animated.splice(from, n)

          animate(question.id, level, removeElements, status, question.vote + vote)
          setPool([...removeElements, ...newPool])
          setQuestions((questions) => {
            return questions.map((q) => {
              if (q.id === question.id) {
                return {
                  ...question,
                  vote: question.vote + vote,
                  credits: Math.pow(question.vote + vote, 2),
                  status,
                }
              }

              return q
            })
          })

          break
        }
      }
    }
  }

  const resetAnimation = () => {
    questions.forEach((q: Question) => {
      q.animated.forEach((el: number) => {
        const animatedCircle = document.getElementById(`animated-${el}`)

        if (animatedCircle) {
          const cx = animatedCircle?.getAttribute('cx')
          const cy = animatedCircle?.getAttribute('cy')

          if (cx && cy) {
            animatedCircle.animate(
              {
                cx: `${cx}px`,
                cy: `${cy}px`,
              },
              { duration: 1000, fill: 'both' },
            )

            animatedCircle.animate(
              [
                {
                  fill: '#374151',
                },
              ],
              {
                duration: 500,
                delay: 500,
                fill: 'both',
              },
            )
          }
        }
      })
    })
    setPool(Array.from(Array(credits).keys()))
  }

  const reset = () => {
    resetAnimation()
    setQuestions(questions.map((q) => ({ ...q, vote: 0, credits: 0, status: undefined, animated: [] })))
  }

  //   Setup questions for survey
  useEffect(() => {
    if (quadratic) {
      setQuestions(createQuestions(quadratic))
    }
  }, [quadratic])

  //   Update available credits
  useEffect(() => {
    const totalCost = questions.reduce((cost, question) => cost + Math.pow(question.vote, 2), 0)

    if (credits) {
      setAvailableCredits(credits - totalCost)
    }
  }, [questions, credits])

  return { canVote, vote, reset, questions, availableCredits, pool }
}

export default useQuadraticAnimated
