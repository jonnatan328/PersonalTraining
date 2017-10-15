(function() {
  var personalTraining = angular.module('personalTraining');

  personalTraining.controller('ClientCreateCtrl', ['$scope', '$log', '$sce', '$ngConfirm', 'GeographicSvc', 'ClientSvc', 'orderByFilter',
    function($scope, $log, $sce, $ngConfirm, GeographicSvc, ClientSvc, orderBy) {

      $scope.forms = {};

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
      // $scope.minDate = (new Date($scope.currentTime.getTime() - (1000 * 60 * 60 * 24 * days))).toISOString();
      // $scope.maxDate = (new Date($scope.currentTime.getTime() + (1000 * 60 * 60 * 24 * days))).toISOString();

      $scope.user = {};
      $scope.countries = {};
      $scope.departments = {};
      $scope.cities = {};
      $scope.countryCode = null;


      // Se obtiene los paises del mundo.
      GeographicSvc.getCountriesByContinent()
      .then((res) => {
        $scope.countries = {
          choices: res.data,
          selected: res.data[51]
        };
        $scope.getDepartments($scope.countries.selected.alpha2Code);
      })

      // Se obtiene las primeras divisiones administrativas de un país.
      $scope.getDepartments = function (countryCode) {
        $scope.countryCode = countryCode;
        GeographicSvc.getDepartmentsByCountry({
          country: countryCode,
          featureCode: 'ADM1',
          land: 'es',
          username: 'jonnatan328'
        })
        .then((res) => {
          var departments = orderBy(res.data.geonames, 'adminName1');
          departments.unshift({adminName1: 'Seleccione...', adminCode1: -1});
          $scope.departments = {
            choices: departments,
            selected: departments[0]
          }
        })
      }

      // Se obtienen las segundas divisiones administrativas de un país.
      $scope.getCities = function (adminCode1) {
        GeographicSvc.getCitiesByDepartment({
          country: $scope.countryCode,
          featureCode: 'ADM2',
          adminCode1: adminCode1,
          username: 'jonnatan328'
        })
        .then((res) => {
          var cities = orderBy(res.data.geonames, 'name');
          $scope.cities = {
            choices: cities,
            selected: cities[0]
          }
        })
      }

      // Función que se llama cuanto la imagen se carga.
      $scope.onLoad = function(e, reader, file, fileList, fileOjects, fileObj) {
        $scope.imgAvatarStyle = {'background-image': 'none'};
        $scope.fileObject = fileObj;
        $scope.user.imageDataURI = 'data:' + fileObj.filetype + ';base64,' + fileObj.base64;
      };

      // Función para registrar un usuario en el sistema.
      $scope.registerUser = function() {
        // Declaración de variables.
        var names = null;
        var lastnames = null;
        var identification = null;
        var birthday = null;
        var email = null;
        var country = null;
        var department = null;
        var city = null;
        var nomenclature = null;
        var phonenumber = null;
        var weight = null;
        var height = null;
        var imageDataURI = null;
        var additionalInformation = null;

        // Definición de variables.
        names = $scope.user.names;
        lastnames = $scope.user.lastnames;
        identification = $scope.user.identification;
        birthday = $scope.user.birthday;
        email = $scope.user.email;
        country = $scope.countries.selected.name;
        department = $scope.departments.selected;
        city = $scope.cities.selected;
        nomenclature = $scope.user.nomenclature;
        phonenumber = $scope.user.phonenumber;
        weight = $scope.user.weight;
        height = $scope.user.height;
        imageDataURI = $scope.user.imageDataURI;
        additionalInformation = $scope.user.additionalInformation;


        // Validación de los datos ingresados.
        if (!names || !lastnames || !identification || !birthday || !email || !country ||
          department.adminCode1 == -1 || !city || !nomenclature || !phonenumber || !weight || !height) {
          Materialize.toast('Verifique que todos los datos se hayan ingresado correctamente.', 4000,'red rounded')
          return;
        }

        if (!imageDataURI) {
          Materialize.toast('Ingrese una foto.', 4000,'red rounded')
          return;
        }

        city = city.name;
        department = department.adminName1;

        // Credenciales para el registro de un usuario.
        var clientCredentials = {
          names: names,
          lastnames: lastnames,
          identification: identification,
          birthday: birthday,
          email: email,
          country: country,
          department: department,
          city: city,
          nomenclature: nomenclature,
          phonenumber: phonenumber,
          weight: weight,
          height: height,
          imageDataURI: imageDataURI,
          additionalInformation: additionalInformation
        }

        $scope.signinup = true;
        ClientSvc.signup(clientCredentials)
          .then(function(res) {
            $scope.signingUp = false;
            console.log($scope.forms.formSignup);
            $scope.forms.formSignup.$setPristine();
            $scope.forms.formSignup.$setUntouched();
            $ngConfirm({
              title: 'Registro exitoso',
              content: 'El cliente se registró correctamente',
              type: 'green',
              typeAnimated: true,
              columnClass: 'medium',
              buttons: {
                accept: {
                  text: 'Aceptar',
                  btnClass: 'btn-green',
                  action: function() {
                    $scope.user= {};
                    $scope.$apply();
                  }
                }
              }
            });
          })
          .catch(function(err) {
            console.log(err);
            if (err.status === 409) {
              Materialize.toast('Error, el nombre de usuario ya está registrado.', 4000,'red rounded');
            } else {
              Materialize.toast('No se ha podido crear el cliente.', 4000,'red rounded');
            }
            $scope.signingUp = false;
          })


      }


    }
  ]);
})();
