export function formatDate(timestamp) {
    const date = new Date(timestamp * 1000)
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' })
    const day = date.getDate()
    const month = date.getMonth() + 1

    return `${dayOfWeek} ${day}/${month}`
  }