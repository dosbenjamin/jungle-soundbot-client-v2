export default () => {
  const url = 'https://jungle-soundbot-api.dhcp24.easypanel.host'

  return (endpoint, options) => {
    return fetch(`${url}/${endpoint}`, options)
  }
}
