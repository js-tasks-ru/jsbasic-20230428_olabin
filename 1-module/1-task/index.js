function factorial(n){
  let chislo = 1;
  if (n == 0 || n == 1){
    return chislo;
  }
  else if(n > 1){
    for(i = n; i >= 1; i--){
      chislo = chislo * i;
    }
    return chislo;
    chislo = factorial(n);
  }
  else{
    return "Число должно быть положительным"
  }  
}
