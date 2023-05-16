import CredencialesGoogle from '../enums/CredentialsGoogle';

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CredencialesGoogle.ID_CLIENTE);


class GoogleVerify{
    
    static async ObtenerInfoGoogle(idToken = ''):Promise<JSON>{
        const ticket = await client.verifyIdToken({
            idToken,
            audience: CredencialesGoogle.ID_CLIENTE,  
        });
       
        const payload = ticket.getPayload();
      
      return payload;
      
      }




 
}


export default GoogleVerify;