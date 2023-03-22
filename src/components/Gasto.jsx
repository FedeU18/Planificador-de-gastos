import React from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";

import { formatearFecha } from "../helpers";

import icono_ahorro from "../assets/icono_ahorro.svg";
import icono_casa from "../assets/icono_casa.svg";
import icono_comida from "../assets/icono_comida.svg";
import icono_gastos from "../assets/icono_gastos.svg";
import icono_ocio from "../assets/icono_ocio.svg";
import icono_salud from "../assets/icono_salud.svg";
import icono_suscripciones from "../assets/icono_suscripciones.svg";

const diccionarioIconos = {
  ahorro: icono_ahorro,
  casa: icono_casa,
  comida: icono_comida,
  gastos: icono_gastos,
  ocio: icono_ocio,
  salud: icono_salud,
  suscripciones: icono_suscripciones,
};

const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction
        onClick={() => {
          setGastoEditar(gasto);
        }}
      >
        Editar
      </SwipeAction>
    </LeadingActions>
  );
  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction
        onClick={() => {
          eliminarGasto(gasto.id);
        }}
        destructive={true}
      >
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="gasto sombra">
          <div className="contenido-gasto">
            <img
              src={diccionarioIconos[gasto.categoria]}
              alt={gasto.categoria}
            />
            <div className="descripcion-gasto">
              <p className="categoria">{gasto.categoria}</p>
              <p className="nombre-gasto">{gasto.nombre}</p>
              <p className="fecha-gasto">
                Agregado el : <span>{formatearFecha(gasto.fecha)}</span>
              </p>
            </div>
          </div>
          <p className="cantidad-gasto">${gasto.cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
};

export default Gasto;
