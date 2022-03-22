import React, { useState, useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { variables } from '../../base/variables';

const DonutChart = () => {
  let labelsData = []
  let colors = []
  let dataFirst = []

  // console.log(variables.state)
  const [data, setData] = useState(variables.state);
  const [subgrupo, setSubgrupo] = useState("");
  const tipoVariable = variables.tematica["CATEGORIAS"][variables.varVariable][0]["TIPO_VARIABLE"];

  variables.changeDonuChartData = function (nivel, dpto, data) {
    // console.log("NIVEL", nivel)
    // console.log("DEPTO", dpto)
    // console.log("DATA", data)

    labelsData = [];

    setSubgrupo(variables.tematica["SUBGRUPOS"][variables.varVariable.substring(0, 5)][0]["SUBGRUPO"])
    
    Object.keys(variables.tematica["CATEGORIAS"]).filter(o => o.substring(0, 5) == variables.varVariable.substring(0, 5)).map(function (a, b) {
      
      labelsData.push(variables.tematica["CATEGORIAS"][a][0]["CATEGORIA"]);
      colors.push('rgb' + variables.tematica["CATEGORIAS"][a][0]["COLOR"]);

      let dataNivel;

      if (data !== undefined) {
        dataNivel = Object.values(data);
      } else {
        if (nivel === "MPIO") {
          dataNivel = Object.values(variables.dataArrayDatos[variables.varVariable.substring(0, 5)][nivel]).filter((v) => {
            return v.MPIO === dpto;
          }, [])
        } else if (nivel === "DPTO") {
          dataNivel = Object.values(variables.dataArrayDatos[variables.varVariable.substring(0, 5)][nivel]).filter((v) => {
            return v.ND === dpto;
          });
        } else if (nivel === "MNZN") {
          dataNivel = Object.values(variables.dataArrayDatos[variables.varVariable.substring(0, 5)][nivel][variables.deptoConsulta]).filter((v) => {
            return v.NM === dpto;
          })
        } else if (nivel === "MNZN2") {
          dataNivel = Object.values(variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["MNZN"][dpto]).filter((v) => {
            return v.NM.substring(0,2) === dpto;
          })
        }
      }

      let contador = dataNivel.length;
      let porcentaje = "PP" + b;

      let groupBy;


      if (data !== undefined) {
        let idx = 0;
        let suma = 0;

        dataNivel.forEach((dn) => {
          suma = suma + dn;
        })

        dataFirst = []

        groupBy = dataNivel.reduce((objectsByKeyValue, obj) => {
          let porc = (obj / suma) * 100;
          objectsByKeyValue["PP" + idx] = porc;
          dataFirst.push(parseFloat(porc).toFixed(2));
          idx = idx + 1;
          return objectsByKeyValue;
        }, {});
      } else {
        groupBy = dataNivel.reduce((objectsByKeyValue, obj) => {
          const value = obj[porcentaje];
          objectsByKeyValue[porcentaje] = (objectsByKeyValue[porcentaje] || 0) + parseFloat(value);

          return objectsByKeyValue;
        }, {});

        dataFirst.push(parseFloat(groupBy[porcentaje] / contador).toFixed(2));
      }
    }, {})

    let dataP = {
      labels: labelsData,
      datasets: [
        {
          label: 'Total',
          // labels: myLabels,
          backgroundColor: colors,
          data: dataFirst
        }
      ]
    }

    // console.log(variables.state)

    setData(dataP)
    // setData(variables.state)
  }

  useEffect(() => {
    if(tipoVariable === "DC"){
      variables.changeDonuChartData('MNZN', variables.municipioConsulta, variables.data_dc);
    }else{
      variables.changeDonuChartData('DPTO', '00');
    }
    
    // variables.changePieChartData('MPIO');
  }, [])



  return (
    <div className="charts">
      <h2 className="charts__subtitle" id="title">{subgrupo}</h2>
      <Doughnut
        data={data}
        width={180}
        options={{
          legend: {
            position: 'bottom',
            align: 'start',
            fullWidth: true,
            labels: {
              boxWidth: 20,
              fontColor: 'black',
              fontSize: 14
            }
          }
        }}
      />
    </div>
  );
}

export default DonutChart;

