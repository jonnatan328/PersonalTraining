angular.module('personalTraining')
.factory('WorkoutResultSvc', ['$http', '$rootScope',
function ($http, $rootScope) {

  return {
    // Servicio para crear un entrenamiento.
    create: function(credentials) {
      var workoutResult = $http({
        url: '/workoutResult/create',
        method: 'POST',
        data: credentials
      });
      return workoutResult;
    },
    // Servicio para obtener los entrenamientos por cliente.
    getByClient: function (params) {
      var workoutResult = $http({
        url: '/workoutResult/getByClient',
        method: 'GET',
        params: params
      });
      return workoutResult;
    }

  };
}]);
