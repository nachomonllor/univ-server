module.exports = {
  COMMON_ERROR: {
    error: true,
    message: 'Error',
  },
  DELETE_IMAGE_ERROR: {
    ok: false,
    error: true,
    message: 'Error al eliminar la imagen.',
  },
  RECORD_NOT_FOUND_ERROR: {
    ok: false,
    error: true,
    message: 'El registro no existe.',
  },
  DELETE_RECORD_ERROR: {
    ok: false,
    error: true,
    message: 'Error al eliminar el registro',
  },
  RECORD_DELETED: {
    message: 'El registro ha sido eliminado.',
  },
  RECORD_IN_USE_ERROR: {
    error: true,
    message: 'El registro no puede ser eliminado por que ya está en uso, solo puede desactivarlo',
  },
  DELETE_IMAGE_SUCCESS: {
    ok: true,
    msg: 'La foto ha sido eliminada',
  },
  DB_CONNECTION_ERROR: {
    error: true,
    message: 'Problemas al intentar conectarse a la base de datos',
  },
  UPDATE_RECORD_ERROR: {
    ok: false,
    error: true,
    message: 'Error al actualizar el registro.',
  },
  UPLOAD_IMAGE_SUCCESS: {
    ok: true,
    msg: 'La foto ha sido guardada',
  },
  BL_PROCESSED: {
    ok: true,
    error: false,
    message: 'Los EDI Docs fueron procesados correctamente y el modelo intermedio fue informado',
  },
  BL_PROCESSED_TRANSLATED: {
    ok: true,
    error: false,
    message: 'Los EDI Docs y las traducciones fueron procesadas correctamente',
  },
  BL_PROCESSED_NOT_TRANSLATED: {
    ok: true,
    error: false,
    message: 'Los EDI Docs fueron procesadas, pero las traducciones no fueron procesadas correctamente',
  },
  BL_PROCESSED_NOT_INFORMED: {
    ok: false,
    error: false,
    message: 'Los EDI Docs fueron procesados correctamente pero el modelo intermedio no fue informado',
  },
  BL_ERRORS: {
    ok: false,
    error: true,
    message: 'Los EDI Docs no fueron procesados correctamente',
  },
  BL_NO_DATA: {
    ok: false,
    error: true,
    from: 'ediTemp',
    message: 'Los EDI Docs no fueron procesados ya que no se pudo obtener información correctamente de la fuente',
  },
  BOOKING_PROCESSED: {
    ok: true,
    error: false,
    message: 'Los EDI Bookings fueron procesados correctamente y el modelo intermedio fue informado',
  },
  BOOKING_PROCESSED_NOT_INFORMED: {
    ok: false,
    error: false,
    message: 'Los EDI Bookings fueron procesados correctamente pero el modelo intermedio no fue informado',
  },
  BOOKING_ERRORS: {
    ok: false,
    error: true,
    message: 'Los EDI Bookings no fueron procesados correctamente',
  },
  BOOKING_NO_DATA: {
    ok: false,
    error: true,
    from: 'ediTemp',
    message: 'Los EDI Bookings no fueron procesados ya que no se pudo obtener información correctamente de la fuente',
  },
};
