//IIFE function
let pokemonRepository = (function () {
  //List of pokemon Array
  let pokemonList = [
    {
     name: 'Bulbasaur ',
     height: 2.4,
     types: ['Grass ', 'Poison']
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
  return {
    add: add,
    getAll: getAll
  }
})();
// for each function to write pokemon and its name/height/type
  pokemonRepository.getAll().forEach(function(pokemon){
  document.write( '<p class="whole-info">' + '<h2 class="pokemon-name">' + pokemon.name + '</h2>' + ' (Height: ' + pokemon.height + '\), ' + ' Types: ' + pokemon.types + '</p> <br>');
});
