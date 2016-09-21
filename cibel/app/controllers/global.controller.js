module.exports = ['$scope', function($scope) {
  $scope.sections = ['#home', '#products', '#advice', '#inspiration', '#company'];

  $scope.closeModal = function() {
    $(".modal-wrapper").hide();
    $(".modal-window-container").empty();
  }

  $scope.hideSectionsAndScroll = function(sectionsToHide) {
    $scope.hideSections(sectionsToHide);
    $scope.scrollToTop();
  }

  $scope.hideSections = function(sectionsToHide) {
    if (sectionsToHide) {
      var sectionsToShow = _.difference($scope.sections, sectionsToHide);
      $(sectionsToHide.join(',')).hide();
      $(sectionsToShow.join(',')).show();
    } else {
      $($scope.sections.join(',')).show();
    }
  }

  $scope.scrollToTop = function() {
    $("html, body").animate({ scrollTop: 0 }, 600);
  }

  $scope.categories = [
    { 'id': 'interior', 'name': 'Interiores' },
    { 'id': 'exterior', 'name': 'Exteriores' },
    { 'id': 'maderas', 'name': 'Maderas y Metales' },
    { 'id': 'fondos', 'name': 'Fondos y Acondicionadores' },
    { 'id': 'industrial', 'name': 'Productos Especiales' }
  ];
}];
