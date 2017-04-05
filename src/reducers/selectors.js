export const getUser = (state, login) => {
  return state.entities.users[login]
}