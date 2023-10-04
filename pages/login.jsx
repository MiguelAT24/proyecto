import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router"; // Cambio de next/navigation a next/router para evitar errores
import '/styles/sidebar.css';

function Home() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", credentials);

      if (res.status === 200) {
        router.push("/Dashboard");
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
      } else {
        setErrorMessage("Ocurrió un error inesperado. Por favor, inténtalo más tarde.");
      }
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundImage: `url('/../img/image.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        
      }}
    >
       <div
        className="card"
        style={{
          background: "rgba(255, 255, 255, 0.8)", // Fondo semi-transparente
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)", // Sombra
        }}
      >
        <div className="card-body">
          <h1 className="text-center py-3">INICIAR SESION</h1>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-person"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Usuario"
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      username: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-lock"></i>
                </span>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      password: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="text-center">
              <button className="btn btn-primary" type="submit">
                Iniciar Sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
