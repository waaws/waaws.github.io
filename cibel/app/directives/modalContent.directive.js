module.exports = function() {
  return {
    restrict: 'EA',
    link: function(scope, element, attrs) {
      scope.getContentUrl = function() {
        return './app/views/modal-templates/' + attrs.templateType + "-" + attrs.templateId + '.html';
      }
    },
    template: '<div ng-include="getContentUrl()"></div>'
  }
};
