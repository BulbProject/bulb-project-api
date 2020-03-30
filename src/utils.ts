import dayjs from 'dayjs';

export const formatDate = (date: Date): string => `${dayjs(date).format('YYYY-MM-DDTHH:mm:ss')}Z`;
