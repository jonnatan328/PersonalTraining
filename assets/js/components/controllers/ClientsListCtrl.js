(function() {
  var personalTraining = angular.module('personalTraining');

  personalTraining.controller('ClientsListCtrl', ['$state', '$scope', '$log', '$sce', '$ngConfirm', 'ClientSvc', 'orderByFilter', 'StorageSvc',
    function($state, $scope, $log, $sce, $ngConfirm, ClientSvc, orderBy, StorageSvc) {

      $scope.clients = [];

      ClientSvc.getAll()
      .then((res) => {
        $scope.clients = res.data;
        console.log($scope.clients);
      })
      .catch((err) => {
        $ngConfirm("Error al obtener los clientes")
      })

      $scope.goToWorkoutResult = function (client) {
        var clientToSend = JSON.stringify(client);
        StorageSvc.set('client', clientToSend, 'session');
        $state.go('workoutResult')
      }

    }
  ]);
})();
