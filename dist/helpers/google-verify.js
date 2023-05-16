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
Object.defineProperty(exports, "__esModule", { value: true });
const CredentialsGoogle_1 = __importDefault(require("../enums/CredentialsGoogle"));
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CredentialsGoogle_1.default.ID_CLIENTE);
class GoogleVerify {
    static ObtenerInfoGoogle(idToken = '') {
        return __awaiter(this, void 0, void 0, function* () {
            const ticket = yield client.verifyIdToken({
                idToken,
                audience: CredentialsGoogle_1.default.ID_CLIENTE,
            });
            const payload = ticket.getPayload();
            return payload;
        });
    }
}
exports.default = GoogleVerify;
//# sourceMappingURL=google-verify.js.map