import { QuadraticForSurvey } from '../../types/survey-base'

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
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
