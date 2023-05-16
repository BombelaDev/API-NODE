"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const TipoIdentificacionModel = config_1.db.define('s_tipo_identificacion', {
    ID_TIPO_IDENTIFICACION: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    NB_TIPO_IDENTIFICACION: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    }
}, {
    tableName: 's_tipo_identificacion',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_TIPO_IDENTIFICACION" },
            ]
        },
    ]
});
exports.default = TipoIdentificacionModel;
//# sourceMappingURL=s_tipo_identificacion.js.map