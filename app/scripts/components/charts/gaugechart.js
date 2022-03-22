import React, { useEffect, useState } from 'react';
// import GaugeChart from 'react-gauge-chart'
import ReactSpeedometer from "react-d3-speedometer"
import { createSemanticDiagnosticsBuilderProgram } from 'typescript';
import { variables } from '../../base/variables';


const VeloChart = () => {
    let dataFirst = []
    let maxNum = []
    let minNum = []
    let percent = []
    let colors = []
    let dataPercent = []

    const [categoria, setCategoria] = useState("");
    // const [color, setColor] = useState("");
    const [data, setData] = useState("");
    const [dataMin, setDataMin] = useState("");
    const [dataMax, setDataMax] = useState("");
    const [dataPerc, setDataPerc] = useState("");

    variables.changeGaugeChartData = function (nivel, dpto, data) {

        setCategoria(variables.tematica["CATEGORIAS"][variables.varVariable][0]["CATEGORIA"])
        // setColor(variables.tematica["COLOR"][variables.varVariable][0]["CATEGORIA"])

        let valor = 0;

        if (variables.dataArrayDatos[variables.varVariable.substring(0, 5)] != undefined) {
            // console.log(variables.dataArrayDatos[variables.varVariable.substring(0, 5)])
            // var integrado = Object.values(variables.dataArrayDatos[variables.varVariable.substring(0, 5)][nivel]).map(function (a, b) {
            var integrado = Object.values(variables.dataArrayDatos[variables.varVariable.substring(0, 5)][nivel]).filter((o) => (o.ND) != "00").map(function (a, b) {
                let valor = parseFloat(a[variables.alias])
                if (valor != undefined && !isNaN(valor)) {
                    return valor;
                } else {
                    return 0
                }
            }, {});

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

        let maxN = integrado.reduce((prev, current) => {
            return Math.max(prev, current)
        });
        maxNum = parseFloat(maxN.toFixed(2));
        // maxNum = parseFloat(parseFloat(maxN).toFixed(2)).toLocaleString("de-De");
        // console.log(maxNum);

        let minN = integrado.reduce((prev, current) => {
            return Math.min(prev, current)
        });
        minNum = parseFloat(minN.toFixed(2));
        // minNum = parseFloat(parseFloat(minN).toFixed(2)).toLocaleString("de-De");
        // console.log(minNum);

        percent = valor.toFixed(2);

        setData(dataFirst)
        setDataPerc(percent)
        setDataMax(maxNum)
        setDataMin(minNum)
        // setColor(colorD)
    }

    useEffect(() => {
        variables.changeGaugeChartData('DPTO', '00');
    }, [])

    return (
        <div className="charts">
            <h2 className="charts__subtitle" id="title">{categoria} </h2>
            {/* <h2 className="charts__subtitle" id="title">{data} </h2> */}
            <ReactSpeedometer className="charts__item"
                // width={300}
                height={200}
                forceRender={true}
                minValue={parseFloat(dataMin)}
                maxValue={parseFloat(dataMax)}
                value={parseFloat(dataPerc)}
                needleColor="red"
                startColor="green"
                segments={5}
                endColor="blue"
                textColor="grey"
                textColor="#3D3D3D"
                currentValueText={'Valor: ${value}'}
            />
            <ul className="charts__values">
                {/* <li className="charts__valuesTitle">
                    <p className="charts__valuesMin">{dataMin}</p>
                    <p className="charts__valuesText">Valor min</p>
                </li> */}
                <li className="charts__valuesTitle">
                    <p className="charts__valuesMin">Colombia {categoria}: {dataMax}</p>
                    {/* <p className="charts__valuesText">{dataMax}</p> */}
                </li>
            </ul>
        </div>
    );
};

export default VeloChart;