import Moment from 'moment';

export function formatDateTime(datetime) {
    return Moment(datetime).format('YYYY-MM-DD HH:mm');
};