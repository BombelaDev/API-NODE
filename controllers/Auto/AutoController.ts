import { Request, Response } from "express";
import { db, NB_BUCKET, bbc, URL_BACKEND, URL_FRONTEND, admin } from "../../config/config";
import * as bcrypt from "bcrypt";
import Genericos from '../../helpers/Genericos';
import jwt from "jsonwebtoken";
import { SEND_NOTIFICATIONS } from '../../enums/enums';
import UsuarioModel from '../../models/c_usuario';
import Correo from '../../helpers/Correos';
import TemplateCorreo from '../../enums/enums';
import ConceptoModel from '../../models/s_concepto';
import GoogleVerify from '../../helpers/google-verify';
import { EditarPerfilEnum } from '../../enums/EditarPerfilEnum';
import kUsuarioDireccionModel from '../../models/k_usuario_direccion';
import ErrorClass from '../../helpers/ErrorsValidate';
import kVehiculoBuscadorModel from "../../models/k_vehiculo_buscador";

class AutoController
{


    static index = async (req: Request, res: Response) => {
        try {
            let vehiculos  = await kVehiculoBuscadorModel.findAll({
                offset: 0,
            });

            return res.status(200).json({
                message: 'ok',
                autos : vehiculos,
            });

        } catch (error) {
            ErrorClass.HttpError(error, res, 500);
        }
    }

    
}

export default AutoController;