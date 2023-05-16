"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const UsuarioCavModel = config_1.db.define('c_usuario_cav', {
    ID_USUARIO_CAV: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_SOCIO_COMERCIAL: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_socio_comercial',
            key: 'ID_SOCIO_COMERCIAL'
        }
    },
    CL_USUARIO_CAV: {
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
    ID_CAV: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_cav',
            key: 'ID_CAV'
        }
    },
    ID_EMPLEADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_empleado_cav',
            key: 'ID_EMPLEADO_CAV'
        }
    },
    FE_ULTIMO_INICIO_SESION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    ID_ROL: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_rol',
            key: 'ID_ROL'
        }
    },
    FG_CAMBIAR_PASSWORD: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'c_usuario_cav',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_USUARIO_CAV" },
            ]
        },
        {
            name: "fk_Cav_usuairo_cav",
            using: "BTREE",
            fields: [
                { name: "ID_CAV" },
            ]
        },
        {
            name: "fk_socio_socio",
            using: "BTREE",
            fields: [
                { name: "ID_SOCIO_COMERCIAL" },
            ]
        },
        {
            name: "fk_empleado_empleado",
            using: "BTREE",
            fields: [
                { name: "ID_EMPLEADO" },
            ]
        },
        {
            name: "fk_suario_rol",
            using: "BTREE",
            fields: [
                { name: "ID_ROL" },
            ]
        },
    ]
});
exports.default = UsuarioCavModel;
//# sourceMappingURL=c_usuario_cav.js.map