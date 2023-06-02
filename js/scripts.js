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
    }).then(function(object){
      //loops through nested objects
      let keysArray = Object.keys(object)
      console.log(keysArray.length);
    
      for(let i = 0; i < keysArray.length; i++) {
        let character = {
          name: object[keysArray[i]].name.nameUsen,
          personality: object[keysArray[i]].personality,
          species: object[keysArray[i]].species,
          catchPhrase: object[keysArray[i]].catchPhrase,
          image: object[keysArray[i]].image,
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
   // addCharacterOnPage,
    getApiInfo
  };
})();

characterRepository.getApiInfo().then(function() {
  //data is loaded
  characterRepository.getAll().forEach(function(character) {
    console.log(character);
  });
})

