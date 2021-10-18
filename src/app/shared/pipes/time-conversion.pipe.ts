import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConversion',
})
export class TimeConversionPipe implements PipeTransform {
  transform(minutes: number): string {
    let hours = 0;
    while (minutes >= 60) {
      hours++;
      minutes -= 60;
    }
    let hoursString = '';
    let minutesString = '';
    if (hours > 0) {
      hoursString = hours + ' hour';
      hoursString += hours > 1 ? 's' : '';
    }
    if (minutes > 0) {
      minutesString = minutes + ' minute';
      minutesString += minutes > 1 ? 's' : '';
    }
    return hours > 0
      ? (hoursString + ' ' + minutesString).trim()
      : minutesString;
  }
}
