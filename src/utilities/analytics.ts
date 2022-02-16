export const userId = ['userid', 'userId', 'userID']

export const checkUserId = (answers: []) => {
  let flag = false
  answers.forEach((answer) => {
    userId.forEach((id) => {
      if (answer[id]) {
        flag = true
      }
    })
  })

  return flag
}
