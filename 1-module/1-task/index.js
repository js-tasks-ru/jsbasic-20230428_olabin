function factorial(n){
  let chislo = 1;
  if (n == 0 || n == 1){
    return chislo;
  }
  
    for(i = n; i > 1; i--){
      chislo = chislo * i;
    }
    return chislo;
     
 }
