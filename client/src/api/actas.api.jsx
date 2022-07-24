import axios from "axios";

export const getActasRequest = async () =>
  await axios.get("http://localhost:4000/actas");

export const createActasRequest = async (props) =>
  await axios.post("http://localhost:4000/actas", props);

export const updateActasRequest = async (id, props) =>
  await axios.put(`http://localhost:4000/actas/${id}`, props);

export const deleteActaRequest = async (id) =>
  await axios.delete(`http://localhost:4000/actas/${id}`);
