"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const UsuarioModel = config_1.db.define('c_usuario', {
    ID_USUARIO: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    NB_USUARIO: {
        type: sequelize_1.DataTypes.STRING(2000),
        allowNull: false
    },
    NB_APELLIDO_PATERNO: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    NB_APELLIDO_MATERNO: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    },
    CL_GENERO: {
        type: sequelize_1.DataTypes.STRING(6),
        allowNull: true
    },
    FE_NACIMIENTO: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    URL_FOTO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    DS_EMAIL: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    },
    FG_MORAL: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    DS_PASSWORD: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    CL_ESTADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        comment: "1.- Activo, 0.- Inactivo, 2.-Bloqueado"
    },
    FE_CREACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    CL_USUARIO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    FE_ACTIVACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    CL_RFC: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    NO_TELEFONO_MOVIL: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    NO_TELEFONO_EMPRESA: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    DS_RAZON_SOCIAL: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    CL_RUBRO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    FE_ULTIMO_INICIO_SESION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    ID_CAV: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        comment: "ID de usuario asociado a cav "
    }
}, {
    tableName: 'c_usuario',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_USUARIO" },
            ]
        },
    ]
});
exports.default = UsuarioModel;
//# sourceMappingURL=c_usuario.js.map