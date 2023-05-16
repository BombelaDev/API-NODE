import jwt from "jsonwebtoken";
import { db } from "../config/config";
import CavModel from "../models/c_cav";
import UsuarioModel from "../models/c_usuario";
import kVehiculoPortalModel from "../models/k_vehiculo_portal";


class Consultas{
 
    static ObtenerNombreCav = async (ID_CAV:string) =>{
        const cav:any = await CavModel.findOne({where: {ID_CAV,}});
        return cav.NB_CAV;
     }

     static ObtenerNombreVehiculo = async (ID_VEHICULO:string) =>{
        const auto:any = await kVehiculoPortalModel.findOne({where: {ID_VEHICULO,}});
        
        
        return auto.NB_MARCA + ' '+ auto.NB_MODELO + ' '+ auto.NO_ANIO;
     }

     static ObtenerDatosUsuario = async (ID_USUARIO:string) =>{
        const usuario:any = await UsuarioModel.findOne({where: {ID_USUARIO:ID_USUARIO,}});

        return usuario;
     }
   


}
export default Consultas;