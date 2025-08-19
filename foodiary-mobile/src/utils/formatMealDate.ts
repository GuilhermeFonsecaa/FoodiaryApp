function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1); //primeira letra maiuscula
}

export function formatMealDate(date: Date) {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "long", //escrito completo
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, //formato 24h
  };

  const formattedDate = new Intl.DateTimeFormat("pt-BR", dateOptions).format(
    date
  );
  const formattedTime = new Intl.DateTimeFormat("pt-BR", timeOptions)
    .format(date)
    .replace(":", "h"); //troca : por h

  return isToday
    ? `Hoje, ${formattedTime}`
    : `${capitalize(formattedDate)}, ${formattedTime}`;
}
