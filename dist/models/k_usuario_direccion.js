"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const kUsuarioDireccionModel = config_1.db.define('k_usuario_direccion', {
    ID_USUARIO_DIRECCION: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    NB_CALLE: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    NB_COLONIA: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    NO_INTERIOR: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    NO_EXTERIOR: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    NO_CP: {
        type: sequelize_1.DataTypes.INTEGER,
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
    DS_ENTRE_CALLES: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true
    },
    ID_USUARIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_usuario',
            key: 'ID_USUARIO'
        }
    },
    FG_PRINCIPAL: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    FG_DIRECCION_TIPO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    FE_CREACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    NO_TELEFONO_CONTACTO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    ID_CODIGO_POSTAL: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    }
}, {
    tableName: 'k_usuario_direccion',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_USUARIO_DIRECCION" },
            ]
        },
        {
            name: "fk_dir_usuario",
            using: "BTREE",
            fields: [
                { name: "ID_USUARIO" },
            ]
        },
        {
            name: "fk_dir_mun",
            using: "BTREE",
            fields: [
                { name: "ID_MUNICIPIO_GEOGRAFICO" },
            ]
        },
        {
            name: "fk_dir_estado",
            using: "BTREE",
            fields: [
                { name: "ID_ESTADO_GEOGRAFICO" },
            ]
        },
    ]
});
exports.default = kUsuarioDireccionModel;
//# sourceMappingURL=k_usuario_direccion.js.map