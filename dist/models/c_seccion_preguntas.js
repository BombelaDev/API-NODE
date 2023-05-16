"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const SeccionPreguntasModel = config_1.db.define('c_seccion_preguntas', {
    ID_SECCION_PREGUNTAS: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    NB_PREGUNTA: {
        type: sequelize_1.DataTypes.STRING(3000),
        allowNull: false
    },
    CL_PREGUNTA: {
        type: sequelize_1.DataTypes.STRING(5),
        allowNull: false
    },
    PR_PONDERACION: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    },
    ID_SECCION: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_seccion',
            key: 'ID_SECCION'
        }
    }
}, {
    tableName: 'c_seccion_preguntas',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_SECCION_PREGUNTAS" },
            ]
        },
        {
            name: "PREGUNTAS_SECCION",
            using: "BTREE",
            fields: [
                { name: "ID_SECCION" },
            ]
        },
    ]
});
exports.default = SeccionPreguntasModel;
//# sourceMappingURL=c_seccion_preguntas.js.map