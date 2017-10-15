/**
 * ClientController
 *
 * @description :: Server-side logic for managing clients
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 // Modulos requeridos.
 var promise = require('bluebird');
 var fs = require('fs');
 var sizeOf = require('image-size');
 var imageDataURIModule = require('image-data-uri');

module.exports = {

	/**
   *  función para registrar una empresa.
   * @param  {Object} req Request object
   * @param  {Object} res Response object
   * @return {Object}
   */
  signup: function(req, res) {
    // Inicialización de variables necesarias. los parametros necesarios viajan en el cuerpo
    // de la solicitud.
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
		var height = null;
		var weight = null;
    var additionalInformation = null;
		var dateWeightRecord = null;
    var absolutePath = null;

		var imageURI = null;
		// variables necesarias para cargar la imagen.
		var imageDataURI = null;
		var tempLocation = null;


    // Definición de variables apartir de los parametros de la solicitud y validaciones.
    names = req.param('names');
    if (!names) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar un nombre.'
      });
    }

		lastnames = req.param('lastnames');
    if (!lastnames) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar un apellido.'
      });
    }

    identification = req.param('identification').toString();
    if (!identification) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar una identificación.'
      });
    }

    birthday = req.param('birthday');
    if (!birthday) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar una fecha de nacimiento.'
      });
    }

		email = req.param('email');
		if (!email) {
			return res.badRequest({
				code: 1,
				msg: 'Se debe ingresar un email.'
			});
		}

    country = req.param('country');
    if (!country) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar un país.'
      });
    }

    department = req.param('department');
    if (!department) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar un departamento.'
      });
    }

    city = req.param('city');
    if (!city) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar una ciudad.'
      });
    }

    nomenclature = req.param('nomenclature');
    if (!nomenclature) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar una nomenclatura.'
      });
    }

    phonenumber = req.param('phonenumber');
    if (!phonenumber) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar un telefono.'
      });
    }

    height = req.param('height');
    if (!height) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar una estatura.'
      });
    }

    weight = req.param('weight');
    if (!weight) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar un peso.'
      });
    }

    additionalInformation = req.param('additionalInformation');
    imageDataURI = req.param('imageDataURI');
		dateWeightRecord = TimeZoneService.getDate({});

    var relativePath = "/assets/images/avatars/";
    var pathAvatars = sails.config.appPath + relativePath + identification;
    // var tmpPathAvatars = sails.config.appPath + '/.tmp/public/images/uploads/';

    Client.findOne({
        where: {
					$or: [{
            identification: identification
          }, {
            email: email
          }]
        }
      })
      .then(function(client) {
        if (client) {
          throw new Error("El cliente ya existe");
        }
				if (imageDataURI) {
          // return imageDataURIModule.outputFile(imageDataURI, pathAvatars)
          return ImageDataURIService.decodeAndSave(imageDataURI, pathAvatars)
        }
        return null;
      })
      .then(function(resUpload) {
        if (resUpload) {
          absolutePath = resUpload;
          // Se valida que el archivo tenga el formato y la resolución deseada.
          var dimensions = sizeOf(absolutePath);
          if (dimensions.type != "png" && dimensions.type != "jpeg" && dimensions.type != "jpg") {
            fs.unlink(absolutePath, (err) => {
              sails.log.debug('Se borró la imagen');
            });
            throw new Error("La configuración del archivo no es valida");
          }
          imageURI = relativePath + '.' + absolutePath.split('.')[1];
        }

        // Organización de credenciales
        var clientCredentials = createClientCredentials(names, lastnames, identification, birthday, email,
					 country, department, city, nomenclature, phonenumber,height, imageURI, additionalInformation);

        var weightRecordCredentials = createWeightRecordCredentials(dateWeightRecord, weight);

        // Se verifica que el usuario no exista antes de su creación, en caso de que exista
        // se retorna un error de conflicto con codigo de error 409. En caso de que no exista
        // se crea el regitro del usuario.
        return sequelize.transaction(function(t) {
          return Client.create(clientCredentials, {
              transaction: t
            })
            .then(function(client) {
              weightRecordCredentials.clientId = client.id;
              return WeightRecord.create(weightRecordCredentials, {
                transaction: t
              });
            })
        }).then(function(result) {
          // Transaction has been committed
          res.ok(result);
        })
      })
      .catch(function(err) {
        if (absolutePath) {
          fs.unlink(absolutePath, (err) => {
            if (err) throw err;
            sails.log.debug('Se borró la imagen');
          });
        }
        // Transaction has been rolled back
        res.serverError(err);
      })

  },

  getAll: function (req, res) {
    Client.findAll({
        include: [{
          model: WeightRecord,
        }],
      })
      .then(function(clients) {
        clients.forEach(function(client, index, clientsList) {
          ImageDataURIService.encode(sails.config.appPath + client.imageURI)
            .then((imageDataURI) => {
              client.imageURI = imageDataURI;
            })
            .catch((err) => {
              sails.log.debug(err)
            })
        })
        setTimeout(function() {
          res.ok(clients);
        }, 15);

      })
      .catch(function(err) {
        sails.log.debug(err);
        res.serverError(err);
      })
  }


};

// crea las credenciales para insertar una empresa
function createClientCredentials(names, lastnames, identification, birthday, email,
	 country, department, city, nomenclature, phonenumber,height, imageURI, additionalInformation) {
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
    additionalInformation: additionalInformation,
		height: height
  };
  if (imageURI) {
    clientCredentials.imageURI = imageURI;
  }
  return clientCredentials;
}

// crea las credenciales para insertar un record para el peso
function createWeightRecordCredentials(dateWeightRecord, weight) {
  var weightRecordCredentials = {
    date: dateWeightRecord,
    weightValue: weight
  };
  return weightRecordCredentials;
};
