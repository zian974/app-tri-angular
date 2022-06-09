export const toUrlParams = ( data: any ): string => {
  let str = '';

  for (const key in data ) {
    if (data.hasOwnProperty(key) && data[key]) {
      let valKey = data[key];
      if (valKey === Object(valKey) ) {
        for(const subKey in valKey ) {
          let subKeyVal = valKey[ subKey as keyof typeof valKey ];
          if (valKey.hasOwnProperty(subKey) && subKeyVal ) {
            if (str !== '') str += "&";
            str += key + "[" + subKey + "]=" + subKeyVal
          }
        };
      }
      else {
        if (str !== '') str += "&";
        str += key + "=" + valKey
      }
    }
  }

  return str;
}
