export default () => {
  const url = 'https://jungle-soundbot-api.herokuapp.com'

  return (endpoint, options) => {
    return fetch(`${url}/${endpoint}`, options)
  }
}
