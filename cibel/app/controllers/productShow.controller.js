module.exports = ['$rootScope', '$scope', 'productService', 'categoryTitleFilter', '$stateParams',
  function($rootScope, $scope, productService, categoryTitleFilter, $stateParams) {
    $scope.hideSectionsAndScroll($scope.sections);

    $scope.category = $stateParams.category;
    $scope.productId = $stateParams.productId;
    $scope.productLoaded = false;

    productService.getProduct($scope.productId)
    .then(function(product) {
      $scope.product = product.fields;
      $scope.productLoaded = true;
      if (!$rootScope.$$phase) {
        $scope.$digest();
      }
    });

    $scope.formatList = function(list) {
      if (list) {
        return list.join(', ');
      }
    }

    $scope.showButtons = function() {
      return $scope.category != 'industrial';
    }

    $scope.showPhotosSection = function() {
      return $scope.productLoaded && $scope.product.fotos;
    }
  }
];
