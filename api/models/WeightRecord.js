/**
 * WeightRecord.js
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
    date: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        isDate: true,
      }
    },
    weightValue: {
			type: Sequelize.FLOAT,
			allowNull: false
		},
  },
  // Describe las asociones que tiene con los demás modelos.
  associations: function() {
    // Asociación uno a muchos con el modelo Client.
    WeightRecord.belongsTo(Client, {
      foreignKey: {
        name: 'clientId',
        allowNull: false
      }
    });
  },
  // Configuraciones y metodos del modelo.
  options: {
    tableName: 'weightRecord',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  },
};
