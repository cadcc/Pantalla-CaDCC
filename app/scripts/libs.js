'use strict';
/*exported setWindowDimensions, updateListInterval, randomString */

var isList = function (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

var setWindowDimensions = function (scope) {
  scope.windowWidth = window.innerWidth;
  scope.windowHeight = window.innerHeight;
};

var updateListInterval = function (scope, dstKey, srcKey, pageSize, filters) {

  var currentPage = -1;

  return function () {
    currentPage += 1;

    var elements = scope[srcKey] || [];
    if (isList(filters)) {
      for (var i in filters) {
        if (filters[i].type === 'date') {
          elements = filters[i].func(moment(), elements);
        }
      }
    }

    if (currentPage >= Math.ceil(elements.length / pageSize)) {
      currentPage = 0;
    }

    var startIndex = (currentPage) * pageSize;

    scope[dstKey] = elements.slice(startIndex, startIndex + pageSize);
  };
};
var randomString = function(length, chars){
  var result = '';
  for (var i = length; i > 0; --i){ 
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;

};