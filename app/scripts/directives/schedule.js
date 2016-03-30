'use strict';

/**
 * @ngdoc function
 * @name pantallaCaDccApp.directive:schedule
 * @description
 * # Schedule
 * Directive of the pantallaCaDccApp
 */
angular.module('pantallaCaDccApp')
  .directive('schedule', function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'views/directives/schedule.html',
      controller: ['$scope', '$interval', function ($scope, $interval) {
        var pageSize = 5;

        var intervals = {
          '07:30 - 09:30': '08:00 - 10:00',
          '09:30 - 11:30': '10:00 - 12:00',
          '11:30 - 13:30': '12:00 - 14:00',
          '13:30 - 15:30': '14:00 - 16:00',
          '15:30 - 17:30': '16:00 - 18:00',
          '17:30 - 19:30': '18:00 - 20:00',
          '19:30 - 21:30': '20:00 - 21:00'
        };

        $scope.allEvents = [
          // {"codigo": "CC5208-1", "nombre": "Visualización de Información", "profesores": ["Benjamin Bustos"], "tipo": "Cátedra", "horario": "08:30 - 10:00", "salas": ["B111"]},
          // {"codigo": "CC1000-9", "nombre": "Herramientas Computacionales para Ingeniería y Ciencias", "profesores": ["Jocelyn Simmonds", "Patricio Poblete"], "tipo": "Cátedra", "horario": "10:15 - 11:45", "salas": ["GALILEO"]},
          // {"codigo": "CC4101-1", "nombre": "Lenguajes de Programación", "profesores": ["Éric Tanter"] , "tipo": "Cátedra", "horario": "10:15 - 11:45", "salas": ["203"]},
          // {"codigo": "CC3201-1", "nombre": "Bases de Datos", "profesores": ["Claudio Gutiérrez"], "tipo": "Cátedra", "horario": "10:15 - 11:45", "salas": ["B111"]},
          // {"codigo": "CC4102-1", "nombre": "Diseño y Análisis de Algoritmos", "profesores": ["Pablo Barcelo B."], "tipo": "Cátedra", "horario": "10:15 - 11:45", "salas": ["B211"]},
          // {"codigo": "CC5301-1", "nombre": "Introducción a la Criptografía Moderna", "profesores": ["Alejandro Hevia"], "tipo": "Cátedra", "horario": "10:15 - 11:45", "salas": ["N01"]},
          // {"codigo": "CC5502-1", "nombre": "Geometría Computacional", "profesores": ["Nancy Hitschfeld K."], "tipo": "Cátedra", "horario": "10:15 - 11:45", "salas": ["Sala Laboratorio Docencia del DCC, Piso 3"]},
          // {"codigo": "CC5611-1", "nombre": "Ética para Ingenieros en Computación", "profesores": ["Javier Bustos Jiménez"], "tipo": "Cátedra", "horario": "10:15 - 11:45", "salas": ["B103"]},
          // {"codigo": "CC1000-12", "nombre": "Herramientas Computacionales para Ingeniería y Ciencias", "profesores": ["Juan Álvarez R.", "Patricio Poblete"], "tipo": "Cátedra", "horario": "08:30 - 10:00", "salas": ["GALILEO"]},
          // {"codigo": "CC1000-8", "nombre": "Herramientas Computacionales para Ingeniería y Ciencias", "profesores": ["Jocelyn Simmonds", "Patricio Poblete"], "tipo": "Cátedra", "horario": "14:30 - 16:00", "salas": ["GALILEO"]},
          // {"codigo": "CC1000-16", "nombre": "Herramientas Computacionales para Ingeniería y Ciencias", "profesores": ["Patricio Inostroza F.", "Patricio Poblete"], "tipo": "Cátedra", "horario": "16:15 - 17:45", "salas": ["GALILEO"]},
          // {"codigo": "CC3101-1", "nombre": "Matemáticas Discretas para la Computación", "profesores": ["Pablo Barcelo B."], "tipo": "Auxiliar", "horario": "16:15 - 17:45", "salas": ["B112", "S15"]},
          // {"codigo": "CC3102-1", "nombre": "Teoría de la Computación", "profesores": ["Jorge Perez"], "tipo": "Auxiliar", "horario": "16:15 - 17:45", "salas": ["B103"]},
          // {"codigo": "CC4302-1", "nombre": "Sistemas Operativos", "profesores": ["Luis Mateu B."], "tipo": "Auxiliar", "horario": "16:15 - 17:45", "salas": ["F11"]},
          // {"codigo": "CC4401-1", "nombre": "Ingeniería de Software", "profesores": ["Romain Robbes"], "tipo": "Auxiliar", "horario": "16:15 - 17:45", "salas": ["Sala Laboratorio Docencia del DCC, Piso 3"]},
          // {"codigo": "CC5212-1", "nombre": "Procesamiento Masivo de Datos", "profesores": ["Aidan Hogan"], "tipo": "Cátedra", "horario": "14:30 - 16:00", "salas": ["Sala Laboratorio Docencia del DCC, Piso 3"]},
          // {"codigo": "CC5303-1", "nombre": "Sistemas Distribuidos", "profesores": ["Javier Bustos Jiménez"], "tipo": "Auxiliar", "horario": "14:30 - 16:00"},
          // {"codigo": "CC5312-1", "nombre": "Seguridad de Datos", "profesores": ["Alejandro Hevia"], "tipo": "Cátedra", "horario": "16:15 - 17:45", "salas": ["B203"]},
          // {"codigo": "CC5320-1", "nombre": "Programación Consciente de la Arquitectura", "profesores": ["Óscar Peredo A."], "tipo": "Cátedra", "horario": "18:00 - 19:30"},
          // {"codigo": "CC5404-1", "nombre": "Taller de UML", "profesores": ["Andrés Muñoz Ordenes"], "tipo": "Cátedra", "horario": "18:00 - 19:30", "salas": ["B103"]},
          // {"codigo": "CC5504-1", "nombre": "Interface Humano Computador", "profesores": ["Jaime Sanchez I."], "tipo": "Cátedra", "horario": "14:30 - 16:00"},
          // {"codigo": "CC6201-1", "nombre": "Investigación en Ciencias de la Computación.(Métodos, Técnicas y P", "profesores": ["Claudio Gutiérrez"], "tipo": "Cátedra", "horario": "16:15 - 17:45", "salas": ["B110"]}
        ];

        var updateTime = function () {
          $scope.currentDate = moment();
        };

        updateTime();
        $interval(updateTime, 1000);

        var updateEventsSlice = updateListInterval($scope, 'currentEvents', 'allEvents', pageSize);

        updateEventsSlice();
        $interval(updateEventsSlice, 10000);
      }]
    };
});