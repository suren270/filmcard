import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: true
})
export class FilterPipe implements PipeTransform {

  transform(value : any[], filterString: string, propName:string): any[] {
    if(!value || filterString==='' || propName ===''){
      return value;
    }
    
    const lowerFilterString = filterString.toLowerCase();
    return value.filter((item:any) => 
      item[propName]?.trim().toLowerCase().includes(lowerFilterString)
    );
  }

}