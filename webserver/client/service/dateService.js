// @flow

const months: Array<string> = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const weeks: Array<string> = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun'
];

/*
* Accept utc milli second and return string '{Month} {Day} {Year} : {Hour}:{Minutes}:{Second}' like below
* Jan 1 2017 Sun 00:00
*/
export function utcToDate(utcMilliSec: number): string {
  const date: Date = new Date(0);
  date.setUTCMilliseconds(utcMilliSec);
  const yyyy = date.getFullYear();
  const mm = months[date.getMonth()];
  const dd = toDoubleDigits(date.getDate());
  const hh = toDoubleDigits(date.getHours());
  const mi = toDoubleDigits(date.getMinutes());
  const day = weeks[date.getDay()];

  return mm + ' ' + dd + ' ' + yyyy + ' ' + day + ' ' + hh + ':' + mi;
}

function toDoubleDigits(num: number): string {
  let strNum = String(num);
  if (strNum.length === 1) {
    strNum = '0' + strNum;
  }
  return strNum;
}
