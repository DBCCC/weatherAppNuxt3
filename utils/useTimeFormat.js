
export function formatUnixTimeTo12Hour(timestamp) {
    const date = new Date(timestamp * 1000)
    let hours = date.getHours()
    const minutes = date.getMinutes()
    const period = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12
    hours = hours ? hours : 12
  
    const formattedTime = minutes === 0 ? `${hours} ${period}` : `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`

    return formattedTime
  }
  