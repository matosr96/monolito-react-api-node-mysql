import axios from "axios";

export const IniciarSesion = async (username, password) => {
  try {
    const rta = await axios.post("http://localhost:4000/login", {
      username,
      password,
    });
    console.log("action", rta);
    return rta.data;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const registerUser = async (props) => {
  try {
    const rta = await axios.post("http://localhost:4000/registrar", props);
    return rta.data;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
