import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getActasRequest } from "../api/actas.api";
import {
  createCompromisosRequest,
  deleteCompromisosRequest,
  getCompromisosRequest,
  updateCompromisosRequest,
} from "../api/compromisos.api";
import "../styles/compromisos.css";
import TimeAgo from "timeago-react";
import { TimeFormat } from "../utils/TimeFormat";

const Compromiso = () => {
  // Traer el responsable desde la base de datos
  const [actas, setActas] = useState([]);
  const respon = actas.map((acta) => acta.responsable);

  //Traer compromisos existentes en base de datos
  const [compromisos, setCompromisos] = useState([]);

  // Proceso de creacion del compromiso
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState("");
  const [responsable, setResponsable] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");

  const submitCreateHandler = (e) => {
    e.preventDefault();
    createCompromisosRequest({
      description: description,
      responsable: responsable,
      fecha_finalizacion: fechaFinal,
    });
    setOpenModal(false);
    window.location.reload();
  };

  // Proceso de Actualizacion del compromiso
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [updateDescription, setUpdateDescription] = useState("");
  const [updateResponsable, setUpdateResponsable] = useState("");
  const [updateFechaFinal, setUpdateFechaFinal] = useState("");
  const [id_compromiso, setId_compromiso] = useState();

  console.log(id_compromiso);

  const updateHandler = (id, desc, res, fe) => {
    setId_compromiso(id);
    setUpdateDescription(desc);
    setUpdateResponsable(res);
    setUpdateFechaFinal(fe);
  };

  const submitUpdateHandler = (e) => {
    e.preventDefault();
    setOpenModalUpdate(!openModalUpdate);
    updateCompromisosRequest(id_compromiso, {
      description: updateDescription,
      responsable: updateResponsable,
      fecha_finalizacion: updateFechaFinal,
    });
    window.location.reload();
  };

  //proceso de eliminar
  const deleteHandler = (id) => {
    deleteCompromisosRequest(id);
    window.location.reload();
  };

  // el codigo del useffect es lo primero que se ejecuta al iniciar
  useEffect(() => {
    async function loadActas() {
      const response = await getActasRequest();
      const { data } = response;
      setActas(data);
    }

    async function loadCompromisos() {
      const rta = await getCompromisosRequest();
      const { data } = rta;
      setCompromisos(data);
    }

    loadCompromisos();

    loadActas();
  }, []);

  console.log("aqui", compromisos);
  return (
    <>
      <div className="homepage">
        <div className="container-homepage">
          <div className="header-homepage">
            <h2>TABLA DE COMPROMISOS</h2>
            <div className="grupo">
              <a href="/home" className="return">
                <i className="bx bx-left-arrow-alt"></i>
                <h3>Volver a inicio</h3>
              </a>

              <button
                className="button-addactas"
                onClick={() => setOpenModal(!openModal)}
              >
                Crear Compromiso
              </button>
            </div>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th className="desc">Descripcion</th>
                  <th>Fecha Inicial</th>
                  <th>Fecha Finalización</th>
                  <th>Responsable</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {compromisos?.map((e) => (
                  <tr key={e.id_compromiso}>
                    <td>{e.id_compromiso}</td>
                    <td className="desc">{e.description}</td>
                    <td>{TimeFormat(e.createAt)}</td>
                    <td>{e.fecha_finalizacion}</td>
                    <td>{e.responsable}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="btn-actions edit"
                          onClick={() => {
                            updateHandler(
                              e.id_compromiso,
                              e.description,
                              e.responsable,
                              e.fecha_finalizacion
                            );
                            setOpenModalUpdate(!openModalUpdate);
                          }}
                        >
                          <i className="bx bx-edit"></i>
                        </button>
                        <button
                          className="btn-actions trash"
                          onClick={() => deleteHandler(e.id_compromiso)}
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
            <h2 className="titlemodal">Crear Compromiso</h2>
            <button
              className="modal-close"
              onClick={() => setOpenModal(!openModal)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>

          <form action="" className="form_items">
            <div className="input">
              <label htmlFor="">Descripcion</label>
              <input
                type="text"
                placeholder=""
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="input-select">
              <select onChange={(e) => setResponsable(e.target.value)}>
                <option value="#">Responsable</option>
                {respon.map((res) => (
                  <option value={res}>{res}</option>
                ))}
              </select>
            </div>

            <div className="input">
              <label htmlFor="">Fecha final</label>
              <input
                type="text"
                placeholder="yyyy-mm-aa"
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)}
              />
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
            <h2 className="titlemodal">Actualizar Compromiso</h2>
            <button
              className="modal-close"
              onClick={() => setOpenModalUpdate(!openModalUpdate)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>

          <form action="" className="form_items">
            <div className="input">
              <label htmlFor="">Descripcion</label>
              <input
                type="text"
                placeholder=""
                value={updateDescription}
                onChange={(e) => setUpdateDescription(e.target.value)}
              />
            </div>

            <div className="input-select">
              <select onChange={(e) => setUpdateResponsable(e.target.value)}>
                <option value="#">Responsable</option>
                {respon.map((res) => (
                  <option value={res}>{res}</option>
                ))}
              </select>
            </div>

            <div className="input">
              <label htmlFor="">Fecha final</label>
              <input
                type="text"
                placeholder="yyyy-mm-aa"
                value={updateFechaFinal}
                onChange={(e) => setUpdateFechaFinal(e.target.value)}
              />
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

export default Compromiso;
