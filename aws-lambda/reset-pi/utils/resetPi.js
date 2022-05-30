const getDefaultPiValue = () => {
  const default_params = {
    q: '60',
    r: '13440',
    t: '10080',
    i: '3',
    pi: '3',
  }
  return default_params
}

module.exports = {
  getDefaultPiValue,
}
