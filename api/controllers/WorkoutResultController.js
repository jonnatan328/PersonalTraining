/**
 * WorkoutResultController
 *
 * @description :: Server-side logic for managing workoutresults
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  create: function(req, res) {
    var workoutName = null;
    var date = null;
    var duration = null;
    var distance = null;
    var work = null;
    var averagePower = null;
    var averageCadence = null;
    var averageSpeed = null;
    var averageHeartRate = null;
    var clientId = null;
    var workoutResultCredentials = null;

    // Definición de variables apartir de los parametros de la solicitud y validaciones.
    workoutName = req.param('workoutName');
    if (!workoutName) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar un nombre de entrenamiento.'
      });
    }

    date = req.param('date');
    if (!date) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar una fecha.'
      });
    }
    // Definición de variables apartir de los parametros de la solicitud y validaciones.
    duration = req.param('duration');
    sails.log.debug(duration);
    if (duration == null) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar una duración.'
      });
    }

    distance = req.param('distance');
    if (distance == null) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar una distancia.'
      });
    }
    // Definición de variables apartir de los parametros de la solicitud y validaciones.
    work = req.param('work');
    if (work == null) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar un trabajo.'
      });
    }
    // Definición de variables apartir de los parametros de la solicitud y validaciones.
    averagePower = req.param('averagePower');
    if (averagePower == null) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar una potencia.'
      });
    }
    // Definición de variables apartir de los parametros de la solicitud y validaciones.
    averageCadence = req.param('averageCadence');
    if (averageCadence == null) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar una cadencia.'
      });
    }
    // Definición de variables apartir de los parametros de la solicitud y validaciones.
    averageSpeed = req.param('averageSpeed');
    if (averageSpeed == null) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar una velocidad.'
      });
    }

    averageHeartRate = req.param('averageHeartRate');
    if (averageHeartRate == null) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar una frecuencia.'
      });
    }

    clientId = parseInt(req.param('clientId'));
    if (!clientId) {
      return res.badRequest({
        code: 1,
        msg: 'Se debe ingresar un id de cliente.'
      });
    }

    workoutResultCredentials = {
      workoutName: workoutName,
      date: date,
      duration: duration,
      distance: distance,
      work: work,
      averagePower: averagePower,
      averageCadence: averageCadence,
      averageSpeed: averageSpeed,
      averageHeartRate: averageHeartRate,
    }

    Client.findOne({
        where: {
          id: clientId
        }
      })
      .then((client) => {
        workoutResultCredentials.clientId = client.id;
        return WorkoutResult.create(workoutResultCredentials);
      })
      .then((workoutResult) => {
        res.created(workoutResult)
      })
      .catch((err) => {
        sails.log.debug(err);
      })
  },

  getByClient: function (req, res) {
    var clientId = null;

    clientId = parseInt(req.param('clientId'))
    if (!clientId) {
      return res.badRequest('Debe ingresar el id del cliente.')
    }

    WorkoutResult.findAll({
      where : {
        clientId: clientId
      }
    })
    .then((workoutResult) => {
      res.ok(workoutResult);
    })
    .catch((err) => {
      sails.log.debug(err)
    })
  }


};
