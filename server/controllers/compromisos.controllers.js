import { pool } from "../db.js";

export const getCompromisos = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM compromisos");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCompromisos = async (req, res) => {
  try {
    const { description, responsable, fecha_finalizacion } = req.body;
    const [result] = await pool.query(
      "INSERT INTO compromisos(description, responsable, fecha_finalizacion) VALUES (?, ?, ?)",
      [description, responsable, fecha_finalizacion]
    );
    res.json({
      id: result.insertId,
      description,
      responsable,
      fecha_finalizacion,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCompromisos = async (req, res) => {
  try {
    const result = await pool.query("UPDATE compromisos SET ? WHERE id_compromiso = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCompromisos = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM compromisos WHERE id_compromiso = ?", [
      req.params.id,
    ]);
    {
      result.affectedRows === 0
        ? res.status(404).json({ message: "compromiso no encontrada" })
        : res.sendStatus(204);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/*






*/
