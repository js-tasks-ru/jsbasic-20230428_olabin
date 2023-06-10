/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = del(rows)
    }
  }
  function Table(td) {
    return `
    <tr>
    <td>${td.name}</td>
    <td>${td.age}</td>
    <td>${td.salary}</td>
    <td>${td.city}</td>
    <td><button>[X]</button></td>
  </tr>
    `
  }
  function HTML(ar){
    return `
    <thead>
          <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
          </tr>
      </thead>
      <tbody>
          ${ar.map(Table).join('')}
      </tbody>`
  }
  function del(ar){
    const table = document.createElement("table");
    table.innerHTML = HTML(ar);
    const x = table.querySelectorAll("button")
    for (const button of x){
    button.addEventListener('click', (event) => event.target.closest("tr").remove())  
    }
    return table;
}
