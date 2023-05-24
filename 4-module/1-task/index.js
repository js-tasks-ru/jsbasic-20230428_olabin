function makeFriendsList(friends) {
  const spisok = document.createElement('ul');
    for (let elem of friends) {
        let stroka = document.createElement('li');
        stroka.innerHTML = `${elem.firstName} ${elem.lastName}`;
        spisok.appendChild(stroka);
    }
    return spisok;
}
