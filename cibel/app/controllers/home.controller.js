module.exports = ['$scope', '$compile', function($scope, $compile) {
  $scope.openModal = function(header, templateType, templateId, maxTemplateId) {
    var htmlString = "<modal header=" + header + " template-type=" + templateType + " template-id=" + templateId + " max-template-id=" + maxTemplateId + "></modal>";
    var compiledeHTML = $compile(htmlString)($scope);
    $(".modal-window-container").append(compiledeHTML);
  }
  
  $scope.openAdviceModal = function(adviceId) {
    $scope.openModal('consejos', 'advice', adviceId, 7);
  }

  $scope.openInspirationModal = function(inspirationId) {
    $scope.openModal('inspiración', 'inspiration', inspirationId, 2);
  }
}];
