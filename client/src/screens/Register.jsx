import { useState } from "react";
import { registerUser } from "../api/login.api";
import swal from "sweetalert";
import "../styles/register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitRegisterUserHandler = async (e) => {
    e.preventDefault();
    const rta = await registerUser({ username, password });
    const { code } = rta;
    console.log("CODIGO", code);

    if (code == 500) {
      swal("Usuario ya existe", {
        icon: "warning",
        buttons: ["OK!"],
        dangerMode: true,
      });
    }

    if (code == 200) {
      swal("Registro exitoso", {
        icon: "success",
        buttons: ["OK!"],
        dangerMode: true,
      });

      setTimeout(function () {
        window.location.href = "/";
      }, 2000);
    }
  };

  return (
    <div className="register-user">
      <div className="container-register">
        <div className="header-login">
          <h3>Registrar Usuario</h3>
        </div>
        <div className="form-register">
          <form>
            <input
              type="text"
              value={username}
              placeholder="Ingresa tu usuario"
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn-login" onClick={submitRegisterUserHandler}>
              Registrar
            </button>
          </form>
        </div>
        <div className="login-footer">
          <span>
            Ya tienes una cuenta <a href="/login">Inicia sesion</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
