module.exports = ['$scope', '$compile', function($scope, $compile) {
  $scope.maxTemplateId;
  $scope.templateType;
  $scope.templateId;
  $scope.title;

  $scope.disablePrevious = function() {
    return 1 == parseInt($scope.templateId);
  }

  $scope.disableNext = function() {
    return parseInt($scope.maxTemplateId) == parseInt($scope.templateId); 
  }

  $scope.showPreviousTemplate = function() {
    if (parseInt($scope.templateId) > 1) {
      $scope.templateId = parseInt($scope.templateId) - 1;
      $scope.showModalTemplate();
    }
  }

  $scope.showNextTemplate = function() {
    if (parseInt($scope.maxTemplateId) > parseInt($scope.templateId)) {
      $scope.templateId = parseInt($scope.templateId) + 1;
      $scope.showModalTemplate();
    }
  }

  $scope.showModalTemplate = function() {
    var htmlString = "<modal-content class='modal-template' template-type=" + $scope.templateType + " template-id=" + $scope.templateId + "></modal-content>";
    var compiledeHTML = $compile(htmlString)($scope);
    $(".modal-template-wrapper").empty();
    $(".modal-template-wrapper").append(compiledeHTML);
  }
}];
