//IIFE function
let pokemonRepository = (function () {
  //List of pokemon Array
  let pokemonList = [
    {
     name: 'Bulbasaur ',
     height: 2.4,
     types: ['Grass', 'Poison']
   },
    {
     name: ' Charmander ',
     height: 2,
     types: 'Fire'
   },
    {
     name: ' Squirtle ',
     height: 1.8,
     types: 'Water'
   }
  ];
//adds pokemon to the pokedex
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList
  }

  function addListItem(pokemon) {
    let listContainer = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button')
    button.innerText = pokemon.name;
    button.classList.add('poke-button');
    listItem.appendChild(button);
    listContainer.appendChild(listItem)

    button.addEventListener('click', function() {
      showDetails(pokemon)
    })
  }

  function showDetails(pokemon) {
    console.log(pokemon.name)
  }

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    }
  })();


pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon)
});
