import moment from 'moment';

moment.locale('pt-br');

// TIME & DATE
export function getTime(append = ':') {
  return `${moment().format('DD/MM/YYYY-HH:mm:ss')}${append}`;
}

export function log(msg) {
  console.log(getTime(), msg);
}
