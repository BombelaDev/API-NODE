"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Responses {
    static send(res, req, codeStatus, error, message) {
        return res.status(codeStatus).json({
            error,
            message
        });
    }
}
exports.default = Responses;
//# sourceMappingURL=responses.js.map