// configuracion-permisos.js

export const permisosToOpciones = {
  'Gestión de Ventas': {
    permisos: ['realizar venta', 'reservar pasaje'],
    subopciones: {
      'realizar venta ': '/crud/ventas/create',
      'reservar pasaje': '/opcion3/subopcion2',
    },
  },
  'Gestión de Buses': {
    permisos: ['agregar-bus', 'ver buses', 'asignar bus'],
    subopciones: {
      'agregar bus': '/crud/bus/create',
      'ver buses': '/crud/bus/read',
      'asignar bus': '/crud/bus/asignar',
    },
  },
  'Gestión de Rutas': {
    permisos: ['agregar ruta', 'ver rutas'],
    subopciones: {
      'agregar ruta': '/crud/rutas/create',
      'ver rutas': '/crud/rutas/read',
    },
  },
  'Programación de Viajes': {
    permisos: ['agregar viaje', 'ver viajes'],
    subopciones: {
      'agregar viaje': '/crud/viaje/create',
      'ver viajes': '/crud/viaje/read',
    },
  },
  'Gestión de Personal': {
    permisos: ['agregar personal', 'perfiles', 'permisos'],
    subopciones: {
      'agregar rersonal': '/crud/personal/create',
      'perfiles': '/crud/personal/rol',
      'permisos': '/crud/personal/permisos',
    },
  },
  'Reportes y Estadísticas': {
    permisos: ['generar reportes', 'ver estadisticas'],
    subopciones: {
      'generar reportes': '/reportes/reporte',
      'ver estadísticas': '/reportes/estadistica',
    },
  },
 
};
