import { useEffect, useState } from "react";
import {
  createActasRequest,
  deleteActaRequest,
  getActasRequest,
  updateActasRequest,
} from "../api/actas.api";
import "../styles/homepage.css";

const Homepage = () => {
  const [actas, setActas] = useState([]);

  // Proceso de creacion del acta
  const [openModal, setOpenModal] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [asunto, setAsunto] = useState("");
  const [fecha, setFecha] = useState("");
  const [responsable, setResponsable] = useState("");
  const [id_programa, setIdPrograma] = useState("");

  const submitCreateHandler = (e) => {
    e.preventDefault();
    createActasRequest({
      asunto,
      descripcion,
      responsable,
      fecha,
      id_programa,
    });
    setOpenModal(false);
    window.location.reload();
  };

  // Proceso de Actualizacion del acta
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [descripcionUpdate, setDescripcionUpdate] = useState("");
  const [asuntoUpdate, setAsuntoUpdate] = useState("");
  const [fechaUpdate, setFechaUpdate] = useState("");
  const [responsableUpdate, setResponsableUpdate] = useState("");
  const [id_programaUpdate, setIdProgramaUpdate] = useState("");
  const [id_acta, setIdActa] = useState();

  const updateHandler = (id, desc, asu, fec, res, pro) => {
    setIdActa(id);
    setDescripcionUpdate(desc);
    setAsuntoUpdate(asu);
    setFechaUpdate(fec);
    setResponsableUpdate(res);
    setIdProgramaUpdate(pro);
  };

  const submitUpdateHandler = (e) => {
    e.preventDefault();
    setOpenModalUpdate(!openModalUpdate);
    updateActasRequest(id_acta, {
      asunto: asuntoUpdate,
      descripcion: descripcionUpdate,
      responsable: responsableUpdate,
      fecha: fechaUpdate,
      id_programa: id_programaUpdate,
    });
    window.location.reload();
  };

  //proceso de eliminar
  const deleteHandler = (id) => {
    deleteActaRequest(id);
    window.location.reload();
  };

  useEffect(() => {
    async function loadActas() {
      const response = await getActasRequest();
      const { data } = response;
      setActas(data);
    }

    loadActas();
  }, []);

  console.log(actas);
  return (
    <>
      <div className="homepage">
        <div className="container-homepage">
          <div className="header-homepage">
            <h2>TABLA DE ACTAS</h2>
            <button
              className="button-addactas"
              onClick={() => setOpenModal(!openModal)}
            >
              Crear Actas
            </button>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Asunto</th>
                  <th className="desc">Descripcion</th>
                  <th>Responsable</th>
                  <th>Fecha</th>
                  <th>Id programa</th>
                  <th>Compromiso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {actas?.map((e) => (
                  <tr key={e.id}>
                    <td>{e.id}</td>
                    <td>{e.asunto}</td>
                    <td className="desc">{e.descripcion}</td>
                    <td>{e.responsable}</td>
                    <td>{e.fecha}</td>
                    <td>{e.id_programa}</td>
                    <td>
                      <a href="/compromisos">Ver comprimiso</a>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-actions edit"
                          onClick={() => {
                            updateHandler(
                              e.id,
                              e.asunto,
                              e.descripcion,
                              e.responsable,
                              e.fecha,
                              e.id_programa
                            );
                            setOpenModalUpdate(!openModalUpdate);
                          }}
                        >
                          <i className="bx bx-edit"></i>
                        </button>
                        <button
                          className="btn-actions trash"
                          onClick={() => deleteHandler(e.id)}
                        >
                          <i className="bx bx-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={openModal ? "openModal" : "closeModal"}>
        <div className="modal">
          <div className="modal_header">
            <h2 className="titlemodal">Crear Acta</h2>
            <button
              className="modal-close"
              onClick={() => setOpenModal(!openModal)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>

          <form action="" className="form_items">
            <div className="input">
              <label htmlFor="">Asunto</label>
              <input
                type="text"
                placeholder=""
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Descripcion</label>
              <input
                type="text"
                placeholder=""
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Responsable</label>
              <input
                type="text"
                placeholder=""
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Fecha</label>
              <input
                type="text"
                placeholder=""
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            <div className="input-select-expense">
              <select onChange={(e) => setIdPrograma(e.target.value)}>
                <option value="#">Elige un Programa</option>
                <option value={1}>Informatica</option>
                <option value={2}>Ing software</option>
                <option value={3}>Bacteriologia</option>
                <option value={4}>Matematicas</option>
              </select>
            </div>
          </form>
          <div className="modal_footer">
            <button className="btn" onClick={submitCreateHandler}>
              <h2>Guardar</h2>
            </button>
          </div>
        </div>
      </div>

      <div className={openModalUpdate ? "openModal" : "closeModal"}>
        <div className="modal">
          <div className="modal_header">
            <h2 className="titlemodal">Editar Acta</h2>
            <button
              className="modal-close"
              onClick={() => setOpenModalUpdate(!openModalUpdate)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>

          <form action="" className="form_items">
            <div className="input">
              <label htmlFor="">Asunto</label>
              <input
                type="text"
                placeholder=""
                value={asuntoUpdate}
                onChange={(e) => setAsuntoUpdate(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Descripcion</label>
              <input
                type="text"
                placeholder=""
                value={descripcionUpdate}
                onChange={(e) => setDescripcionUpdate(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Responsable</label>
              <input
                type="text"
                placeholder=""
                value={responsableUpdate}
                onChange={(e) => setResponsableUpdate(e.target.value)}
              />
            </div>

            <div className="input">
              <label htmlFor="">Fecha</label>
              <input
                type="text"
                placeholder=""
                value={fechaUpdate}
                onChange={(e) => setFechaUpdate(e.target.value)}
              />
            </div>

            <div className="input-select-expense">
              <select onChange={(e) => setIdProgramaUpdate(e.target.value)}>
                <option value="#">Elige un Programa</option>
                <option value={1}>Informatica</option>
                <option value={2}>Ing software</option>
                <option value={3}>Bacteriologia</option>
                <option value={4}>Matematicas</option>
              </select>
            </div>
          </form>
          <div className="modal_footer">
            <button className="btn" onClick={submitUpdateHandler}>
              <h2>Guardar</h2>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
