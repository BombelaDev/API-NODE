"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const MunicipiosGeograficosModel = config_1.db.define('s_municipios_geografico', {
    ID_MUNICIPIO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_ESTADO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 's_estados_geografico',
            key: 'ID_ESTADO_GEOGRAFICO'
        }
    },
    NB_MUNICIPIO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    CL_MUNICIPIO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 's_municipios_geografico',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_MUNICIPIO_GEOGRAFICO" },
            ]
        },
        {
            name: "FK_ESTADO_ESTADO",
            using: "BTREE",
            fields: [
                { name: "ID_ESTADO_GEOGRAFICO" },
            ]
        },
    ]
});
exports.default = MunicipiosGeograficosModel;
//# sourceMappingURL=s_municipios_geografico.js.map