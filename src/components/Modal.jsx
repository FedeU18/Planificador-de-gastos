import { useState, useEffect } from "react";
import cerrarBtn from "../assets/cerrar.svg";
import Mensaje from "./Mensaje";

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarGasto,
  gastoEditar,
  setGastoEditar,
}) => {
  const [gasto, setGasto] = useState({
    nombre: "",
    cantidad: "",
    categoria: "",
    id: "",
    fecha: "",
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (Object.keys(gastoEditar).length) {
      setGasto({
        nombre: gastoEditar.nombre,
        cantidad: gastoEditar.cantidad,
        categoria: gastoEditar.categoria,
        id: gastoEditar.id,
        fecha: gastoEditar.fecha,
      });
    }
  }, [gastoEditar]);

  const ocultarModal = () => {
    setAnimarModal(false);
    setGastoEditar({});
    setTimeout(() => {
      setModal(false);
    }, 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([gasto.nombre, gasto.cantidad, gasto.categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
    }

    setTimeout(() => {
      setMensaje("");
    }, 3000);
    guardarGasto(gasto);
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img src={cerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
      </div>
      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? "animar" : "cerrar"}`}
      >
        <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
        {mensaje && <Mensaje tipo={"error"}>{mensaje}</Mensaje>}
        <div className="campo">
          <label htmlFor="nombre">Nombre del gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade Nombre Gasto"
            value={gasto.nombre}
            onChange={(e) => setGasto({ ...gasto, nombre: e.target.value })}
          />
        </div>{" "}
        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade Nombre GastoAñade la cantidad del gasto: ej. 300"
            value={gasto.cantidad}
            onChange={(e) =>
              setGasto({ ...gasto, cantidad: Number(e.target.value) })
            }
          />
        </div>
        <div className="campo">
          <label htmlFor="categoria">Categoría</label>
          <select
            id="categoria"
            value={gasto.categoria}
            onChange={(e) => setGasto({ ...gasto, categoria: e.target.value })}
          >
            <option value="">-- Seleccione una categoría --</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="gastos">Gastos Varios</option>
            <option value="hogar">Hogar</option>
            <option value="ocio">Ocio</option>
            <option value="Salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input type="submit" value={"Añadir Gasto"} />
      </form>
    </div>
  );
};

export default Modal;
