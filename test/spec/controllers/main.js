'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('pantallaCaDccApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      $element: document.createElement('div')
      // place here mocked dependencies
    });
  }));

  it('should refresh times be set', function () {
    expect(MainCtrl.checkNewVersionTime).toBe(60000);
    expect(MainCtrl.startColorChangeTime).toBe(7200000);
  });
});
