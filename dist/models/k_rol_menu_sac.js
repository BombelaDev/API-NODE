"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const kRolMenuSacModel = config_1.db.define('k_rol_menu_sac', {
    ID_ROL_SAC: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
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
    }
}, {
    tableName: 'k_rol_menu_sac',
    timestamps: false,
    indexes: [
        {
            name: "fk_rol_rol",
            using: "BTREE",
            fields: [
                { name: "ID_ROL_SAC" },
            ]
        },
    ]
});
exports.default = kRolMenuSacModel;
//# sourceMappingURL=k_rol_menu_sac.js.map