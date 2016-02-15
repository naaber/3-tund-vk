(function(){
  "use strict";

  var Moosipurk = function(){

    // SEE ON SINGLETON PATTERN
    if(Moosipurk.instance){
      return Moosipurk.instance;
    }

    //this viitab Moosipurk funktsioonile
    Moosipurk.instance = this;

    this.routes = Moosipurk.routes;
    //this.routes['home-view'].render();

    console.log('moosipurgi sees');

    // Kõik muutujad, mida muudetakse ja on rakendusega seotud, defineeritakse siin
    this.click_count = 0;
    this.currentRoute = null;
    console.log(this);

    // Kui tahan moosipurgile referenci, siis kasutan THIS = Moosipurgi rakendus ise
    this.init();
  };

  // paneme muutuja külge
  window.Moosipurk = Moosipurk;

  Moosipurk.routes = {
    'home-view': {
      'render': function(){
        // Käivitame siis, kui lehte laeme
        console.log('>>>avaleht');
      }
    },
    'list-view': {
      'render': function(){
        // Käivitame siis, kui lehte laeme
        console.log('>>>loendus');
      }
    },
    'manage-view': {
      'render': function(){
        // Käivitame siis, kui lehte laeme
        console.log('>>>haldus');
      }
    }
  };

  //Kõik funktsioonid lähevad moosipurgi külge
  Moosipurk.prototype = {

    init: function(){
      console.log('rakendus läks tööle');

      //kuulan aadressirea vahetust
      window.addEventListener('hashchange', this.routeChange.bind(this));

      //esimesel käivitamisel vaatame urli üle ja uuendame menüüd
      this.routeChange();
      
      // esimene loogika oleks see, et kuulame hiireklikki nupul
      this.bindMouseEvents();
    },
    bindMouseEvents: function(){
      document.querySelector('.add-new-jar').addEventListener('click', this.addNewClick.bind(this));
    },
    addNewClick: function(event){
      console.log(event);
      this.click_count++;
      console.log(this.click_count);
    },
    routeChange: function(event){
      console.log(location.hash);

      //kirjutan muutujasse lehe nime, võtan maha #
      this.currentRoute = location.hash.slice(1);

      //muudan menüü lingi aktiivseks
      this.updateMenu();

    },

    updateMenu: function(){
      //1. võtan maha aktiivse menüü lingi, kui on
      document.querySelector('.active-menu').className = document.querySelector('.active-menu').className.replace('active-menu', '');

      //2. lisan uuele juurde
      document.querySelector('.' + this.currentRoute).className += ' active-menu';
    }
  };

  // Kui leht on laetud, siis käivitan moosipurgi rakenduse
  window.onload = function(){
    var app = new Moosipurk();
  };


})();
