import IconoNuevoGasto from "./assets/nuevo-gasto.svg";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos")
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );
  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState("");

  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(gastoEditar).length) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 200);
    }
  }, [gastoEditar]);

  useEffect(() => {
    if (filtro) {
      const filtrarGastos = gastos.filter(
        (gasto) => gasto.categoria === filtro
      );
      setGastosFiltrados(filtrarGastos);
    }
  }, [filtro]);

  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []);
  }, [gastos]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto"));
    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true);
    }
  }, []);

  const guardarGasto = (gasto) => {
    if (gasto.id) {
      //Editar Gasto
      const gastosEditados = gastos.map((gastoState) =>
        gasto.id === gastoState.id ? gasto : gastoState
      );
      setGastoEditar({});
      setGastos(gastosEditados);
    } else {
      //Nuevo Gasto
      setGastos([...gastos, { ...gasto, id: generarId(), fecha: Date.now() }]);
    }

    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
    }, 400);
  };

  const handleNuevoGasto = () => {
    setGastoEditar({});
    setModal(true);
    setTimeout(() => {
      setAnimarModal(true);
    }, 200);
  };

  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(
      (gastoState) => gastoState.id !== id
    );

    setGastos(gastosActualizados);
  };
  return (
    <div className={modal ? "fijar" : ""}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros filtro={filtro} setFiltro={setFiltro} />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              gastosFiltrados={gastosFiltrados}
              filtro={filtro}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono para nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}
      {modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;
