angular.module('starter.services', [])

.factory('Rechnen', function(Settings) {
  var result;

  return {
    getAufgabe: function() {
      var type = Math.floor(Math.random() * 6);

      var c = Math.floor(Math.random() * (+Settings.Zahlenraum + 1));
      var b = Math.floor(Math.random() * (c + 1));
      var a = c - b;

      switch (type) {
        case 0:
          result = c;
          return a + " + " + b + " = _";
        case 1:
          result = b;
          return a + " +  _  = " + c;
        case 2:
          result = a;
          return "_ + " + b + " = " + c;
        case 3:
          result = b;
          return c + " - _ = " + a;
        case 4:
          result = c;
          return "_ - " + b + " = " + a;
        case 5:
          result = a;
          return c + " - " + b + " = _";
      }
    },
    check: function(number) {
      return number == result;
    }
  };
})

.factory('Settings', function() {
  var settings = {
    AnzahlAufgaben: 10,
    ZeitProAufgabe: 5,
    Zahlenraum: 10,
  };
  return settings;
});
