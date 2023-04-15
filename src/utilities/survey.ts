import { PricedForSurvey, QuadraticForSurvey } from '../../types/survey-base'

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }

  return array
}

export const createQuestions = (questions: QuadraticForSurvey[], priced: number[] = []) => {
  const newQs = questions.map((question, qIndex) => {
    const min = -10
    const max = 10
    const randomInt = Math.floor(Math.random() * (max - min + 1) + min)
    const cost = priced.length > 0 ? priced[qIndex] : 1
    return {
      ...question,
      vote: randomInt,
      userVotes: 0,
      credits: 0,
      order: 0,
      status: undefined,
      animated: [],
      cost: cost,
    }
  })

  return shuffle(newQs).map((question, index) => ({ ...question, order: index }))
}
export const createPricedQuestions = (questions: PricedForSurvey[], currentObservation: number, costs?: [number[]]) => {
  const newQs = questions.map((question, qIndex) => {
    const min = -10
    const max = 10
    const randomInt = Math.floor(Math.random() * (max - min + 1) + min)
    let cost = 1
    if (costs && costs?.length > 0) {
      cost = costs[currentObservation - 1].length > 0 ? costs[currentObservation - 1][qIndex] : 1
    }
    return {
      ...question,
      vote: randomInt,
      preVotes: randomInt,
      userVotes: 0,
      credits: 0,
      order: 0,
      status: undefined,
      animated: [],
      cost: cost,
    }
  })

  return shuffle(newQs).map((question, index) => ({ ...question, order: index }))
}

export const setSurveyTaken = (surveyId: string, status: 'pilot' | 'published' | 'finished') => {
  if (status === 'published') {
    const item = window.localStorage.getItem('__civicbase_taken_surveys__')
    const takenSurveys: string[] = item ? JSON.parse(item) : []

    // const isExist = takenSurveys.find((id) => id === surveyId)

    // if (!isExist) {
    //   takenSurveys.push(surveyId)
    //   window.localStorage.setItem('__civicbase_taken_surveys__', JSON.stringify(takenSurveys))
    // }
    takenSurveys.push(surveyId)
    window.localStorage.setItem('__civicbase_taken_surveys__', JSON.stringify(takenSurveys))
  }
}
