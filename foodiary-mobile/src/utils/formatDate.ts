export function formatDate(date: Date): string {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: '2-digit',
    month: 'long'
  };

  const formattedDate = new Intl.DateTimeFormat('pt-BR', options)
    .format(date)
    .toUpperCase();

  if (isToday) {
    return `HOJE, ${formattedDate.split(', ')[1]}`;
  }

  return formattedDate;
}