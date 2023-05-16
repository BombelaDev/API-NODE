enum smsEnums {
  MENSAJE_POSIBLE_VENTA_CARALIANZ = "Hola, una persona está interesada en vender su vehículo, el folio de la solicitud es [FOLIO], revisa tu correo electrónico para más información.",
  MENSAJE_INICIO_CARINSPECTOR = "Caralianz: Tu reservación está vigente por 15 minutos. Selecciona tu método de pago para confirmar tu cita. Gracias por confiar en nosotros",
  MENSAJE_CONFIRMACION_PAGO_CARINSPECTOR = "Caralianz: Hemos recibido tu pago para tu cita. Tu cita ha quedado confirmada. Revisa por favor tu correo electrónico para más información.",

  MENSAJE_CONFIRMACION_PAGO_CARINSPECTOR_CUPON = "Caralianz: Cupón de descuento aplicado correctamente. Tu cita  CARINSPECTOR ha quedado confirmada. Revisa por favor tu correo electrónico para más información. Sandra de Caralianz.",

  MENSAJE_RECORDATORIO_CARINSPECTOR = "Caralianz: Te recordamos que tu Cita Carinspector es hoy. Revisa tu correo electrónico para ver los detalles de tu cita. Nos vemos pronto, Sandra de Caralianz.",
  MENSAJE_REAGENDA_CITA = "Caralianz: Has cambiado con éxito la fecha de tu Cita Carinspector Nos vemos pronto,",
  MENSAJE_NUEVA_CITA_CARINSPECTOR_GERENTE_SERVICIO = "Caralianz: Hola, tienes una nueva cita Carinspector confirmada por un usuario. Por favor accede a tu correo electrónico o portal y asigna un Asesor de Servicio. Gracias y excelente día.",
  MENSAJE_NUEVA_CITA_CARINSPECTOR_GERENTE_COMERCIAL = "Caralianz: Hola, tienes una nueva cita Carinspector confirmada por un usuario. Por favor accede a tu correo electrónico o portal y asigna un Asesor Comercial. Gracias y excelente día.",
  MENSAJE_REAGENDA_CITA_GERENTE_SERVICIOS = "Caralianz: Hola, hubo un cambio en la fecha de una cita Carinspector. Por favor, entra a tu correo electrónico o tu portal para revisar los cambios, y en su caso, asignar un nuevo Agente de Servicio. Gracias y excelente día. Rocío de Caralianz.",
  MENSAJE_REAGENDA_CITA_GERENTE_COMERCIAL = "Caralianz: Hola, hubo un cambio en la fecha de una cita Carinspector. Por favor, entra a tu correo electrónico o tu portal para revisar los cambios, y en su caso, asignar un nuevo Agente Comercial Gracias y excelente día. Rocío de Caralianz.",
  MSG_REAGENDA_CITA_ASESOR_COMERCIAL = "Caralianz: Hola, se canceló una cita Carinspector que tienes asignada. Por favor, entra a tu correo electrónico para identificarla y puedas retirarla de tu agenda. Gracias y excelente día. Rocío de Caralianz.",
  MSG_REAGENDA_CITA_ASESOR_SERVICIO = "Caralianz: Hola, se canceló una cita Carinspector que tienes asignada. Por favor, entra a tu correo electrónico para identificarla y puedas retirarla de tu agenda.     Gracias y excelente día.     Rocío de Caralianz.",
}

export const SmsCitaComercial = {
  SMS_ESPERA_CONFIRMACION:
    "Hola se ha agendado tu cita para ver el auto [NB_VEHICULO] que te gusto, ahora solo queda esperar la confirmación del vendedor. Muchas gracias. Sandra de caralianz",
  SMS_INTERASADOS_COMPRA_CARALIANZ:
    "Hola, te notificamos que existe un usuario interesado en comprar el auto [NB_VEHICULO]",

  SMS_VT_01:
    "Hola vendedor. Hemos enviado un correo electrónico a tu cuenta registrada con la solicitud de un usuario comprador para ver tu vehículo, [NB_VEHICULO]. Atentamente Victoria de caralianz.",
  SMS_VT_02:
    "Hola [NB_COMPRADOR], el Usuario [NB_VENDEDOR], del vehículo [NB_VEHICULO] ha aceptado tu cita para ver el vehículo, recuerda ser puntual a la cita. Atentamente Victoria de Caralianz.",
  SMS_VT_03:
    "Hola [NB_COMPRADOR], el Usuario [NB_VENDEDOR], del vehículo [NB_VEHICULO] nos ha indicado que no le es posible atender ese día y hora la cita. Es probable que recibas propuesta de 3 fechas y horas para que puedas elegir la que más te convenga, estar atento a tu bandeja de correo Atentamente Victoria de caralianz.",
  SMS_VT_04:
    "Hola [NB_COMPRADOR], el Usuario [NB_VENDEDOR],  del vehículo [NB_VEHICULO] nos ha indicado que ya no cuenta con el vehículo que te gusto, te ofrecemos una disculpa. Pero tenemos más opciones que te podrían gustar.Atentamente Victoria de caralianz.",
  SMS_VT_05:
    "Hola [NB_VENDEDOR] muchas gracias por habernos avisado que ya no cuentas con tu vehículo [NB_VEHICULO], por este motivo hemos dado de baja el vehículo de tu perfil. Si tu no haz sido quien ha ejecutado esta instrucción por favor manda un correo a Hola@caralianz.com. Atentamente Victoria de caralianz",
  SMS_VT_05A:
    "Hola [NB_VENDEDOR] Agradecemos nos hayas informado que decidiste quedarte con tu auto. Hemos retirado ya la publicación en nuestro sitio web. Atentamente Victoria de caralianz",
  SMS_VT_06:
    "Hola [NB_VENDEDOR] Hemos enviado tu(s) propuesta(s) de cita para ver tu vehículo [NB_VEHICULO] al usuario [NB_COMPRADOR]. Atentamente Victoria de caralianz",
  SMS_VT_07:
    "Hola, Te hemos enviado un correo con la(s) propuesta(s) de cita para ver el auto [NB_VEHICULO]. Atentamente Victoria de caralianz ",
};

export default smsEnums;
