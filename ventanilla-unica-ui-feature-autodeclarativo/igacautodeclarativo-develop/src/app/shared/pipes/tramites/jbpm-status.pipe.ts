import {Pipe, PipeTransform} from '@angular/core';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';

@Pipe({
  name: 'jbpmStatus'
})
export class JbpmStatusPipe implements PipeTransform {

  transform(value: number): string {
    if (isNotNullOrUndefined(value)) {
      return value === 1 ? 'Para asignación' :
        value === 2 ? 'Finalizado' :
          value === 3 ? 'Rechazado' : null;
    } else {
      return null;
    }
  }

}
