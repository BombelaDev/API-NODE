"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = exports.bbc = exports.NB_BUCKET = exports.s3 = exports.TOKEN_CONEKTA = exports.TOKEN_MERCADO_PAGO = exports.URL_BACKEND = exports.URL_FRONTEND = exports.db = exports.TIPO_AMBIENTE = void 0;
const conexionesDb_1 = require("./conexionesDb");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
process.env.CADUCIDAD_TOKEN = '26hr';
//process.env.CADUCIDAD_TOKEN = '50000';
process.env.SEED_TOKEN = process.env.SEED_TOKEN || 'TK_KEY_C4R4L14NS_2021';
/*********************       PRODUCTION  *************************************************/
exports.TIPO_AMBIENTE = 'PRODUCTION';
exports.db = conexionesDb_1.DBPRODUCTION;
exports.URL_FRONTEND = 'https://www.caralianz.com/';
exports.URL_BACKEND = "https://caralianzproduction.herokuapp.com";
exports.TOKEN_MERCADO_PAGO = 'APP_USR-5456816792044426-022219-ff0cb3b7524f31d298a090d1e4e67cfe-718874770';
exports.TOKEN_CONEKTA = "key_1WmpniA0wJUgRAZAProYDeM"; //PRODUCTION
exports.s3 = new aws_sdk_1.default.S3({ accessKeyId: 'AKIAXFDDBKXOVSAYQAUO', secretAccessKey: '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' }); //BUCKET PRODUCTION
exports.NB_BUCKET = 'caralianz';
exports.bbc = ["adoc@caralianz.com"];
exports.admin = 'hola@caralianz.com';
/*********************    BETA  *************************************************/
/* export let TIPO_AMBIENTE = 'BETA';
export const db =   DBBETA;
export const URL_FRONTEND = 'http://portal-alfa.s3-website.us-east-2.amazonaws.com/';
export const URL_BACKEND = "https://caralianzbeta.herokuapp.com";
//export const URL_FRONTEND = 'http://localhost:4200/';
//export const URL_BACKEND = "http://localhost:3000";
export const TOKEN_MERCADO_PAGO = 'TEST-410551490508910-092101-75a54eab8dfb37948da4eef3da30aa01-827983198' //CAMBIA SEGUN EL USUARIO.. AHORITA ESTAMOS CON test_user_27108556@testuser.com
export const TOKEN_CONEKTA = "key_m8RVSF1cI31AizrJ0xKsu1p";
export const NB_BUCKET = 'beta-caralianz';
export const s3 = new AWS.S3({accessKeyId: 'AKIAXFDDBKXORR2EQ5VE',secretAccessKey: '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'}) //BUCKET BETA
export const bbc = [];
export const admin = 'oscar.huerta@caralianz.com';  */
/********************************    ALFA  *************************************************/
/*
 //
 export let TIPO_AMBIENTE = 'ALPHA';
export const db =   DBALPHA;
export const URL_FRONTEND = 'http://portal-alfa.s3-website.us-east-2.amazonaws.com/';
export const URL_BACKEND = "https://caralianzalfa.herokuapp.com";
//export const URL_FRONTEND = 'http://localhost:4200/';
//export const URL_BACKEND = "http://localhost:3000";
export const TOKEN_MERCADO_PAGO = 'TEST-410551490508910-092101-75a54eab8dfb37948da4eef3da30aa01-827983198' //CAMBIA SEGUN EL USUARIO.. AHORITA ESTAMOS CON test_user_27108556@testuser.com
export const TOKEN_CONEKTA = "key_m8RVSF1cI31AizrJ0xKsu1p"; //DESARROLLO
export const s3 = new AWS.S3({accessKeyId: 'AKIAXFDDBKXORR2EQ5VE',secretAccessKey: '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'}) //BUCKET BETA
export const NB_BUCKET = 'beta-caralianz' ;
export const bbc = [];
export const admin = 'oscar.huerta@caralianz.com';
*/
//# sourceMappingURL=config.js.map