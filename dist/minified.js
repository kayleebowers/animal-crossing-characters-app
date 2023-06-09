let characterRepository = (function () {
  let t = [];
  function e() {
    return t;
  }
  function a(e) {
    'object' == typeof e && t.push(e);
  }
  let n = $('.modal-body'),
    r = $('.modal-title'),
    c = $('.modal-header'),
    o = $('.modal-footer');
  function s(t) {
    r.empty(), n.empty(), c.empty(), o.empty();
    let e = $('<div></div>');
    e.attr('class', 'character-info');
    let a = $('<h1>' + t.name + '</h1>');
    a.attr('class', 'character-name');
    let s = $("<img class='modal-image' width='50%'>");
    s.attr('src', t.image),
      s.attr('alt', 'character photo'),
      s.attr('class', 'img-fluid');
    let i = $('<p>Species: ' + t.species + '</p>'),
      l = $('<p>Personality: ' + t.personality + '</p>'),
      p = $('<p>Saying: ' + t.saying + '</p>'),
      u = $('<button>Catchphrase: ' + t.catchPhrase + '</button>');
    u.attr('class', 'btn btn-success footer-button');
    let d = $('<button>Close</button>');
    d.attr('type', 'button'),
      d.attr('class', 'btn btn-secondary footer-button'),
      d.attr('data-dismiss', 'modal'),
      e.append(l),
      e.append(i),
      e.append(p),
      r.append(a),
      n.append(s),
      n.append(e),
      c.append(r),
      o.append(u),
      o.append(d);
  }
  $('.fun-button');
  let i = document.querySelector('.search-bar__input'),
    l = i.value;
  function p() {
    l = i.value;
  }
  function u() {
    (l = i.value),
      t.filter(function (t) {
        t.name.toUpperCase() === l.toUpperCase() &&
          ($('#characterModal').modal('toggle'), d(t));
      });
  }
  function d(t) {
    characterRepository.getApiInfo(t).then(function () {
      s(t);
    });
  }
  return (
    i.addEventListener('input', p),
    document.querySelector('.search-bar__button').addEventListener('click', u),
    {
      getAll: e,
      addCharacter: a,
      addCharacterOnPage: function t(e) {
        let a = document.querySelector('.all-characters');
        a.classList.add('d-flex', 'flex-wrap', 'justify-content-around');
        let n = document.createElement('div'),
          r = document.createElement('button'),
          c = document.createElement('img');
        n.classList.add(
          'd-flex',
          'flex-column-reverse',
          'justify-center',
          'pageListItem'
        ),
          (r.innerText = e.name),
          r.classList.add('btn', 'btn-success', 'character-button'),
          r.setAttribute('type', 'button'),
          r.setAttribute('data-toggle', 'modal'),
          r.setAttribute('data-target', '#characterModal'),
          c.setAttribute('src', e.image),
          c.setAttribute('alt', 'character photo'),
          c.setAttribute('class', 'img-fluid'),
          a.appendChild(n),
          n.appendChild(r),
          n.appendChild(c),
          r.addEventListener('click', function () {
            d(e);
          });
      },
      getApiInfo: function t() {
        return fetch(
          'https://raw.githubusercontent.com/alexislours/ACNHAPI/master/villagers.json'
        )
          .then(function (t) {
            return t.json();
          })
          .then(function (t) {
            let e = Object.keys(t);
            for (let n = 0; n < e.length; n++)
              a({
                name: t[e[n]].name['name-USen'],
                personality: t[e[n]].personality,
                species: t[e[n]].species,
                catchPhrase: t[e[n]]['catch-phrase'],
                image: t[e[n]].image_uri,
                saying: t[e[n]].saying,
              });
          })
          .catch(function (t) {
            console.error(t);
          });
      },
      showModal: s,
      getSearchInput: p,
      searchForInput: u,
    }
  );
})();
characterRepository.getApiInfo().then(function () {
  characterRepository.getAll().forEach(function (t) {
    characterRepository.addCharacterOnPage(t);
  });
});
