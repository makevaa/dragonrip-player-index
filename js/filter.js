
const filterList = () => {
  const input = document.getElementById('filter');
  const filter = input.value.toLowerCase();

  let list = document.getElementById('player-list');

  if (list.classList.contains('hidden')) {
    list = document.getElementById('clan-list');
  }


  const elems = list.querySelectorAll('.item');

  // Loop through all list items, and hide those who don't match the search query
  for (let i = 0; i < elems.length; i++) {
    const elem = elems[i];
    const elemString = elem.getAttribute('data-filter-string');

    if (elemString.toLowerCase().indexOf(filter) > -1) {
      elem.style.display = "";
    } else {
      elem.style.display = "none";
    }
  }
}

const clearFilterBar = () => {
  document.getElementById('filter').value = '';
  //searchFromPlaylist(); //search with empty field to show all tracks again
  //show all tracks again
  const playerElems = document.querySelectorAll('#player-list > .item');
  for (let i = 0; i < playerElems.length; i++) {
    playerElems[i].style.display = "";
  }

  const clanElems = document.querySelectorAll('#clan-list > .item');
  for (let i = 0; i < clanElems.length; i++) {
    clanElems[i].style.display = "";
  }
}

