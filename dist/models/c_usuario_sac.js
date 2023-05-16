"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const UsuarioSacModel = config_1.db.define('c_usuario_sac', {
    ID_USUARIO_SAC: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_USUARIO_SAC: {
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
    ID_EMPLEADO_SAC: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_empleado_sac',
            key: 'ID_EMPLEADO_SAC'
        }
    },
    FE_ULTIMO_INICIO_SESION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    ID_ROL_SAC: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_rol_sac',
            key: 'ID_ROL_SAC'
        }
    },
    FG_CAMBIAR_PASSWORD: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'c_usuario_sac',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_USUARIO_SAC" },
            ]
        },
        {
            name: "fk_empleado_empleado",
            using: "BTREE",
            fields: [
                { name: "ID_EMPLEADO_SAC" },
            ]
        },
        {
            name: "fk_suario_rol",
            using: "BTREE",
            fields: [
                { name: "ID_ROL_SAC" },
            ]
        },
    ]
});
exports.default = UsuarioSacModel;
//# sourceMappingURL=c_usuario_sac.js.map