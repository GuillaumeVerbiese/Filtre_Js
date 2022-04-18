const app = {

  containerElement: null,
  filteredTeachers: null,

  state: {
    currentLanguage: 'PHP',
    currentSpe: 'Symfony',

    languages: ['PHP', 'JavaScript'],
    specialities: ['WordPress', 'Data', 'Symfony', 'React'],
    teachers: [
      {
        name: 'Loris',
        language: 'PHP',
        speciality: 'WordPress',
      },
      {
        name: 'Jean',
        language: 'JavaScript',
        speciality: 'Data',
      },
      {
        name: 'Jean-Christophe',
        language: 'PHP',
        speciality: 'Symfony',
      },
      {
        name: 'Jean-Philippe',
        language: 'PHP',
        speciality: 'Symfony',
      },
      {
        name: 'Julien',
        language: 'PHP',
        speciality: 'React',
      },
      {
        name: 'Vincent',
        language: 'JavaScript',
        speciality: 'React',
      },
      {
        name: 'Tony',
        language: 'JavaScript',
        speciality: 'React',
      },
    ]
  },

  init: function() {
    app.createFinder();
  },

  createFinder: function() {
    // Récupération de la <div class="container" id="app"></div>
    app.containerElement = document.getElementById('app');

    app.filteredTeachers = app.state.teachers.filter((teacher) => {
      return (
        teacher.language === app.state.currentLanguage
        && teacher.speciality === app.state.currentSpe
      );
    });

    console.log(app.filteredTeachers);

    // On appel les différentes méthodes de création de composants
    app.createForm();
    app.createCounter();
    app.createList();
  },

  // Méthode pour créer l'UI du formulaire
  createForm: function() {
    const formElement = app.configureElement('form', app.containerElement, {
      className: 'search'
    });

    const languagesSelectElement = app.configureElement('select', formElement, {
      className: 'search-choices',
    });

    app.state.languages.forEach((language) => {
      app.configureElement('option', languagesSelectElement, {
        value: language,
        textContent: language,
        selected: language === app.state.currentLanguage
      });
    });

    languagesSelectElement.addEventListener('change', app.handleChangeLanguage);

    const speSelectElement = app.configureElement('select', formElement, {
      className: 'search-choices'
    });

    app.state.specialities.forEach((speciality) => {
      app.configureElement('option', speSelectElement, {
        value: speciality,
        textContent: speciality,
        selected: speciality === app.state.currentSpe
      });
    });

    speSelectElement.addEventListener('change', app.handleChangeSpe);
  },

  createCounter: function() {
    const counter = app.filteredTeachers.length;
    const counterElement = app.configureElement('p', app.containerElement, {
      className: 'counter',
      textContent: `${counter} profs trouvés`,
    });
  },

  createList: function() {
    const ulElement = app.configureElement('ul', app.containerElement, {
      className: 'list',
    });

    app.filteredTeachers.forEach(function(element) {
      const liElement = app.configureElement('li', ulElement, {className: 'list-item', textContent: element.name});

      const spanLanguageElement = app.configureElement('span', liElement, {
        className: 'list-tag list-tag--language',
        textContent: element.language
      });

      const spanSpeElement = app.configureElement('span', liElement, {
        className: 'list-tag list-tag--spe',
        textContent: element.speciality
      });
    }
    );
  },

  /**
   * Méthode permettant de configurer un élément HTML
   * 
   * @param {string} tag le nom du tag a créer
   * @param {Element} parent element HTML parent
   * @param {Objet} attributes Les attributs à rajouter sur l'élément
   * @returns l'élément crée
   */
  configureElement: function(tag, parent, attributes) {
    const element = document.createElement(tag);
    // On rajoute les attributs reçu en param à l'élément HTML
    for (const key in attributes) {
      element[key] = attributes[key];
    }
    parent.appendChild(element);
    return element;
  },


  handleChangeLanguage: function(event) {
    const selectedLanguage = event.currentTarget.value;

    console.log(app.state.currentLanguage);
    app.state.currentLanguage = selectedLanguage;
    console.log(app.state.currentLanguage);

    app.containerElement.innerHTML = '';
    app.init();
  },

  handleChangeSpe: function(event) {
    const selectedSpe = event.currentTarget.value;

    console.log(app.state.currentSpe);
    app.state.currentSpe = selectedSpe;
    console.log(app.state.currentSpe);

    app.containerElement.innerHTML = '';
    app.init();
  }
};

document.addEventListener('DOMContentLoaded', app.init);
