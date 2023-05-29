function getMinMax(str) {
  let num = str.split(' ').map(Number).filter(Boolean);  
 
      return {
          min: Math.min.apply(Math, num),
          max: Math.max.apply(Math, num)
      };
 
}
