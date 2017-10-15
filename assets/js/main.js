'use stric';

(function() {
  var personalTraining = angular.module('personalTraining', ['ui.router', 'ui.materialize', 'ngMdIcons', 'ngCookies', 'cp.ngConfirm',
      'ngMessages', 'naif.base64', 'nvd3', 'htmlToPdfSave'
  ]);

  // Inicializacion de la configuracion principal al ingresar al dominio.
  personalTraining.run(['$rootScope',
    function($rootScope,) {

    }
  ]);

  personalTraining.config(['$compileProvider', function($compileProvider) {
    $compileProvider.debugInfoEnabled(false);
    $compileProvider.commentDirectivesEnabled(false);
    $compileProvider.cssClassDirectivesEnabled(false);
  }]);

  // Angular filters
  personalTraining.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
  });
})();
