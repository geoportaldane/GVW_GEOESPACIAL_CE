import React, { useState, useEffect } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { variables } from '../../base/variables';

const BarHData = () => {
  let labelsData = []
  let dataFirst = []

  const [categoria, setCategoria] = useState("");
  const [data, setData] = useState("");

  variables.changeBarChartData = function (nivel, dpto) {

    setCategoria(variables.tematica["CATEGORIAS"][variables.varVariable][0]["CATEGORIA"])

    let valor = 0;

    if (variables.dataArrayDatos[variables.varVariable.substring(0, 5)] != undefined) {
      if (nivel === "DPTO") {
        const dataNivel = Object.values(variables.dataArrayDatos[variables.varVariable.substring(0, 5)][nivel]).filter((v) => {
          return v.ND === dpto;
        }, [])

        valor = parseFloat(dataNivel[0][variables.alias])
        dataFirst = parseFloat(parseFloat(valor).toFixed(2)).toLocaleString("de-De");

      } else if (nivel === "MPIO") {
        const dataNivel = Object.values(variables.dataArrayDatos[variables.varVariable.substring(0, 5)][nivel]).filter((v) => {
          return v.MPIO === dpto;
        }, [])
        valor = parseFloat(dataNivel[0][variables.alias])
        dataFirst = parseFloat(parseFloat(valor).toFixed(2)).toLocaleString("de-De");
      }
    }
    // console.log(valor, "valor")

    setData(dataFirst)
    // console.log(labelsData, dataFirst, "datos")
  }

  useEffect(() => {
    variables.changeBarChartData('DPTO', '00');
  }, [])

  return (
    <div className="charts">
      <h2 className="charts__subtitle" id="title">{categoria}</h2>
      <p className="charts__item">{data}</p>
    </div>
  );
}

export default BarHData;


