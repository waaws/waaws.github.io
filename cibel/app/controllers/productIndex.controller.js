module.exports = ['$rootScope', '$scope', 'productService', 'categoryTitleFilter', '$stateParams',
  function($rootScope, $scope, productService, categoryTitleFilter, $stateParams) {
    $scope.hideSectionsAndScroll($scope.sections);

    $scope.category = $stateParams.category;
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

    $scope.filterProduct = function(product) {
      return product.fields.linea == $scope.category;
    }
  }
];
