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
