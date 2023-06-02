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

    let pageListItem = document.createElement('div');
    let itemName = document.createElement('p');

    itemName.innerText = character.name;
    itemName.classList.add('character-name');

    pageList.appendChild(pageListItem);
    pageListItem.appendChild(itemName);
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

  //get character info

  return {
    getAll,
    addCharacter,
    addCharacterOnPage,
    getApiInfo
  };
})();

characterRepository.getApiInfo().then(function() {
  //data is loaded
  characterRepository.getAll().forEach(function(character) {
    characterRepository.addCharacterOnPage(character);
  });
})

