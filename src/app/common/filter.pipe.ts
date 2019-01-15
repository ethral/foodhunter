import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if(value == null || filterString === ''){
      return value;
    }
    // const resultArray = [];
    // for(const item of value ){
    //     if(item[propName] === filterString)
    //   //if(item[propName].toLowercase().includes(filterString.toLowerCase()))
    //   {
    //     resultArray.push(item);
    //   }
    // }
    // return resultArray;

    return value.filter( it => {
        return it.name.toLowerCase().includes(filterString.toLowerCase());
      });

  }

}






// export class FilterPipe implements PipeTransform {
//     transform(items: any[], searchText: string): any[] {
//       if(!items) return [];
//       if(!searchText) return items;
//   searchText = searchText.toLowerCase();
//   return items.filter( it => {
//         return it.toLowerCase().includes(searchText);
//       });
//      }
//   }