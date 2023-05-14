function camelize(str) {
  return str.split('-').map((a, b) => b == 0 ? a : a[0].toUpperCase() + a.slice(1)).join(''); 
}
