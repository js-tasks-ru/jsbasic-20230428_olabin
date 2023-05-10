function sumSalary(salaries) {
  let sum = 0;
  for (chislo in salaries) {
    if (isFinite(salaries[chislo])) sum += salaries[chislo];
  }
  return sum;
}
