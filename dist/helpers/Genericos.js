"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
class Genericos {
    static GenerarPassword() {
        let letras = "1234567890ABCDFGHIJKLMNOPQRSTUVWXYZabcdfghijklmnopqrstuvwxyz";
        let nuevaPassword = letras[Math.floor(Math.random() * letras.length)];
        for (let i = 0; i < 8; i++) {
            nuevaPassword = nuevaPassword + letras[Math.floor(Math.random() * letras.length)];
        }
        return nuevaPassword;
    }
    static generarJWT(id_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const payload = {
                    id_usuario
                };
                jsonwebtoken_1.default.sign(payload, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN }, (err, token) => {
                    if (err) {
                        console.log(err);
                        reject('No se pudo generar el JWT ');
                    }
                    else {
                        resolve(token);
                    }
                });
            });
        });
    }
}
_a = Genericos;
Genericos.RenuevaJWT = (id_usuario) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id_usuario
        };
        jsonwebtoken_1.default.sign(payload, process.env.SEED_TOKEN, { expiresIn: process.env.CADUCIDAD_TOKEN }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el JWT ');
            }
            else {
                resolve(token);
            }
        });
    });
};
Genericos.comprobarJWT = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (token.length < 10) {
            return null;
        }
        const uid = jsonwebtoken_1.default.verify(token, process.env.SEED_TOKEN);
        const query = "CALL CA_OBTIENE_USUARIO_CARALIANZ_X_ID(?)";
        const replacements = [uid.id_usuario];
        let respuesta = yield config_1.db.query(query, { replacements });
        const USUARIO = respuesta[0];
        if (USUARIO) {
            return USUARIO;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error);
        console.log("vineeeeeeeeeeeeeeeeeee");
        return null;
    }
});
Genericos.generarJWTGenerico = (id, caducidad) => {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
        };
        jsonwebtoken_1.default.sign(payload, "SED_GENERIC", { expiresIn: caducidad }, (err, token) => {
            if (err) {
                reject('No se pudo generar el JWT ');
            }
            else {
                resolve(token);
            }
        });
    });
};
Genericos.comprobarJWTGenerico = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (token.length < 10) {
            return null;
        }
        const uid = jsonwebtoken_1.default.verify(token, "SED_GENERIC");
        return uid;
    }
    catch (error) {
        return null;
    }
});
exports.default = Genericos;
//# sourceMappingURL=Genericos.js.map