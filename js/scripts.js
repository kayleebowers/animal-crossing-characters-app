let characterRepository = (function () {
  let characterList = [];
  let api = "https://raw.githubusercontent.com/alexislours/ACNHAPI/master/villagers.json";

  //get all characters function
  function getAll() {
    return characterList;
  }

  //add new character function
  function addCharacter(character) {
    if (typeof character === 'object' && 'name' in character) {
      characterList.push(character);
    }
  }
  //add characters to webpage

  //get api info

  //get character info

  return {

  };
})();
