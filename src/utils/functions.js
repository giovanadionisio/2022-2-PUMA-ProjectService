module.exports = ({
  checkInt: (id) => {
    return typeof(id) === 'number' && isFinite(id) && Math.round(id) === id
  }
})
