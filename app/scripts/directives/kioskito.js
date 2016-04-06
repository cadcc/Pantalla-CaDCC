'use strict';
/*global updateListInterval */

/**
 * @ngdoc function
 * @name pantallaCaDccApp.directive:Kioskito
 * @description
 * # Kioskito
 * Directive of the pantallaCaDccApp
 */
angular.module('pantallaCaDccApp')
  .directive('kioskito', function () {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'views/directives/kioskito.html',
      controller: ['$scope', '$interval', '$http', function ($scope, $interval, $http) {

        var spreadsheetId = '1xzf6jE0dUD4Nz-NiGvOLyEOefqxMy1cs2jn6ayyV21E';
        var pageSize = 14;

        var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetId + '/1/public/values?alt=json';
        $scope.currentPage = -1;

        var updateProductsSlice = updateListInterval($scope, 'currentProducts', 'allProducts', pageSize);

        var updateProducts = function () {
          $http.get(url)
              .then(function (response) {
                var jsonData = JSON.stringify(response.data);

                if ($scope.jsonData !== jsonData) {

                  if ($scope.eventsUpdatePromise !== undefined) {
                    $interval.cancel($scope.eventsUpdatePromise);
                  }

                  $scope.jsonData = jsonData;
                  var newProducts = [];

                  angular.forEach(response.data.feed.entry, function (product) {
                    newProducts.push({
                      'name': product.gsx$nombre.$t,
                      'price': product.gsx$precio.$t
                    });
                  });

                  $scope.allProducts = newProducts;

                  updateProductsSlice();
                  $scope.eventsUpdatePromise = $interval(updateProductsSlice, 7500);
                }
              }
            );
        };

        updateProducts();
        $interval(updateProducts, 60000);
      }]
    };
  });
