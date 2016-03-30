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
        var pageSize = 14;
        $scope.currentPage = -1;

        var updateProductsSlice = updateListInterval($scope, 'currentProducts', 'allProducts', pageSize);

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