'use strict';

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
        var pageSize = 13;
        $scope.currentPage = -1;

        var updateProductsSlice = function () {
          $scope.currentPage += 1;

          if ($scope.currentPage >= parseInt($scope.allProducts.length / pageSize) + 1) {
            $scope.currentPage = 0;
          }
          var startIndex = ($scope.currentPage) * pageSize;

          $scope.currentProducts = $scope.allProducts.slice(startIndex, startIndex + pageSize);
        };

        $http.get('data/kioskito.json')
          .then(function (response) {
            $scope.allProducts = response.data;
            updateProductsSlice();
            $interval(updateProductsSlice, 10000);
          }
        );
      }]
    };
});