module.exports = function() {
  return {
    restrict: 'EA',
    controller: 'modalController',
    replace: true,
    scope: {
      header: '@',
      templateType: '@',
      templateId: '@',
      maxTemplateId: '@'
    },
    templateUrl: './app/views/modal.html',
    link: function(scope, element, attributes) {
      if ($(".modal-wrapper").is(":hidden")) {
        $(".modal-wrapper").show();
      }
    }
  }
};
