var personalTraining = angular.module('personalTraining');

  personalTraining.controller('WorkoutResultCreateCtrl', ['$state', '$scope', '$log', '$sce', '$ngConfirm', 'ClientSvc', 'orderByFilter', 'StorageSvc', 'WorkoutResultSvc',
    function($state, $scope, $log, $sce, $ngConfirm, ClientSvc, orderBy, StorageSvc, WorkoutResultSvc) {

      $(document).ready(function() {
        $('select').material_select();
      });

      $scope.forms = {};
      $scope.workout = {};
      $scope.client = JSON.parse(StorageSvc.get('client', 'session'));

      var currentTime = new Date();
      $scope.currentTime = currentTime;
      $scope.month = ['Januar', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
      // $scope.disable = [false, 1, 7];
      $scope.today = 'Today';
      $scope.clear = 'Clear';
      $scope.close = 'Close';
      var days = 15;

      $scope.workout.date = currentTime;

      $scope.nameOptions = {
        choices: ['Elegir nombre', 'FTP', 'Otro'],
        selected: 'Elegir nombre'
      }

      $scope.showInputName = false;
      $scope.verifyName = function () {
        $scope.nameOptions.selected == 'Otro' ? $scope.showInputName = true : $scope.showInputName = false;
      }

      $scope.registerWorkoutResult = function () {
        var workoutName = null;
        var date = null;
        var duration = null;
        var distance = null;
        var work = null;
        var averagePower = null;
        var averageCadence = null;
        var averageSpeed = null;
        var averageHeartRate = null;

        workoutName = $scope.nameOptions.selected;
        date = $scope.workout.date;
        duration = $scope.workout.duration;
        distance = $scope.workout.distance;
        work = $scope.workout.work;
        averagePower = $scope.workout.averagePower;
        averageCadence = $scope.workout.averageCadence;
        averageSpeed = $scope.workout.averageSpeed;
        averageHeartRate = $scope.workout.averageHeartRate;


        if (workoutName.toUpperCase() == "ELEGIR NOMBRE") {
          Materialize.toast('Debe seleccionar el nombre del trabajo', 4000, 'red rounded');
          return;
        }

        if (workoutName.toUpperCase() == 'OTRO') {
          workoutName = $scope.workout.workoutName;
        }

        if (!workoutName || !date || duration == 'undefined' || distance == 'undefined' || work == 'undefined' ||
        averagePower == 'undefined' || averageCadence == 'undefined' || averageSpeed == 'undefined' ||
        averageHeartRate == 'undefined') {
          Materialize.toast('Debe ingresar todo los campos', 4000, 'red rounded');
          return;
        }

        paramsWorkout = {
          clientId: $scope.client.id,
          workoutName: workoutName,
          date: date,
          duration: duration,
          distance: distance,
          work: work,
          averagePower: averagePower,
          averageCadence: averageCadence,
          averageSpeed: averageSpeed,
          averageHeartRate: averageHeartRate
        }

        WorkoutResultSvc.create(paramsWorkout)
        .then((res) => {
          console.log(res.data);
          Materialize.toast('Se creó correctamente', 4000, 'green rounded');
          $scope.forms.formCreateWorkoutResult.$setPristine();
          $scope.forms.formCreateWorkoutResult.$setUntouched();
          $scope.workout = {};
          $scope.nameOptions.selected = 'Elegir nombre';
          $scope.showInputName = false;

        })
        .catch((err) => {
          console.log(err);
        })

      }


    }
  ]);
