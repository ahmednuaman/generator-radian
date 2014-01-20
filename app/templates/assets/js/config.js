define([], function() {
  return {
    ngApp: '<%= _.camelize(appName) %>',
    <% if (includeExample) { %>api: {
      data: '/data/menu.json'
    },
    <% } %>path: {
      partial: '/assets/partial/'
    }
  };
});