import { pool } from "../db.js";

export const getActas = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM actas");
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createActas = async (req, res) => {
  try {
    const { asunto, descripcion, responsable, fecha, id_programa } = req.body;
    const [result] = await pool.query(
      "INSERT INTO actas(asunto, descripcion, responsable, fecha, id_programa) VALUES (?, ?, ?, ?, ?)",
      [asunto, descripcion, responsable, fecha, id_programa]
    );
    res.json({
      id: result.insertId,
      asunto,
      descripcion,
      responsable,
      fecha,
      id_programa,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateActas = async (req, res) => {
    try {
      const result = await pool.query("UPDATE actas SET ? WHERE id = ?", [
        req.body,
        req.params.id,
      ]);
      res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  export const deleteActas = async (req, res) => {
    try {
      const [result] = await pool.query("DELETE FROM actas WHERE id = ?", [
        req.params.id,
      ]);
      {
        result.affectedRows === 0
          ? res.status(404).json({ message: "Acta no encontrada" })
          : res.sendStatus(204);
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
