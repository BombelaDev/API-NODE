"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const CavModel = config_1.db.define('c_cav', {
    ID_CAV: {
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
    NB_CAV: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    NB_CALLE: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    NB_COLONIA: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    NO_INTERIOR_CAV: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    NO_EXTERIOR_CAV: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
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
    NO_CP: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    CL_CAV: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    FG_COMERCIAL: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    FG_SERVICIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NB_CONTACTO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    NO_TELEFONO_CAV: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    DS_CORREO_CAV: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    FE_CREACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    ID_REGION: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_region',
            key: 'ID_REGION'
        }
    },
    NO_LATITUD: {
        type: sequelize_1.DataTypes.DOUBLE(20, 14),
        allowNull: true
    },
    NO_LONGITUD: {
        type: sequelize_1.DataTypes.DOUBLE(20, 14),
        allowNull: true
    },
    ID_USUARIO_CARALIANZ: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NB_APELLIDO_PATERNO_GERENTE: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    FG_ACTIVO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_APROBADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NB_USUARIO_APROBO: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    NB_USUARIO_ACTUALIZA: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    },
    DS_RAZON_SOCIAL: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    },
    RFC_CAV: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: true
    }
}, {
    tableName: 'c_cav',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_CAV" },
            ]
        },
        {
            name: "fk_c_cav_c_socio_comercial",
            using: "BTREE",
            fields: [
                { name: "ID_SOCIO_COMERCIAL" },
            ]
        },
        {
            name: "fk_cav_mun",
            using: "BTREE",
            fields: [
                { name: "ID_MUNICIPIO_GEOGRAFICO" },
            ]
        },
        {
            name: "fk_cav_estado_geo",
            using: "BTREE",
            fields: [
                { name: "ID_ESTADO_GEOGRAFICO" },
            ]
        },
        {
            name: "fk_cav_region",
            using: "BTREE",
            fields: [
                { name: "ID_REGION" },
            ]
        },
    ]
});
exports.default = CavModel;
//# sourceMappingURL=c_cav.js.map