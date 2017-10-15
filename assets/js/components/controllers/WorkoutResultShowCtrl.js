var personalTraining = angular.module('personalTraining');

personalTraining.controller('WorkoutResultShowCtrl', ['$state', '$scope', '$log', '$sce', '$ngConfirm', 'ClientSvc', 'orderByFilter', 'StorageSvc', 'WorkoutResultSvc',
  function($state, $scope, $log, $sce, $ngConfirm, ClientSvc, orderBy, StorageSvc, WorkoutResultSvc) {
    $scope.client = JSON.parse(StorageSvc.get('client', 'session'));

    $scope.options = {
      chart: {
        type: 'lineChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 60,
          left: 65
        },
        x: function(d) {
          return d.x;
        },
        y: function(d) {
          return d.y;
        },
        color: d3.scale.category10().range(),
        duration: 500,
        useInteractiveGuideline: true,
        clipVoronoi: false,
        xAxis: {
          axisLabel: 'Sesiones',
          tickFormat: function(d) {
            // console.log(d);
            return d3.time.format('%d/%m/%y')(new Date(d))
          },
          showMaxMin: false,
          staggerLabels: true
        },
        yAxis: {
          axisLabel: 'Valor',
          tickFormat: function(d) {
            return d3.format('.0f')(d);
          },
          axisLabelDistance: -10
        },
      },
      title: {
        enable: true,
        text: 'Desarrollo del cliente'
      },
      subtitle: {
        enable: true,
        text: 'Datos recopilados en las sesiones de entrenamiento a cada cliente.',
        css: {
          'text-align': 'center',
          'margin': '10px 13px 0px 7px'
        }
      }
    };

    $scope.data = [{
        key: "Frecuencia",
        values: [],
        // mean: 150
      },
      {
        key: "Potencia",
        values: [],
        // mean: -60
      },
      {
        key: "Distancia",
        values: [],
        // mean: 125,
      },
      {
        key: "Velocidad",
        values: [],
        // mean: -50
      },
      {
        key: "Cadencia",
        values: [],
        // mean: 100
      },
      {
        key: "Trabajo",
        values: [],
        // mean: 130
      },
      {
        key: "Duración",
        values: [],
        // mean: -10
      }
    ];

    WorkoutResultSvc.getByClient({
        clientId: $scope.client.id
      })
      .then((res) => {
        var workoutResults = res.data;
        // console.log(workoutResults);
        workoutResults.forEach((workoutResult, index, workoutResultsList) => {
          var dateDB = workoutResult.date.split('T')[0];
          var arrayDate = dateDB.split('-');
          var date = new Date(arrayDate[0], arrayDate[1], arrayDate[2]);
          var dateMilliseconds = date.getTime();
          // console.log(workoutResult.date);
          // console.log(date);
          $scope.data[0].values.push({
            x: dateMilliseconds,
            y: workoutResult.averageHeartRate
          });
          $scope.data[1].values.push({
            x: dateMilliseconds,
            y: workoutResult.averagePower
          });
          $scope.data[2].values.push({
            x: dateMilliseconds,
            y: workoutResult.distance
          });
          $scope.data[3].values.push({
            x: dateMilliseconds,
            y: workoutResult.averageSpeed
          });
          $scope.data[4].values.push({
            x: dateMilliseconds,
            y: workoutResult.averageCadence
          });
          $scope.data[5].values.push({
            x: dateMilliseconds,
            y: workoutResult.work
          });
          $scope.data[6].values.push({
            x: dateMilliseconds,
            y: workoutResult.duration
          })
        })
        // console.log($scope.data);
      })
      .catch((err) => {
        console.log(err);
      })

  }
]);
