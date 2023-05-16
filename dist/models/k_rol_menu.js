"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const kRolMenuCaralianzModel = config_1.db.define('k_rol_menu', {
    ID_ROL: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'c_rol',
            key: 'ID_ROL'
        }
    },
    NB_ROL_MENU: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    IMG_ICO: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    CL_ROL_MENU: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false
    },
    JS_SUBMENU: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    ID_SECUENCIA: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    NO_TIPO_SERVICIO: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'k_rol_menu',
    timestamps: false,
    indexes: [
        {
            name: "fk_rol_rol",
            using: "BTREE",
            fields: [
                { name: "ID_ROL" },
            ]
        },
    ]
});
exports.default = kRolMenuCaralianzModel;
//# sourceMappingURL=k_rol_menu.js.map