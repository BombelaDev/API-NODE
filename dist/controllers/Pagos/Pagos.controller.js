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
const config_1 = require("../../config/config");
const ErrorsValidate_1 = __importDefault(require("../../helpers/ErrorsValidate"));
const Notifications_1 = __importDefault(require("../../helpers/Notifications"));
let conekta = require("conekta");
conekta.api_key = config_1.TOKEN_CONEKTA;
conekta.locale = "es";
conekta.api_version = "2.0.0";
const QueryPago = "CALL CA_REGISTRA_PAGO_CITA_PROCESO(?,?,?,?,?,?)";
//const QueryRegistraPagoCarinspector = "CALL CA_REGISTRA_PAGO_CARINSPECTOR(?,?,?,?,?,?)";
//const QueryRegistraPagoGarantia = "CALL CA_REGISTRA_PAGO_CARINSPECTOR_GARANTIA(?,?,?,?,?,?)";
class PagosController {
}
_a = PagosController;
PagosController.PagoConektaTarjeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { Token, NO_MESES, PRECIO_PRODUCTO, REFERENCIA, NB_USUARIO, DS_PRODUCTO, DS_EMAIL, NO_TELEFONO, } = req.body;
        let OrderObject = {
            currency: "MXN",
            customer_info: {
                name: NB_USUARIO,
                phone: NO_TELEFONO,
                email: DS_EMAIL,
            },
            line_items: [
                {
                    name: DS_PRODUCTO,
                    unit_price: PRECIO_PRODUCTO * 100,
                    quantity: 1,
                },
            ],
            metadata: {
                CL_REFERENCIA: REFERENCIA,
                DS_PRODUCTO,
                TYPE: "creditcard",
            },
            charges: [
                {
                    payment_method: NO_MESES == 1
                        ? {
                            type: "card",
                            token_id: Token,
                        }
                        : {
                            monthly_installments: NO_MESES,
                            type: "card",
                            token_id: Token,
                        },
                },
            ],
        };
        const CreateOrder = yield conekta.Order.create(OrderObject);
        const Response = yield CreateOrder.toObject();
        if (Response.payment_status == "paid") {
            let replacements = [
                REFERENCIA,
                Response.id,
                Response.updated_at,
                Response.id,
                Response.created_at,
                "creditcard",
            ];
            let respuesta = yield config_1.db.query(QueryPago, { replacements });
            const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, POUT_ID_LEAD, POUT_DS_EMAIL, POUT_TELEFONO_MOVIL, } = respuesta[0];
            if (DS_PRODUCTO == "CARINSPECTOR") {
                const Notification = yield Notifications_1.default.SendNotification("PAGO_CARINSPECTOR", POUT_ID_LEAD);
                if (!Notification) {
                    return res.status(400).json({
                        success: false,
                        message: "Ocurrio un problema al enviar notificaciones.",
                    });
                }
            }
            return res.status(200).json({
                success: false,
                message: "Pago efectuado correctamente",
            });
        }
        return res.status(401).json({
            success: false,
            message: "Ocurrio un problema al realizar tu pago.",
        });
    }
    catch (error) {
        if (error.http_code) {
            return res.status(error.http_code).json({
                success: false,
                message: ((_b = error.details[0]) === null || _b === void 0 ? void 0 : _b.message) ||
                    "Ocurrio un error con tu forma de pago",
            });
        }
        ErrorsValidate_1.default.HttpError(error, res, 500);
    }
});
PagosController.RealizarPagoOxxo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { email, nombre_usuario, telefono_usuario, referencia, Precio, producto, POUT_ID_LEAD } = req.body;
        let OrderObject = {
            currency: "MXN",
            customer_info: {
                name: nombre_usuario,
                phone: telefono_usuario,
                email: email,
            },
            line_items: [
                {
                    name: producto,
                    unit_price: Precio * 100,
                    quantity: 1,
                },
            ],
            metadata: {
                CL_REFERENCIA: referencia,
                producto,
                email,
                TYPE: "oxxo",
            },
            charges: [
                {
                    payment_method: {
                        type: "oxxo_cash",
                        //  expires_at: 1631854740,
                    },
                },
            ],
        };
        const CreateOrder = yield conekta.Order.create(OrderObject);
        const Response = yield CreateOrder.toObject();
        const { barcode_url, reference } = Response.charges.data[0].payment_method;
        yield config_1.db.query("CALL CA_ACTUALIZA_METODO_OXXO(?,?)", { replacements: [referencia, reference] });
        const Notification = yield Notifications_1.default.SendNotification("REF_OXXO", POUT_ID_LEAD);
        //  await db.query("CALL CA_AUMENTA_TIEMPO_EFECTIVO_CITA_PROCESO(?)", { replacements: [referencia] });
        //  await sms.enviarTicketSms(telefono_usuario,reference, nombre_usuario);
        // await Correo.EnviarCorreo("Ticket de pago",email,[TemplateCorreo.EMAIL_TICKET_OXXO,0,reference,barcode_url,Precio],[]);
        return res.status(200).json({
            success: true,
            reference,
            barcode_url,
        });
    }
    catch (error) {
        if (error.http_code) {
            return res.status(error.http_code).json({
                success: false,
                message: ((_c = error.details[0]) === null || _c === void 0 ? void 0 : _c.message) ||
                    "Ocurrio un error con tu forma de pago",
            });
        }
        ErrorsValidate_1.default.HttpError(error, res, 500);
        return res.status(500).json({
            success: false,
            message: "Ocurrio un error intente mas tarde",
        });
    }
});
PagosController.WebHookConekta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var data = typeof req.body == "string" ? JSON.parse(req.body) : req.body;
        if (data.type != "order.paid") {
            return res.sendStatus(200);
        }
        else if (data.type == "order.paid") {
            console.log(data.data);
            console.log("**********************************************");
            //PAGO EN EFECTIVO
            if (data.data.object.metadata.TYPE == "oxxo") {
                let replacements = [
                    data.data.object.metadata.CL_REFERENCIA,
                    data.data.object.id,
                    data.data.object.updated_at,
                    data.data.object.id,
                    data.data.object.created_at,
                    "oxxo",
                ];
                if (data.data.object.metadata.producto == "CARINSPECTOR") {
                    let respuesta = yield config_1.db.query(QueryPago, { replacements });
                    const { POUT_CL_RESPUESTA, POUT_DS_RESPUESTA, POUT_ID_LEAD, POUT_DS_EMAIL, POUT_TELEFONO_MOVIL, } = respuesta[0];
                    const Notification = yield Notifications_1.default.SendNotification("PAGO_CARINSPECTOR", POUT_ID_LEAD);
                    return res.sendStatus(200);
                }
                else {
                    console.log("WEBHOOK CPAGOOOOOOOOOOOOOO GARANTIAAAAAAAAAAAAAAAAAAAAAAA");
                    //   await SatusMercadoPago.PAGOCORRECTOGARANTIA(query2, res, replacements);
                    return res.sendStatus(200);
                }
            }
            console.log("NO ENCONTRÉ  NADA QUE PAGAR");
            return res.sendStatus(200);
        }
    }
    catch (error) {
        console.log("ERROOOOOOOOOOR");
        console.log(error);
        return res.status(500).json({
            error,
        });
    }
});
exports.default = PagosController;
//# sourceMappingURL=Pagos.controller.js.map