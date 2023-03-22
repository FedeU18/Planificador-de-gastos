import IconoNuevoGasto from "./assets/nuevo-gasto.svg";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import ListadoGastos from "./components/ListadoGastos";

function App() {
  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState([]);
  const [gastoEditar, setGastoEditar] = useState({});

  useEffect(() => {
    if (Object.keys(gastoEditar).length) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 200);
    }
  }, [gastoEditar]);

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
      />
      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
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
