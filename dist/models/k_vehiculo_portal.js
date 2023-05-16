"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const kVehiculoPortalModel = config_1.db.define('k_vehiculo_portal', {
    ID_VEHICULO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    NB_MARCA: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    NB_MODELO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    NO_ANIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NB_VERSION: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: false
    },
    CL_TIPO_COMBUSTIBLE: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: false
    },
    CL_TRANSMISION: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    NO_CILINDROS: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    },
    NO_PUERTAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NO_PASAJEROS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NO_VIN: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    JS_ESTILOS: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    MN_PRECIO_SUGERIDO: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    },
    NO_KM: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    PR_LLANTAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    PR_AMORTIGUADORES: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    PR_BATERIAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    PR_FRENOS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    PR_NIVELES: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    CL_ESTADO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    NB_MUNICIPIO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    NB_ESTADO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    FE_ACTIVACION_PORTAL: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: "0000-00-00 00:00:00"
    },
    JS_FOTOS: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    CL_COLOR: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    JS_CRISTALES: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    JS_PORTAVASOS: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    JS_CONECTIVIDAD: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    JS_CAJUELA: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    JS_ASIENTOS: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    JS_CLIMA: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    JS_SEGURIDAD: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    NO_VISTAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    URL_FOTO_PRINCIPAL: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: false
    },
    URL_FICHA_TECNICA: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: false
    },
    FG_TIENE_GARANTIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    URL_CERTIFICADO: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: false
    },
    MN_PRECIO_ESTABLECIDO: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    },
    CNT_CUANTOS_GARAGE: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    CNT_NO_AGENDADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_VEHICULO_EN_BUSCADOR: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_EN_OFERTA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_APARTADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FE_CADUCIDAD: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    MN_PRECIO_PUBLICADO: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    FG_VENTA_CARALIANZ: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_DUENO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NO_KM_REVISION: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_APTO_GARANTIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_PROMOCIONAR_CON_GARANTIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_IS_AGENCIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_CAV: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_VEHICULO_DATOS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NO_HP: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    CNT_CUANTOS_QR: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FE_CADUCIDAD_APARTADO: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    FG_MOTOR: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_TRANSMISION: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_FRENOS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_CHASIS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_DIRECCION: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'k_vehiculo_portal',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_VEHICULO" },
            ]
        },
        {
            name: "fk_vehiculo_marca",
            using: "BTREE",
            fields: [
                { name: "NB_MARCA" },
            ]
        },
        {
            name: "fk_vehiculo_modelo",
            using: "BTREE",
            fields: [
                { name: "NB_MODELO" },
            ]
        },
        {
            name: "fk_vehiculo_anio",
            using: "BTREE",
            fields: [
                { name: "NO_ANIO" },
            ]
        },
        {
            name: "fk_vehiculo_version",
            using: "BTREE",
            fields: [
                { name: "NB_VERSION" },
            ]
        },
    ]
});
exports.default = kVehiculoPortalModel;
//# sourceMappingURL=k_vehiculo_portal.js.map