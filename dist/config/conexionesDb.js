"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBBETA = exports.DBALPHA = exports.DBPRODUCTION = void 0;
const sequelize_1 = require("sequelize");
const mysql2_1 = __importDefault(require("mysql2"));
exports.DBPRODUCTION = new sequelize_1.Sequelize('primary_app_db', 'dio4hgn65hqdyl30', 'lqv3u6bbn3li9y6r', {
    host: 'kt753cuwssiimfsk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    dialectModule: mysql2_1.default,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    //  multipleStatements: true
    logging: false
    //logging:false
});
// dsd
exports.DBALPHA = new sequelize_1.Sequelize('dkakoj046emdlqj8', 'f81oryqt5dqodktk', 'cjn33ewopziz65my', {
    host: 'dcrhg4kh56j13bnu.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    dialectModule: mysql2_1.default,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    //  multipleStatements: true
    logging: false
    //logging:false
});
exports.DBBETA = new sequelize_1.Sequelize('szzuiyizp2czc4we', 'tigwpuee4e4f55bh', 'gprouo9ezquoar4g', {
    host: 'dcrhg4kh56j13bnu.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    dialect: 'mysql',
    dialectModule: mysql2_1.default,
    port: 3306,
    define: {
        freezeTableName: true,
        timestamps: false,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    //  multipleStatements: true
    logging: false
    //logging:false
});
//# sourceMappingURL=conexionesDb.js.map