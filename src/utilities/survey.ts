import { QuadraticForSurvey } from '../../types/survey-base'

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

export const createQuestions = (questions: QuadraticForSurvey[]) => {
  const newQs = questions.map((question) => ({
    ...question,
    vote: 0,
    credits: 0,
    order: 0,
  }))

  return shuffle(newQs).map((question, index) => ({ ...question, order: index }))
}

export const setSurveyTaken = (surveyId: string, status: 'pilot' | 'published' | 'finished') => {
  if (status === 'published') {
    const item = window.localStorage.getItem('__civicbase_taken_surveys__')
    const takenSurveys: string[] = item ? JSON.parse(item) : []

    const isExist = takenSurveys.find((id) => id === surveyId)

    if (!isExist) {
      takenSurveys.push(surveyId)
      window.localStorage.setItem('__civicbase_taken_surveys__', JSON.stringify(takenSurveys))
    }
  }
}
