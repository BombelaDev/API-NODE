"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const VehiculoModel = config_1.db.define('c_vehiculo', {
    ID_VEHICULO: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_MARCA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'c_marca',
            key: 'ID_MARCA'
        }
    },
    ID_MODELO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_ANIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_VERSION: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'c_version',
            key: 'ID_VERSION'
        }
    },
    CL_TIPO_COMBUSTIBLE: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    CL_TRANSMISION: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    NO_CILINDROS: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: true
    },
    NO_PUERTAS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NO_PASAJEROS: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FE_CREACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    ID_CAV_ALTA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_cav',
            key: 'ID_CAV'
        }
    },
    ID_USUARIO_ALTA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NO_VIN: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    JS_ESTILOS: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_CRISTALES: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_PORTAVASOS: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_CONECTIVIDAD: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_CAJUELA: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_ASIENTOS: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_CLIMA: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    JS_SEGURIDAD: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    FG_EN_PORTAL: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    FG_ACTIVO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        comment: "-1= Borrador, 0=Inactivo, 1=Activo"
    },
    CL_VEHICULO: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    NO_MOTOR: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    NO_TRANSMISION: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    CL_TIPO_VEHICULO: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true
    },
    FG_VISIBLE_PORTAL: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NO_HP: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NB_MARCA: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    NB_MODELO: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    NO_ANIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    NB_VERSION: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true
    },
    FG_ES_ROBADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    URL_REPUVE: {
        type: sequelize_1.DataTypes.STRING(1000),
        allowNull: true
    },
    FG_GENERO_QR: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FE_INACTIVACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    DS_INACTIVACION: {
        type: sequelize_1.DataTypes.STRING(500),
        allowNull: true
    },
    FG_TIENE_GARANTIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_ES_DE_AGENCIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'c_vehiculo',
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
                { name: "ID_MARCA" },
            ]
        },
        {
            name: "fk_vehiculo_modelo",
            using: "BTREE",
            fields: [
                { name: "ID_MODELO" },
            ]
        },
        {
            name: "fk_vehiculo_anio",
            using: "BTREE",
            fields: [
                { name: "ID_ANIO" },
            ]
        },
        {
            name: "fk_vehiculo_cav",
            using: "BTREE",
            fields: [
                { name: "ID_CAV_ALTA" },
            ]
        },
        {
            name: "fk_vehiculo_version",
            using: "BTREE",
            fields: [
                { name: "ID_VERSION" },
            ]
        },
    ]
});
exports.default = VehiculoModel;
//# sourceMappingURL=c_vehiculo.js.map