import axios from "axios";

export const getCompromisosRequest = async () =>
  await axios.get("http://localhost:4000/compromisos");

export const createCompromisosRequest = async (props) =>
  await axios.post("http://localhost:4000/compromisos", props);

export const updateCompromisosRequest = async (id, props) =>
  await axios.put(`http://localhost:4000/compromisos/${id}`, props);

export const deleteCompromisosRequest = async (id) =>
  await axios.delete(`http://localhost:4000/compromisos/${id}`);
