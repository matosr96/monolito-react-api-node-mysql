import { useState } from "react";
import { IniciarSesion } from "../api/login.api";
import swal from "sweetalert";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  /*
  const sellProduct = (_id: string, currentstock: number): void => {
    if (sales == 0) {
      swal("Enter an amount", {
        icon: "warning",
        buttons: ["OK!"],
        dangerMode: true,
      });
    }

    if (Number(sales) > currentstock) {
      swal("Insufficient stock", {
        icon: "warning",
        buttons: ["OK!"],
        dangerMode: true,
      });
    }

    if (Number(sales) <= currentstock) {
      dispatch(productActions.updateStock({ _id, sales }) as any);
      setSales(0);
    }
  };
  */

  const Entrar = async (e) => {
    e.preventDefault();
    const rta = await IniciarSesion(username, password);
    const { code, message } = rta;
    console.log("CODIGO", message);

    if (code == 500) {
      swal(message, {
        icon: "warning",
        buttons: ["OK!"],
        dangerMode: true,
      });
    }

    if (code == 404) {
      swal(message, {
        icon: "warning",
        buttons: ["OK!"],
        dangerMode: true,
      });
    }

    if (code == 200) {
      window.location.href = "/home";
    }
  };

  return (
    <div className="login-screens">
      <div className="container-login">
        <div className="header-login">
          <h3>Login</h3>
        </div>
        <div className="form-login">
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

            <button className="btn-login" onClick={Entrar}>
              Acceder
            </button>
          </form>
        </div>
        <div className="login-footer">
          <span>
            No tienes una cuenta?, <a href="/register">Registrate aqui</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
