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
      Object.keys(object).forEach(function(char) {
        let character = {
          name: character.name, //need to go one level deeper
          personality: character.personality,
          species: character.species,
          catchPhrase: character.catch-phrase,
          image: character.image_uri,
          saying: character.saying
        };
        addCharacter(character);
      });
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