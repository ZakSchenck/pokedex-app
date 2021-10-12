let pokemonList = [
  {
   name: 'Bulbasaur ',
   height: 2.4,
   types: ['grass', 'poison']
 },
  {
   name: ' Charmander ',
   height: 2,
   types: 'fire'
 },
  {
   name: ' Squirtle ',
   height: 1.8,
   types: 'water'
 }
];

for (let i=0; i < pokemonList.length; i++) {
  document.write('<p id="pokedex-style">' + pokemonList[i].name + ('\(Height: ') + pokemonList[i].height + '\)' + '</p> <br>')
  if (pokemonList[i].height > 2) {
    document.write('- Wow! That is big.')
  }
}
