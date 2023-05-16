"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const SocioComercialModel = config_1.db.define('c_socio_comercial', {
    ID_SOCIO_COMERCIAL: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_SOCIO_COMERCIAL: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    NB_SOCIO_COMERCIAL: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    DS_RAZON_SOCIAL: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    CL_RFC: {
        type: sequelize_1.DataTypes.STRING(50),
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
    NO_INTERIOR: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    },
    NO_EXTERIOR: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    NO_CP: {
        type: sequelize_1.DataTypes.INTEGER,
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
    NB_DIRECTOR_GENERAL: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    DS_CORREO_DIRECTOR_GENERAL: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    NB_CONTACTO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    DS_CORREO_CONTACTO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    NO_TELEFONO_CONTACTO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    FE_CREACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        comment: "1.- Activo, 0.- Inactivo, 2.-Bloqueado"
    },
    CL_ESTADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_USUARIO_SAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NB_APELLIDO_PATERNO_DIRECTOR: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    },
    NB_REPRESENTATE_LEGAL: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    },
    NO_TELEFONO_CONTACTO_REPRESENTANTE: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    DS_CORREO_REPRESENTANTE: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    },
    NO_EXTENSION_CONTACTO: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    },
    NO_TELEFONO_CELULAR_CONTACTO: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    NO_TELEFONO_CELULAR_DIRECTOR: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    NO_EXTENSION_DIRECTOR: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    NO_TELEFONO_OFICINA_DIRECTOR: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'c_socio_comercial',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_SOCIO_COMERCIAL" },
            ]
        },
        {
            name: "fk_mun_geo_mun_geo",
            using: "BTREE",
            fields: [
                { name: "ID_MUNICIPIO_GEOGRAFICO" },
            ]
        },
        {
            name: "fk_es_geo_es_geo",
            using: "BTREE",
            fields: [
                { name: "ID_ESTADO_GEOGRAFICO" },
            ]
        },
    ]
});
exports.default = SocioComercialModel;
//# sourceMappingURL=c_socio_comercial.js.map