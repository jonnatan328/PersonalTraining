/**
 * WorkoutResult.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
		id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
		workoutName: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
		date: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
    duration: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		distance: {
			type: Sequelize.FLOAT,
			allowNull: false,
		},
		work: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
		averagePower: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
		averageCadence: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
		averageSpeed: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
		averageHeartRate: {
			type: Sequelize.FLOAT,
			allowNull: false
		}
	},
	// Describe las asociones que tiene con los demás modelos.
  associations: function() {
    // Asociación uno a muchos con el modelo Client.
    WorkoutResult.belongsTo(Client, {
      foreignKey: {
        name: 'clientId',
        allowNull: false
      }
    });
  },
	// Configuraciones y metodos del modelo.
  options: {
    tableName: 'workoutResult',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  },
};
