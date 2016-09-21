require('./styles/less/index.less');

var angular = require('angular');
var uibs = require('angular-ui-bootstrap');
require('ngstorage');
require('marked');
require('angular-marked');
require('angular-ui-router');

var productService = require('./app/services/product.service.js');

var categoryTitleFilter = require ('./app/filters/categoryTitle.filter.js');
var roundUpFilter = require ('./app/filters/roundUp.filter.js');

var globalController = require('./app/controllers/global.controller.js');
var homeController = require('./app/controllers/home.controller.js');
var headerController = require('./app/controllers/header.controller.js');
var companyController = require('./app/controllers/company.controller.js');
var literCalculatorController = require('./app/controllers/literCalculator.controller.js');
var modalController = require('./app/controllers/modal.controller.js');
var productIndexController = require('./app/controllers/productIndex.controller.js');
var productShowController = require('./app/controllers/productShow.controller.js');

var modalDirective = require('./app/directives/modal.directive.js');
var modalContentDirective = require('./app/directives/modalContent.directive.js');

var cibelApp = angular.module('cibelApp', [uibs, 'ui.router', 'ngStorage', 'hc.marked','ngWapi']);

cibelApp.service('productService', productService);

cibelApp.filter('categoryTitle', categoryTitleFilter);
cibelApp.filter('roundUp', roundUpFilter);

cibelApp.controller('globalController', globalController);
cibelApp.controller('homeController', homeController);
cibelApp.controller('headerController', headerController);
cibelApp.controller('companyController', companyController);
cibelApp.controller('literCalculatorController', literCalculatorController);
cibelApp.controller('modalController', modalController);
cibelApp.controller('productIndexController', productIndexController);
cibelApp.controller('productShowController', productShowController);

cibelApp.directive('modal', modalDirective);
cibelApp.directive('modalContent', modalContentDirective);

cibelApp.config(['$stateProvider', '$urlRouterProvider', "$locationProvider",
  function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise("/");

  var showSectionsAndScrollTo = function(section) {
    var sections = ['#home', '#products', '#advice', '#inspiration', '#company'];
    $(sections.join(',')).show();
    setTimeout(function() {
      $('html, body').animate({
        scrollTop: $("#" + section).offset().top
      }, 600);
    }, 500);
  }

  $stateProvider
    .state('index', {
      url: ""
    })
    .state('index.products', {
      url: "/categorias",
      templateUrl: 'index.html',
      onEnter: function() {
        showSectionsAndScrollTo("products")
      }
    })
    .state('index.advice', {
      url: "/consejos",
      templateUrl: 'index.html',
      onEnter: function() {
        showSectionsAndScrollTo("advice")
      }
    })
    .state('index.inspiration', {
      url: "/inspiracion",
      templateUrl: 'index.html',
      onEnter: function() {
        showSectionsAndScrollTo("inspiration")
      }
    })
    .state('index.company', {
      url: "/empresa",
      templateUrl: 'index.html',
      onEnter: function() {
        showSectionsAndScrollTo("company")
      }
    })
    .state('index.contact', {
      url: "/contacto",
      templateUrl: 'index.html',
      onEnter: function() {
        showSectionsAndScrollTo("contact")
      }
    })
    .state('products', {
      url: "/productos/:category",
      templateUrl: "app/views/product-index.html",
      controller: 'productIndexController'
    })
    .state('product', {
      url: "/productos/:category/:productId",
      templateUrl: "app/views/product-show.html",
      controller: 'productShowController'
    })
    .state('literCalculator', {
      url: "/calcular",
      templateUrl: "app/views/liter-calculator.html",
      controller: 'literCalculatorController'
    })
    .state('history', {
      url: "/historia",
      templateUrl: "app/views/history.html",
      controller: 'companyController'
    })
    .state('social', {
      url: "/social",
      templateUrl: "app/views/social.html",
      controller: 'companyController'
    });
}]);

window.cibelApp = cibelApp;
