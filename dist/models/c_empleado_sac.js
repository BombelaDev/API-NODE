"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const EmpleadoSacModel = config_1.db.define('c_empleado_sac', {
    ID_EMPLEADO_SAC: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    NB_EMPLEADO_SAC: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    NB_APELLIDO_PATERNO_SAC: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    NB_APELLIDO_MATERNO_SAC: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    ID_MUNICIPIO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 's_municipios_geografico',
            key: 'ID_MUNICIPIO_GEOGRAFICO'
        }
    },
    ID_ESTADO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 's_estados_geografico',
            key: 'ID_ESTADO_GEOGRAFICO'
        }
    },
    NB_CALLE: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    NO_INTERIOR: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    NO_EXTERIOR: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    NO_CP: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NB_COLONIA: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    NO_TELEFONO: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false
    },
    FE_ALTA: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    FG_ACTIVO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    DS_EMAIL: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    }
}, {
    tableName: 'c_empleado_sac',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_EMPLEADO_SAC" },
            ]
        },
        {
            name: "fk_empleado_mun",
            using: "BTREE",
            fields: [
                { name: "ID_MUNICIPIO_GEOGRAFICO" },
            ]
        },
        {
            name: "fk_empleado_esatdo",
            using: "BTREE",
            fields: [
                { name: "ID_ESTADO_GEOGRAFICO" },
            ]
        },
    ]
});
exports.default = EmpleadoSacModel;
//# sourceMappingURL=c_empleado_sac.js.map