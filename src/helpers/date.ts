export function formatDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const newDay = day.toString().length === 1 ? `0${day}` : day;

  return `${year}-${month}-${newDay}`;
}
