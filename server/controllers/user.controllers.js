import { pool } from "../db.js";

export const LoginUsuario = async (req, res) => {
  const { username, password } = req.body;
  const [result] = await pool.query("SELECT * FROM usuario");
  const user = result.filter((u) => {
    if (u.username === username) {
      return u;
    }
  });
  try {
    if (user.length < 1) {
      res.send({ code: 404, message: "usuario no existe" });
    } else if (user[0].password == password) {
      res.send({ code: 200, message: username });
      //res.status(200).json(username);
    } else {
      res.send({ code: 500, message: "Contraseña incorrecta" });
      //res.status(404).json({ message: "no pudo entrar", code: 500 });
    }
  } catch (error) {
    return res.send({ message: error.message });
  }
};

export const crearUsuario = async (req, res) => {
  const { username, password } = req.body;
  const [result] = await pool.query("SELECT * FROM usuario");
  const user = result.filter((u) => {
    if (u.username === username) {
      return u;
    }
  });
  try {
    if (user.length < 1) {
      const [result] = await pool.query(
        "INSERT INTO usuario(username, password) VALUES (?, ?)",
        [username, password]
      );
      res.send({ code: 200, id: result.insertId, username, password });
    } else {
      res.send({ code: 500, message: "usuario ya existe" });
    }
  } catch (error) {
    return res.send({ message: error.message });
  }

  /*
  const users = result.map((user) => user.username);
  const respuesta = users.some((nombre) => nombre === username);
  try {
    if (!respuesta) {
      const [result] = await pool.query(
        "INSERT INTO usuario(username, password) VALUES (?, ?)",
        [username, password]
      );
      res.send({
        id: result.insertId,
        username,
        password,
        code: 200,
      });
    } else {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  */
};
