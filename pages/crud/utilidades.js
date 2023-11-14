export const verificarPermiso = (usuario, permiso) => {
  // Asegúrate de que el usuario esté definido y tenga la propiedad 'permisos'
  return usuario && usuario.permisos && usuario.permisos.includes(permiso);
};
