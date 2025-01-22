import { Repository } from 'typeorm'

export function processData (response: any,index:number){
  return index == 0 ? response[0] : response[0][0]
}

export function removeProperties(obj, propsToRemove) {
  Object.entries(obj).forEach(([key, value]) => {
    // Remove property if it's in the list
    if (propsToRemove.includes(key)) {
      delete obj[key];
    } else if (Array.isArray(value)) {
      // Recursively process each item in an array
      value.forEach(item => {
        if (typeof item === 'object' && item !== null) {
          removeProperties(item, propsToRemove);
        }
      });
    } else if (typeof value === 'object' && value !== null) {
      // Recursively process nested objects
      removeProperties(value, propsToRemove);
    }
  });

  return obj;
}


export function processPaginationData (response: any){
  const { page, itemsPerPage, totalItems, data } = response[0][0];

  return {
    page: page,
    itemsPerPage: itemsPerPage,
    totalItems: totalItems,
    data:data
  }
}


//
// DB_USER=root
// DB_PWD=Qwertyuiop@123
// DB_HOST=15.235.192.41
// DB_PORT=3306
// DATABASE=accident_detection_DB
//
