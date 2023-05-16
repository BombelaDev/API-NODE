"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config/config");
const sequelize_1 = require("sequelize");
const HLogModel = config_1.db.define('h_log', {
    TXT_LOG: {
        type: sequelize_1.DataTypes.STRING(5000),
        allowNull: true
    },
    TXT_LOG2: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    },
    TXT_LOG3: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'h_log',
    timestamps: false
});
exports.default = HLogModel;
//# sourceMappingURL=h_log.js.map