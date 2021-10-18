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
    return hours > 0
      ? hours + ' hours ' + minutes + ' minutes'
      : minutes + ' minutes';
  }
}
