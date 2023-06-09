let characterRepository = (function () {
  let characterList = [];
  let api =
    'https://raw.githubusercontent.com/alexislours/ACNHAPI/master/villagers.json';

  //get all characters function
  function getAll() {
    return characterList;
  }

  //add new character function
  function addCharacter(character) {
    if (typeof character === 'object') {
      characterList.push(character);
    }
  }

  //add characters to webpage
  function addCharacterOnPage(character) {
    let pageList = document.querySelector('.all-characters');
    // pageList.classList.add('list-group');
    pageList.classList.add('d-flex', 'flex-wrap', 'justify-content-around');

    //create HTML elements
    let pageListItem = document.createElement('div');
    let itemName = document.createElement('button');
    let itemImage = document.createElement('img');

    //define element info
    pageListItem.classList.add(
      'd-flex',
      'flex-column-reverse',
      'justify-center',
      'pageListItem'
    );
    itemName.innerText = character.name;
    itemName.classList.add('btn', 'btn-success', 'character-button');
    itemName.setAttribute('type', 'button');
    itemName.setAttribute('data-toggle', 'modal');
    itemName.setAttribute('data-target', '#characterModal');
    itemImage.setAttribute('src', character.image);
    itemImage.setAttribute('alt', 'character photo');
    itemImage.setAttribute('class', 'img-fluid');

    //append elements
    pageList.appendChild(pageListItem);
    pageListItem.appendChild(itemName);
    pageListItem.appendChild(itemImage);

    itemName.addEventListener('click', function () {
      showDetails(character);
    });
  }

  //declare jQuery variables
  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');
  let modalHeader = $('.modal-header');
  let modalFooter = $('.modal-footer');
  let funButton = $('.fun-button');

  // add showModal function
  function showModal(character) {
    //clear modals
    modalTitle.empty();
    modalBody.empty();
    modalHeader.empty();
    modalFooter.empty();

    //create content elements
    let characterInfo = $('<div></div>');
    characterInfo.attr('class', 'character-info');
    let characterName = $('<h1>' + character.name + '</h1>');
    characterName.attr('class', 'character-name');
    let characterImage = $("<img class='modal-image' width='50%'>");
    characterImage.attr('src', character.image);
    characterImage.attr('alt', 'character photo');
    characterImage.attr('class', 'img-fluid');
    let characterSpecies = $('<p>' + 'Species: ' + character.species + '</p>');
    let characterPersonality = $(
      '<p>' + 'Personality: ' + character.personality + '</p>'
    );
    let characterSaying = $('<p>' + 'Saying: ' + character.saying + '</p>');

    //create footer element
    let fun = $(
      '<button>' + 'Catchphrase: ' + character.catchPhrase + '</button>'
    );
    fun.attr('class', 'btn btn-success footer-button');
    let close = $('<button>' + 'Close' + '</button>');
    close.attr('type', 'button');
    close.attr('class', 'btn btn-secondary footer-button');
    close.attr('data-dismiss', 'modal');

    //append to modal
    characterInfo.append(characterPersonality);
    characterInfo.append(characterSpecies);
    characterInfo.append(characterSaying);

    modalTitle.append(characterName);
    modalBody.append(characterImage);
    modalBody.append(characterInfo);
    modalHeader.append(modalTitle);
    modalFooter.append(fun);
    modalFooter.append(close);
  }

  //get api info
  function getApiInfo() {
    return fetch(api)
      .then(function (response) {
        return response.json();
      })
      .then(function (object) {
        //loop through nested objects
        let keysArray = Object.keys(object);

        for (let i = 0; i < keysArray.length; i++) {
          let character = {
            name: object[keysArray[i]].name['name-USen'],
            personality: object[keysArray[i]].personality,
            species: object[keysArray[i]].species,
            catchPhrase: object[keysArray[i]]['catch-phrase'],
            image: object[keysArray[i]].image_uri,
            saying: object[keysArray[i]].saying,
          };
          addCharacter(character);
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //search for character
  let searchInput = document.querySelector('.search-bar__input');
  let currentValue = searchInput.value;

  function getSearchInput() {
    currentValue = searchInput.value;
  }

  searchInput.addEventListener('input', getSearchInput);

  function searchForInput() {
    currentValue = searchInput.value;
    characterList.filter(function (character) {
      if (character.name.toUpperCase() === currentValue.toUpperCase()) {
        $('#characterModal').modal('toggle');
        showDetails(character);
      }
    });
  }

  function showDetails(character) {
    characterRepository.getApiInfo(character).then(function () {
      showModal(character);
    });
  }

  document
    .querySelector('.search-bar__button')
    .addEventListener('click', searchForInput);

  return {
    getAll,
    addCharacter,
    addCharacterOnPage,
    getApiInfo,
    showModal,
    getSearchInput,
    searchForInput,
  };
})();

characterRepository.getApiInfo().then(function () {
  //data is loaded
  characterRepository.getAll().forEach(function (character) {
    characterRepository.addCharacterOnPage(character);
  });
});
