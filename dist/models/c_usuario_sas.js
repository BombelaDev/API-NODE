"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const UsuarioSasModel = config_1.db.define('c_usuario_sas', {
    ID_USUARIO_SAS: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_USUARIO_SAS: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    DS_PASSWORD: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: false
    },
    IMG_FOTO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    CL_ESTADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        comment: "1.- Activo, 0.- Inactivo, 2.-Bloqueado"
    },
    ID_EMPLEADO_SAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_empleado_sas',
            key: 'ID_EMPLEADO_SAS'
        }
    },
    FE_ULTIMO_INICIO_SESION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    ID_ROL_SAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_rol_sas',
            key: 'ID_ROL_SAS'
        }
    },
    FG_CAMBIAR_PASSWORD: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ID_SOCIO_COMERCIAL: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'c_usuario_sas',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_USUARIO_SAS" },
            ]
        },
        {
            name: "fk_empleado_empleado",
            using: "BTREE",
            fields: [
                { name: "ID_EMPLEADO_SAS" },
            ]
        },
        {
            name: "fk_suario_rol",
            using: "BTREE",
            fields: [
                { name: "ID_ROL_SAS" },
            ]
        },
    ]
});
exports.default = UsuarioSasModel;
//# sourceMappingURL=c_usuario_sas.js.map