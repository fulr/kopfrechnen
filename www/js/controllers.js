angular.module('starter.controllers', [])

.controller('RechnenCtrl', function ($scope, Rechnen, $timeout, Settings) {
  $scope.buttons = [];
  $scope.anzahlRichtig = 0;
  $scope.anzahlFalsch = 0;
  $scope.started = false;
  $scope.aufgabe = '';
  $scope.counter = [];

  var timer;

  var next = function () {
    $scope.richtig = $scope.falsch = false;

    if ($scope.anzahlRichtig + $scope.anzahlFalsch === $scope.anzahl) {
      $scope.started = false;
      return;
    }

    $scope.aufgabe = Rechnen.getAufgabe();

    $scope.counter = [];
    for (var i = 0; i < Settings.ZeitProAufgabe; i++)
      $scope.counter.push(i);

    timer = $timeout(function countdown() {
      $scope.counter.pop();
      if ($scope.counter.length > 0) {
        timer = $timeout(countdown, 1000);
      } else {
        $scope.anzahlFalsch++;
        next();
      }
    }, 1000);
  };


  $scope.start = function () {
    $scope.started = true;
    $scope.anzahl = Settings.AnzahlAufgaben;
    $scope.aufgabe = Rechnen.getAufgabe();
    $scope.anzahlRichtig = 0;
    $scope.anzahlFalsch = 0;
    $scope.richtig = false;
    $scope.falsch = false;
    $scope.buttons = [];

    var current = [];
    for (var i = 0; i <= Settings.Zahlenraum; i++) {
      current.push(i);
      if (i % 5 === 0) {
        $scope.buttons.push(current);
        current = [];
      }
    }
    $scope.buttons.push(current);

    next();
  };

  $scope.check = function (number) {
    $timeout.cancel(timer);
    $scope.aufgabe = $scope.aufgabe.split('_')
      .join(number);
    if (Rechnen.check(number)) {
      $scope.anzahlRichtig++;
      $scope.richtig = true;
    } else {
      $scope.anzahlFalsch++;
      $scope.falsch = true;
    }
    $timeout(next, 2000);
  };
})

.controller('SetupCtrl', function ($scope, Settings) {
  $scope.Settings = Settings;
});
