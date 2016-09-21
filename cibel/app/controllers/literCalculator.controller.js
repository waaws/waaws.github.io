module.exports = ['$rootScope', '$scope', 'productService',
  function($rootScope, $scope, productService) {
    var _ = require('lodash');

    $scope.hideSectionsAndScroll(['#home', '#products', '#inspiration', '#company']);

    $scope.surface;
    $scope.product;
    $scope.parameterType;
    $scope.squareMeter;
    $scope.width;
    $scope.large;
    $scope.result = 45;

    $scope.productsLoaded = false;
    $scope.products = [];

    productService.getProducts()
    .then(function(entries) {
      $scope.products = entries;
      $scope.productsLoaded = true;
      if (!$rootScope.$$phase) {
        $scope.$digest();
      }
    });

    $scope.surfaces = [
      { id: 'pared', name: 'Paredes' },
      { id: 'metal', name: 'Metales' },
      { id: 'madera', name: 'Maderas' },
      { id: 'cielorraso', name: 'Cielorrasos' },
      { id: 'techo', name: 'Techos' }
    ];

    $scope.paintTypes = {
      latex: { coats: 2, meassureUnit: 'litros', literCalculatorFunction: function(squareMeters) { return squareMeters/6 } },
      sintetico: { coats: 2, meassureUnit: 'litros', literCalculatorFunction: function(squareMeters) { return squareMeters/7 } },
      barniz: { coats: 3, meassureUnit: 'litros', literCalculatorFunction: function(squareMeters) { return squareMeters/5 } },
      membrana: { coats: 3, meassureUnit: 'kilos', literCalculatorFunction: function(squareMeters) { return squareMeters } }
    }

    $scope.filterProduct = function(product) {
      return $scope.surface && product.fields.superficie && product.fields.superficie.includes($scope.surface.id);
    }

    $scope.disableCalculateButton = function() {
      var surfaceSelected = !!$scope.surface;
      var productSelected = !!$scope.product;
      var parameterTypeSelected = !!$scope.parameterType;
      var parameterInputValues = $scope.parameterType == 'squareMeter' && $scope.squareMeter
        || $scope.parameterType == 'manual' && $scope.width && $scope.large;

      var enableButton = surfaceSelected && productSelected && parameterTypeSelected && parameterInputValues;

      return !enableButton;
    }

    $scope.calculate = function() {
      var type = $scope.paintTypes[$scope.product.fields.tipo];
      var squareMeters = calculateSquareMeters();
      $scope.result = type.literCalculatorFunction(squareMeters);

      $scope.scrollToTop();
      $('.liter-calculator-form').hide();
      $('.liter-calculator-result').show();
    }

    $scope.back = function() {
      $scope.scrollToTop();
      $('.liter-calculator-form').show();
      $('.liter-calculator-result').hide();
    }

    function calculateSquareMeters() {
      if ($scope.parameterType  == 'squareMeter') {
        return parseInt($scope.squareMeter);
      } else {
        return parseInt($scope.width) * parseInt($scope.large);
      }
    }
  }
];
