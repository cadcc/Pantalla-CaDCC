'use strict';
/*global updateListInterval */

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
      controller: ['$scope', '$interval', '$http', function ($scope, $interval, $http) {
        var pageSize = 5;

        var updateTime = function () {
          $scope.currentDate = moment();
        };

        updateTime();
        $interval(updateTime, 1000);

        var makeDateWithTime = function (date_, timeStr) {
          return moment(date_.format('YYYY-MM-DD') + 'T' + timeStr, 'YYYY-MM-DDTHH:mm:ss');
        };

        var compareDates = function (a, b) {
          return function (date) {
            return a.isSameOrBefore(date) && b.isAfter(date);
          };
        };

        var sortEvents = function (events) {
          // Order events by start date and code
          return events.sort(function (a, b) {
            if (a.fecha_ini === b.fecha_ini) {
              return (a.codigo < b.codigo) ? -1 : (a.codigo > b.codigo) ? 1 : 0;
            } else {
              return (a.fecha_ini < b.fecha_ini) ? -1 : 1;
            }
          });
        };

        var filterEvents = {
          type: 'date',
          func: function (now, events) {

            var startTime = makeDateWithTime(now, '08:00:00');
            var filters = null;

            for (var i = 0; i < 7; i++) {
              var dateRange = {
                startTime: angular.copy(startTime).add(2 * i, 'hours').subtract(30, 'minutes'),
                endTime: angular.copy(startTime).add(2 * (i + 1), 'hours').subtract(30, 'minutes'),
                filterStartTime: angular.copy(startTime).add(2 * i, 'hours'),
                filterEndTime: angular.copy(startTime).add(2 * (i + 1), 'hours')
              };

              if (compareDates(dateRange.startTime, dateRange.endTime)(now)) {
                filters = {
                  start: dateRange.filterStartTime,
                  end: dateRange.filterEndTime
                };
                break;
              }
            }

            if (filters === null) {
              return [];
            }

            var filteredEvents = events.filter(function (event) {
              return compareDates(filters.start, filters.end)(moment(event.fecha_ini));
            });

            return sortEvents(filteredEvents);
          }
        };

        var updateEventsSlice = updateListInterval($scope, 'currentEvents', 'allEvents', pageSize, [filterEvents]);

        var updateEvents = function () {
          var now = moment();
          var url = 'https://www.u-cursos.cl/api/0/ingenieria/2/horario_institucion/agenda_diaria.json?departamento=5&fecha=' + now.format('YYYY-MM-DD');

          $http.get(url)
            .then(function (response) {
              var jsonData = JSON.stringify(response.data);

              if ($scope.jsonData !== jsonData) {

                if ($scope.eventsUpdatePromise !== undefined) {
                  $interval.cancel($scope.eventsUpdatePromise);
                }

                $scope.lastUpdate = now;
                $scope.jsonData = jsonData;
                $scope.allEvents = response.data;

                updateEventsSlice();
                $scope.eventsUpdatePromise = $interval(updateEventsSlice, 7500);
              }
            }
          );
        };

        updateEvents();
        $interval(updateEvents, 60000);
      }]
    };
});