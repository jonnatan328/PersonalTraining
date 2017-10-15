angular.module('personalTraining')
.factory('ClientSvc', ['$http', '$rootScope',
function ($http, $rootScope) {

  return {
    // Servicio para registrar un cliente.
    signup: function(credentials) {
      var signup = $http({
        url: '/client/signup',
        method: 'POST',
        data: credentials
      });
      return signup;
    },
    // Servicio para obtener los clientes.
    getAll: function () {
      var clients = $http({
        url: '/client/getAll',
        method: 'GET',
      });
      return clients;
    }

  };
}]);
