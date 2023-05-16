"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const KDiaNoLaborableModel = config_1.db.define('k_dia_no_laborable', {
    ID_DIA_NO_LABORABLE: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    ID_CAV: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_cav',
            key: 'ID_CAV'
        }
    },
    FE_NO_LABORABLE: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    },
    FG_DIA_COMPLETO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'k_dia_no_laborable',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_DIA_NO_LABORABLE" },
            ]
        },
        {
            name: "fk_no_laborable_cav",
            using: "BTREE",
            fields: [
                { name: "ID_CAV" },
            ]
        },
    ]
});
exports.default = KDiaNoLaborableModel;
//# sourceMappingURL=k_dia_no_laborable.js.map