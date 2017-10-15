var personalTraining = angular.module('personalTraining');

  personalTraining.controller('WorkoutResultCtrl', ['$state', '$scope', '$log', '$sce', '$ngConfirm', 'StorageSvc',
    function($state, $scope, $log, $sce, $ngConfirm, StorageSvc) {
      $scope.client = JSON.parse(StorageSvc.get('client', 'session'));
      $scope.options = [{
        name: 'Crear',
        selected: false
      }, {
        name: 'Tabla',
        selected: false
      }, {
        name: 'Gráfica',
        selected: false
      }]

      $scope.goToState = function(option, index) {
        console.log($scope.lastOption);
        if (typeof $scope.lastOption == 'number') {
          var lastOption = $scope.lastOption;
          $scope.options[lastOption].selected = false;
        }
        $scope.lastOption = index;
        $scope.options[index].selected = true;
        if (option.toUpperCase() == 'CREAR') {
          $state.go('workoutResult.create')
        } else if (option.toUpperCase() == 'TABLA') {
          $state.go('workoutResult.showTable');
        } else if (option.toUpperCase() == 'GRÁFICA') {
          $state.go('workoutResult.showGraphic');
        }
      }

      $scope.goToState('Crear', 0);

    }
  ]);
