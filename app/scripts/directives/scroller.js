'use strict';
 /*jshint unused:false*/
 
/*global randomString */
/**
 * @ngdoc function
 * @name pantallaCaDccApp.directive:Scroller
 * @description
 * # Scroller
 * Directive of the pantallaCaDccApp
 */
angular.module('pantallaCaDccApp')
  .directive('scroller', function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'views/directives/scroller.html',
      controller: ['$scope', '$interval', '$http', function ($scope, $interval, $http) {

        var spreadsheetId = '1gWuiF0PrEzWPntdiyuVgcGTZxx6ABnJEXnwNztejZsg';
        var urlBirthdays = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetId + '/3/public/values?alt=json';
        var urlEfemerides = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetId + '/4/public/values?alt=json';
        $scope.pages = { '0': 'Cumpleaños',
                         '1': 'Efemérides',
                         '2': 'Facebook',
                         '3': 'Twitter',
                         '4': 'Noticias'};
        $scope.currentDate = new Date();

        $scope.currentScroller = -1;

        var nextScroller = function () {
          $scope.currentScroller = ($scope.currentScroller + 1) % Object.keys($scope.pages).length;
        };
        var updateBirthdays = function (){
          $http.get(urlBirthdays)
              .then(function (response) {
                var jsonData = JSON.stringify(response.data);

                if ($scope.jsonData !== jsonData) {

                  if ($scope.eventsUpdatePromise !== undefined) {
                    $interval.cancel($scope.eventsUpdatePromise);
                  }
                  
                  $scope.jsonData = jsonData;
                  
                  var months = ['enero',
                                'febrero',
                                'marzo',
                                'abril',
                                'mayo',
                                'junio',
                                'julio',
                                'agosto',
                                'septiembre',
                                'octubre',
                                'noviembre',
                                'diciembre'];
                  
                  $scope.birthday = response.data.feed.entry[$scope.currentDate.getDate()-1]['gsx$'+months[$scope.currentDate.getMonth()]].$t,
                  /* jshint expr: true */
                  nextScroller();
                  $scope.eventsUpdatePromise = $interval(nextScroller, 5000);
                }
              }
            );
        };
        var updateEfemerides = function (){
          $http.get(urlEfemerides)
              .then(function (response) {
                var jsonData = JSON.stringify(response.data);

                if ($scope.jsonData !== jsonData) {

                  if ($scope.eventsUpdatePromise !== undefined) {
                    $interval.cancel($scope.eventsUpdatePromise);
                  }
                  
                  $scope.jsonData = jsonData;
                  
                  var months = ['enero',
                                'febrero',
                                'marzo',
                                'abril',
                                'mayo',
                                'junio',
                                'julio',
                                'agosto',
                                'septiembre',
                                'octubre',
                                'noviembre',
                                'diciembre'];
                  
                  $scope.efemeride = response.data.feed.entry[$scope.currentDate.getDate()-1]['gsx$'+months[$scope.currentDate.getMonth()]].$t,
                  /* jshint expr: true */
                  $scope.eventsUpdatePromise = $interval(nextScroller, 5000);
                }
              }
            );
        };
        var updateTwitterFeed = function() {
        /*
          OAuth.initialize('95811704-xGThPv5igWDOcaI1VSY1l2uxyzUrti2p5IpWFvwbU');
          $http.get('https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=cadcc&count=10', { headers: {
            'Authorization': 'OAuth oauth_consumer_key="3NLXQqQNGUlmm7Eo4wU5w", \
                              oauth_nonce="'+randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')+'", \
                              oauth_signature_method="HMAC-SHA1", \
                              oauth_timestamp="'+moment()+'", \
                              oauth_token="95811704-xGThPv5igWDOcaI1VSY1l2uxyzUrti2p5IpWFvwbU", \
                              oauth_version="1.0"',
            'Options': 'Access-Control-Allow-Origin="http://oauth.io"'
          }})
          .then(function (response) {
                var jsonData = JSON.stringify(response.data);

                if ($scope.jsonData !== jsonData) {

                  if ($scope.eventsUpdatePromise !== undefined) {
                    $interval.cancel($scope.eventsUpdatePromise);
                  }
                  $scope.jsonData = jsonData;
                  $scope.twitter_feed = response.data;
                  $scope.eventsUpdatePromise = $interval(nextScroller, 5000);
                }
              }
            );*/
        };
        var updateFacebookFeed = function() {

        };

        updateBirthdays();
        $interval(updateBirthdays, 600000);
        updateEfemerides();
        $interval(updateEfemerides, 600000);
        updateFacebookFeed();
        $interval(updateFacebookFeed, 600000);
        updateTwitterFeed();
        $interval(updateTwitterFeed, 600000);
      }]
    };
  });

