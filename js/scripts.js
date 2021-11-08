//IIFE function
let pokemonRepository = (function () {
  //List of pokemon Array
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'


function showDetails(pokemon) {
  loadDetails(pokemon).then(function () {
    console.log(pokemon);
  });
}

//adds pokemon to the pokedex
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  let modalContainer = document.querySelector('#modal-container');
  function showModal(pokemon) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'X';
    closeButtonElement.style.fontSize = "40px"
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = pokemon.name;
    titleElement.style.textTransform = 'uppercase';

    let contentElement = document.createElement('p');
    contentElement.innerText = ('Height: ') + pokemon.height;

    let imgElement = document.createElement('img');
    imgElement.src = pokemon.imageUrl

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imgElement)


    pokemon.types.forEach(item => {
        let contentElement = document.createElement('p');
        contentElement.innerText = ('Type: ') + item.type.name;
        modal.appendChild(contentElement);
    });

    modalContainer.appendChild(modal);
    modalContainer.classList.add('is-visible');
  }

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  function showDialog(title, text) {
  showModal(title, text);
  let modalContainer = document.querySelector('#modal-container');
  let modal = modalContainer.querySelector('.modal');

  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';

  let cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  confirmButton.focus();

  return new Promise((resolve, reject) => {
    cancelButton.addEventListener('click', () => {
    hideModal();
    reject();
  })
  confirmButton.addEventListener('click', () => {
    hideModal();
    resolve();
  })
  });
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });
  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  function getAll() {
    return pokemonList
  }

  function addListItem(pokemon) {
      let list = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button', 'btn', 'btn-primary')
      listItem.classList.add('group-list-item')
      button.setAttribute('data-toggle','modal')
      button.setAttribute('data-target','#targetModal')
      listItem.appendChild(button)
      list.appendChild(listItem)

      // call showDetails function upon button click
      button.addEventListener('click', function() {
          showDetails(pokemon);
      });
  }

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }) .then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon)
      });
    }).catch(function (e) {
      console.error(e)
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default,
      item.height = details.height,
      item.types = details.types
    }).catch(function (e) {
      console.error(e);
    });
  }
  function showDetails(pokemon) {
       loadDetails(pokemon).then(function() {
         let modalTitle = $('.modal-title');
         modalTitle.text(pokemon.name);

         let height = $('.pokemon-height');
         let img = $('.pokemon-img');
         height.text(`Height: ${pokemon.height}`);
         img.attr('src', pokemon.imageUrl);

         let typesArr = []
         let pokemonTypes = $('.pokemon-types')
         pokemon.types.forEach(item => {
         let types = item.type.name
         typesArr.push(types)
       });
           let string = typesArr.join(' & ')
           pokemonTypes.text(`Type(s): ${string}`)
       });
   };

    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    }
  })();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon)
});
});
