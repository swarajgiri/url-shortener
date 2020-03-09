
module.exports = (cfg) => {
  const formatPayload = ({ status = 200, data = {}, errors = [] }) => {
    return {
      status,
      data,
      errors
    }
  }

  return { formatPayload }
}
