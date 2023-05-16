"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const CitasCarInspectorModel = config_1.db.define('c_cita_car_inspector', {
    ID_CITA_CAR_INSPECTOR: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_USUARIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_usuario',
            key: 'ID_USUARIO'
        }
    },
    ID_CAV: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_cav',
            key: 'ID_CAV'
        }
    },
    FE_CITA: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    HR_CITA: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    ID_MARCA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_marca',
            key: 'ID_MARCA'
        }
    },
    ID_MODELO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ID_ANIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    CL_ESTADO: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    CL_CITA: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    FE_CREACION: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    ID_EMPLEADO_COMERCIAL: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    ID_EMPLEADO_SERVICIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    FE_CADUCIDAD: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    FG_ACTIVO_AUMENTO_TIEMPO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_EMPLEADO_MECANICO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    ID_VEHICULO_ALTA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    CL_COLOR: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true
    },
    NO_KM: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    CL_URL_HOJA_RECEPCION: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: true
    },
    FG_NUEVA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_IS_REAGENDADA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_ASESOR_SERVICIO_ENTERADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FG_ASESOR_COMERCIAL_ENTERADO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FE_SERVICIO_ENTERADO: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    FE_COMERCIAL_ENTERADO: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    FE_CITA_CONDENSADA: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    FG_RECORDATORIO_DEL_DIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    FE_NO_PRESENTO: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    },
    FG_RECORDATORIO_NO_PRESENTO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'c_cita_car_inspector',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_CITA_CAR_INSPECTOR" },
            ]
        },
        {
            name: "fk_cita_car_cav",
            using: "BTREE",
            fields: [
                { name: "ID_CAV" },
            ]
        },
        {
            name: "fk_cita_car_usu",
            using: "BTREE",
            fields: [
                { name: "ID_USUARIO" },
            ]
        },
        {
            name: "fk_cita_car_marca",
            using: "BTREE",
            fields: [
                { name: "ID_MARCA" },
            ]
        },
        {
            name: "fk_cita_car_mod",
            using: "BTREE",
            fields: [
                { name: "ID_MODELO" },
            ]
        },
        {
            name: "fk_cita_car_anio",
            using: "BTREE",
            fields: [
                { name: "ID_ANIO" },
            ]
        },
    ]
});
exports.default = CitasCarInspectorModel;
//# sourceMappingURL=c_cita_car_inspector.js.map