export const generateGoogleCalendarLink = (event: { 
  title: string; 
  description: string; 
  location: string;
  start: Date; 
  durationMinutes: number; 
}) => {
  const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const startDate = formatDate(event.start);
  const endDate = formatDate(new Date(event.start.getTime() + event.durationMinutes * 60000));

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${startDate}/${endDate}`
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const generateIcsContent = (event: { 
  title: string; 
  description: string; 
  location: string;
  start: Date; 
  durationMinutes: number; 
}) => {
  const formatDate = (date: Date) => date.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const startDate = formatDate(event.start);
  const endDate = formatDate(new Date(event.start.getTime() + event.durationMinutes * 60000));

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SQ Consulting//Booking System//EN
BEGIN:VEVENT
UID:${Date.now()}@sqconsulting.com
DTSTAMP:${startDate}
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;
};
