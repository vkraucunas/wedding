

module.exports = {
  matchGuestLimit: (data) => {
    const addThisMany = data[0].guest_limit - data.length

    for (let i = 0; i < addThisMany; i++) {
      const blank = {
        fname: '',
        lname: '',
        invite_id: data.invite_id,
        guest_id: null
      }
      data.push(blank)
    }
    return data
  }
}
