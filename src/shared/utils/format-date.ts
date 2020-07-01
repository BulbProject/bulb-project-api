import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatDate = (date: Date): string => `${dayjs.utc(date).format('YYYY-MM-DDTHH:mm:ss')}Z`;
