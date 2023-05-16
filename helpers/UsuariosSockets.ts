export class UserSocket {
  public ID_USUARIO: string;
  public NB_USUARIO: string;
  public NB_APELLIDO_PATERNO: string;
  public NB_APELLIDO_MATERNO: string;
  public FE_NACIMIENTO: string;
  public URL_FOTO: string;
  public DS_EMAIL: string;
  public CL_USUARIO: string;
  public CL_RFC: string;
  public NO_TELEFONO_MOVIL: string;
  public NO_TELEFONO_EMPRESA: string;
  public ID_SOCKET: string;

  constructor() {
    this.ID_USUARIO = "";
    this.NB_USUARIO = "";
    this.NB_APELLIDO_PATERNO = "";
    this.NB_APELLIDO_MATERNO = "";
    this.FE_NACIMIENTO = "";
    this.URL_FOTO = "";
    this.DS_EMAIL = "";
    this.CL_USUARIO = "";
    this.CL_RFC = "";
    this.NO_TELEFONO_MOVIL = "";
    this.NO_TELEFONO_EMPRESA = "";
  }
}

export class UsuariosLista {
  private Usuarios: any[] = [];

  constructor() {
    this.Usuarios = [];
  }

  // Agregar un usuario
  public agregar(id_socket: string, usuario: UserSocket) {
    this.Usuarios.push({ id_socket, usuario });
    //    console.log( this.Usuarios );
    return usuario;
  }

  public actualizarUsuario(id_socket: string, usuario: UserSocket) {
    for (let u of this.Usuarios) {
      if (u.id_socket === id_socket) {
        u.usuario = usuario;
        break;
      }
    }

    //  console.log('===== Actualizando usuario ====');
    //    console.log( this.Usuarios );
  }

  // Obtener lista de usuarios
  public getLista() {
    return this.Usuarios;
  }

  // Obtener un usuario
  public getUsuario(id_socket: string) {
    return this.Usuarios.find((usuario) => usuario.id_socket === id_socket);
  }

  // Borrar Usuario
  public borrarUsuario(id_socket: string) {
    const tempUsuario = this.getUsuario(id_socket);

    this.Usuarios = this.Usuarios.filter(
      (usuario) => usuario.id_socket !== id_socket
    );

    //  console.log(this.Usuarios);

    return tempUsuario;
  }
}
