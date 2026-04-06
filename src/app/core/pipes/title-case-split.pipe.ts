import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCaseSplit',
  standalone: true,
})
export class TitleCaseSplitPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const specialCases: Record<string, string> = {
      dob: 'DOB',
    };

    if (specialCases[value]) return specialCases[value];

    return value.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str) => str.toUpperCase());
  }
}
