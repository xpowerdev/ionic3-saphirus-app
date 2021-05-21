import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the DateformatPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateformat',
})
export class DateformatPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    let created = new Date(value);
    let dd: any = created.getDate();
    let mm: any = created.getMonth() + 1;

    let yyyy = created.getFullYear();
    if(dd < 10){
      dd ='0' + dd;
    } 
    if(mm < 10){
      mm ='0' + mm;
    } 
    return dd + '/'+ mm + '/' + yyyy;
  }
}
