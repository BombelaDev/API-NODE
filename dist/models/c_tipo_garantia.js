"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const TipoGarantiaModel = config_1.db.define('c_tipo_garantia', {
    ID_TIPO_GARANTIA: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    CL_TIPO_GARANTIA: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    CL_CLASIFICACION_GARANTIA: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    NO_HP_DESDE: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    },
    NO_HP_HASTA: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    },
    MN_GARANTIA: {
        type: sequelize_1.DataTypes.DECIMAL(12, 4),
        allowNull: false
    }
}, {
    tableName: 'c_tipo_garantia',
    timestamps: false,
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
                { name: "ID_TIPO_GARANTIA" },
            ]
        },
    ]
});
exports.default = TipoGarantiaModel;
//# sourceMappingURL=c_tipo_garantia.js.map