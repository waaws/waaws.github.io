module.exports = ['$localStorage', '$q', function($localStorage, $q) {
  var _ = require('lodash');

  var contentful = require('contentful');
  var spaceId = 'vuecvgfj013c';
  var accessToken = '6925775d5d11fb75a5c44f59704f065e1a27e32920f10ee3ed154ebfcd031f15';
  var cacheExpirationMilis = 15 * (60 * 1000);

  var productContentType = 'product';

  var client = contentful.createClient({
    space: spaceId,
    accessToken: accessToken
  });

  function requestProducts() {
    return client.getEntries({'content_type': productContentType, 'order': 'fields.id' })
    .then(function(entries) {
      return entries.items;
    });
  }

  function productsCached() {
    if ($localStorage.cachedAt) {
      var diff = Math.abs(new Date().getTime() - $localStorage.cachedAt);
      return cacheExpirationMilis > diff;
    } else {
      $localStorage.cachedAt = undefined;
      return false;
    }
  }

  var factory = {};

  factory.getProducts = function() {
    if (productsCached()) {
      var defer = $q.defer();
      defer.resolve($localStorage.products);
      return defer.promise;
    } else {
      return requestProducts().then(function(products) {
        $localStorage.products = products;
        $localStorage.cachedAt = new Date().getTime();
        return products;
      });
    }
  };

  factory.getProduct = function(id) {
    return factory.getProducts()
    .then(function(products) {
      var product = _.find(products, function(p) { return p.fields.id == id });
      return product;
    });
  };

  return factory;
}];
