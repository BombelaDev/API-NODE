"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const PreguntasModel = config_1.db.define('c_preguntas', {
    ID_PREGUNTAS: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_SECCION: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    JS_PREGUNTAS: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    NO_SECUENCIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'c_preguntas',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_PREGUNTAS" },
            ]
        },
    ]
});
exports.default = PreguntasModel;
//# sourceMappingURL=c_preguntas.js.map