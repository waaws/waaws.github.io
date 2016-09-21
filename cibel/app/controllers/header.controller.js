module.exports = ['$scope', '$compile', function($scope, $compile) {
  $scope.openModal = function(header, templateType, templateId, maxTemplateId) {
    var htmlString = "<modal header=" + header + " template-type=" + templateType + " template-id=" + templateId + " max-template-id=" + maxTemplateId + "></modal>";
    var compiledeHTML = $compile(htmlString)($scope);
    $(".modal-window-container").append(compiledeHTML);
  }
  $scope.modalContact = function(contactId) {
    $scope.openModal('contacto', "contacto", 1);
  }
}];
