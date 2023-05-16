"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const KDiaNoLaborableSales = config_1.db.define('k_dia_no_laborable_sales', {
    ID_DIA_NO_LABORABLE_SALES: {
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
    tableName: 'k_dia_no_laborable_sales',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_DIA_NO_LABORABLE_SALES" },
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
exports.default = KDiaNoLaborableSales;
//# sourceMappingURL=k_dia_no_laborable_sales.js.map