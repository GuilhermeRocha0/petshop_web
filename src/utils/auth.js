export const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp * 1000 // converter para ms
    return Date.now() < exp
  } catch (error) {
    return false
  }
}
