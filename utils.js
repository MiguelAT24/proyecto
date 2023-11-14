// utils.js

export function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }
  
  export function decodeToken(token) {
    try {
      const decoded = decode(token);
      return decoded;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
  