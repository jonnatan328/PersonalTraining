/**
 * Client.js
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
    names: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    lastnames: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    birthday: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
    identification: {
      type: Sequelize.STRING(64),
      allowNull: false,
      unique: true
    },
    country: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    department: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    city: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    nomenclature: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    email: {
      type: Sequelize.STRING(64),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phonenumber: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    height: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
    additionalInformation: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    imageURI: {
      type: Sequelize.STRING(512),
      // allowNull: false,
    },
  },
  // Describe las asociones que tiene con los demás modelos.
  associations: function() {
    // Asociación uno a muchos con el modelo WorkoutResult.
    Client.hasMany(WorkoutResult,{
      foreignKey: {
        name: 'clientId',
        allowNull: false
      }
    });
    // Asociación uno a muchos con el modelo WeightRecord.
    Client.hasMany(WeightRecord,{
      foreignKey: {
        name: 'clientId',
        allowNull: false
      }
    });
  },
  // Configuraciones y metodos del modelo.
  options: {
    tableName: 'client',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  },
};
