"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const kVehiculoDatosModel = config_1.db.define('k_vehiculo_datos', {
    ID_VEHICULO_DATOS: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_VEHICULO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'c_vehiculo',
            key: 'ID_VEHICULO'
        }
    },
    ID_DUENO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'c_usuario',
            key: 'ID_USUARIO'
        }
    },
    MN_PRECIO_SUGERIDO: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    NO_KM: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    PR_LLANTAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    PR_AMORTIGUADORES: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    PR_BATERIAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    PR_FRENOS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    PR_NIVELES: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    CL_ESTADO: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    FE_ESCENARIO: {
        type: sequelize_1.DataTypes.DATE(6),
        allowNull: false,
        comment: "fecha de cuando se hizo la revisión del vehiculo"
    },
    ID_MUNICIPIO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 's_municipios_geografico',
            key: 'ID_MUNICIPIO_GEOGRAFICO'
        }
    },
    ID_ESTADO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 's_estados_geografico',
            key: 'ID_ESTADO_GEOGRAFICO'
        }
    },
    JS_FOTOS: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    CL_COLOR: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    FE_VENTA: {
        type: sequelize_1.DataTypes.DATE(6),
        allowNull: true
    },
    FG_ACTIVO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    URL_FOTO_PRINCIPAL: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: true
    },
    URL_FICHA_TECNICA: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: true
    },
    CL_ESTATUS: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    FE_CADUCIDAD: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: true
    },
    URL_REPORTE_REVISION: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: true
    },
    ID_CITA_CARINSPECTOR: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    JS_REVISION: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    ID_ESTADO_GEOGRAFICO_PLACAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    CL_ESTADO_GEOGRAFICO_PLACAS: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    DS_OBSERVACION: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true
    },
    FG_BLINDADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NB_MUNICIPIO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    NB_ESTADO_GEOGRAFICO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    JS_DOCUMENTOS: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    NO_CALIFICACION: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    FG_APTO_GARANTIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    URL_CERTIFICADO: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true
    },
    CL_TOKEN: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    NO_KM_REVISION: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FE_INICIO_REVISION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    FE_FIN_REVISION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    JS_PREGUNTAS: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    ID_CAV: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_NO_ES_PROPIETARIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_GARANTIA_FABRICA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_SERVICIO_HECHO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NO_PLACAS: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    URL_DOCUMENTOS: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    FG_REPORTE_PLACAS_ROBO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_VIN_NO_COINCIDE: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_REFRENDO_MULTAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    MN_REFRENDO: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    JS_OBSERVACION_MECANICA: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_OBSERVACION_ESTETICA: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_OBSERVACION_PRUEBA_MANEJO: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    CL_FOLIO_REVISION: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    CL_FOLIO_CARINSPECTOR: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: true
    },
    FG_ES_AGENCIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FE_LIBERACION: {
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
    },
    CL_TIPO_USO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    FE_FACTURA_ORIGINAL: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'k_vehiculo_datos',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_VEHICULO_DATOS" },
                { name: "ID_VEHICULO" },
            ]
        },
        {
            name: "fk_vehiculo_vehiculo",
            using: "BTREE",
            fields: [
                { name: "ID_VEHICULO" },
            ]
        },
        {
            name: "fk_vehiculo_dueno",
            using: "BTREE",
            fields: [
                { name: "ID_DUENO" },
            ]
        },
        {
            name: "fk_vehiculo_estado",
            using: "BTREE",
            fields: [
                { name: "ID_ESTADO_GEOGRAFICO" },
            ]
        },
        {
            name: "fk_vehiculo_datos",
            using: "BTREE",
            fields: [
                { name: "ID_MUNICIPIO_GEOGRAFICO" },
            ]
        },
        {
            name: "ID_VEHICULO_DATOS",
            using: "BTREE",
            fields: [
                { name: "ID_VEHICULO_DATOS" },
            ]
        },
    ]
});
exports.default = kVehiculoDatosModel;
//# sourceMappingURL=k_vehiculo_datos.js.map