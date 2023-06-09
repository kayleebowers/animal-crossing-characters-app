let characterRepository = (function () {
  let characterList = [];
  let api = "https://raw.githubusercontent.com/alexislours/ACNHAPI/master/villagers.json";

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
  function addCharacterOnPage (character) {
    let pageList = document.querySelector('.all-characters');

    //create HTML elements
    let pageListItem = document.createElement('div');
    let itemName = document.createElement('button');

    //define element info
    pageListItem.classList.add('character-box');
    itemName.innerText = character.name;
    itemName.classList.add('btn');
    itemName.classList.add('btn-primary');
    itemName.setAttribute("type", "button");
    itemName.setAttribute("data-toggle", "modal");
    itemName.setAttribute("data-target", "#characterModal");

    //append elements
    pageList.appendChild(pageListItem);
    pageListItem.appendChild(itemName);

  }
  
  // add showModal function
  function showModal(character) {
    //declare jQuery variables
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    let modalHeader = $('.modal-header');

    //clear modals
    modalTitle.empty();
    modalBody.empty();
    modalHeader.empty();

    //create content elements
    let characterName = $("<h1>" + character.name + "</h1>");
    let characterImage = $("<img class='modal-image' width='50%'>");
    characterImage.attr("src", character.image);
    characterImage.attr("alt", "character photo");
    characterImage.attr("class", "img-fluid");
    let characterSpecies = $("<p>" + "Species: " + character.species + "</p>");
    let characterPersonality = $("<p>" + "Personality: " + character.personality + "</p>");

    //append to modal
    modalTitle.append(characterName);
    modalBody.append(characterImage);
    modalBody.append(characterSpecies);
    modalBody.append(characterPersonality);
    modalHeader.append(modalTitle);
  }

  //get api info
  function getApiInfo() {
    return fetch(api).then(function(response) {
      return (response.json());
    }).then(function(object){
      //loops through nested objects
      let keysArray = Object.keys(object)
      console.log(keysArray.length);
    
      for(let i = 0; i < keysArray.length; i++) {
        let character = {
          name: object[keysArray[i]].name['name-USen'],
          personality: object[keysArray[i]].personality,
          species: object[keysArray[i]].species,
          catchPhrase: object[keysArray[i]]['catch-phrase'],
          image: object[keysArray[i]].image_uri,
          saying: object[keysArray[i]].saying
        }
        addCharacter(character);
        };
    }).catch(function(e) {
      console.error(e);
    })
  }

  return {
    getAll,
    addCharacter,
    addCharacterOnPage,
    getApiInfo, 
    showModal
  };
})();

characterRepository.getApiInfo().then(function() {
  //data is loaded
  characterRepository.getAll().forEach(function(character) {
    characterRepository.addCharacterOnPage(character);
  });
})

