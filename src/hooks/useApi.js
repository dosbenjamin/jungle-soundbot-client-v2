export default () => {
  const url = 'https://api-production-449c.up.railway.app'

  return (endpoint, options) => {
    return fetch(`${url}/${endpoint}`, options)
  }
}
