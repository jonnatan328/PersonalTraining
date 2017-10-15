var personalTraining = angular.module('personalTraining');
personalTraining.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/public/content-home.html',
        controller: 'HomeCtrl'
      })

      .state('createClient', {
        url: '/createClient',
        templateUrl: 'templates/private/admin/client-create.html',
        controller: 'ClientCreateCtrl'
      })

      .state('listClients', {
        url: '/listClients',
        templateUrl: 'templates/private/admin/clients-list.html',
        controller: 'ClientsListCtrl'
      })

      .state('workoutResult', {
        url: '/workoutResult',
        templateUrl: 'templates/private/admin/workout-result.html',
        controller: 'WorkoutResultCtrl'
      })

      .state('workoutResult.create', {
        url: '/workoutResultCreate',
        templateUrl: 'templates/private/admin/workout-result-create.html',
        controller: 'WorkoutResultCreateCtrl'
      })

      .state('workoutResult.showGraphic', {
        url: '/showWorkoutResultGraphic',
        templateUrl: 'templates/private/admin/workout-result-show.html',
        controller: 'WorkoutResultShowCtrl'
      })

      .state('workoutResult.showTable', {
        url: '/showWorkoutResultTable',
        templateUrl: 'templates/private/admin/workout-result-table.html',
        controller: 'WorkoutResultTableCtrl'
      })


  }
]);
