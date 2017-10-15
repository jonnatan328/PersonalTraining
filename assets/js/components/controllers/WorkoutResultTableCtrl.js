var personalTraining = angular.module('personalTraining');

personalTraining.controller('WorkoutResultTableCtrl', ['$state', '$scope', '$log', '$sce', '$ngConfirm', 'ClientSvc', 'orderByFilter', 'StorageSvc', 'WorkoutResultSvc',
  function($state, $scope, $log, $sce, $ngConfirm, ClientSvc, orderBy, StorageSvc, WorkoutResultSvc) {
    $scope.client = JSON.parse(StorageSvc.get('client', 'session'));

    WorkoutResultSvc.getByClient({
        clientId: $scope.client.id
      })
      .then((res) => {
        $scope.workoutResults = res.data;
        console.log($scope.workoutResults);
      })
      .catch((err) => {
        console.log(err);
      })

  }
]);
