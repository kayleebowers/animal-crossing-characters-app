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
  // //add characters to webpage
  // function addCharacterOnPage (character) {
  //   let characters = document.querySelector('all-characters');

  //   document.createElement('div');
  //   document.createElement('button');

  //   button.innerText = character.name;

  //   characters.appendChild('div');
  //   characters.appendChild('button');
  // }
  
  //get api info
  function getApiInfo() {
    return fetch(api).then(function(response) {
      return (response.json());
    }).then(function(object) {
      for (key in object) {
        for (innerKey in key) {
          let foundCharacter = {
            name: foundCharacter.name, //need to go one level deeper
            personality: foundCharacter.personality,
            species: foundCharacter.species,
            catchPhrase: foundCharacter.catch-phrase,
            image: foundCharacter.image_uri,
            saying: foundCharacter.saying
        }
        addCharacter(foundCharacter);
        };
      }
    }).catch(function(e) {
      console.error(e);
    })
  }

  //get character info

  return {
    getAll,
    addCharacter,
   // addCharacterOnPage,
    getApiInfo
  };
})();

characterRepository.getApiInfo();