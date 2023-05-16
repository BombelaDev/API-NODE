"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const KHoraNoLaborableModel = config_1.db.define('k_hora_no_laborable', {
    ID_HORA_NO_LABORABLE: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_DIA_NO_LABORABLE: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'k_dia_no_laborable',
            key: 'ID_DIA_NO_LABORABLE'
        }
    },
    NO_HORA: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    }
}, {
    tableName: 'k_hora_no_laborable',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_HORA_NO_LABORABLE" },
            ]
        },
        {
            name: "fk_hora_dia",
            using: "BTREE",
            fields: [
                { name: "ID_DIA_NO_LABORABLE" },
            ]
        },
    ]
});
exports.default = KHoraNoLaborableModel;
//# sourceMappingURL=k_hora_no_laborable.js.map