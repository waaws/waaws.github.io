module.exports = function() {
  var categories = {
    'interior': 'interiores',
    'exterior': 'exteriores',
    'maderas': 'maderas y metales',
    'fondos': 'fondos y acondicionadores',
    'industrial': 'productos especiales'
  }

  return function(category, scope) {
    return categories[category];
  }
}
