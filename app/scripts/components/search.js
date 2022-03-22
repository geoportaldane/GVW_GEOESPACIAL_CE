import React, { useState, useEffect } from "react";
import axios from "axios";
import municipios from '../../json/mpio-extent.json'
import departamentos from '../../json/dpto-extent.json'
import centros from '../../json/centros_poblados-extent.json'
import clases from '../../json/clase-extent.json'
import { boundingExtent } from 'ol/extent';
import { transformExtent } from 'ol/proj';
import { variables } from '../base/variables';
import Accordion from './thematicFilter/subgroup';
import AccordionItem from './thematicFilter/category';
import NavButton from './thematicFilter/group';
import chroma from 'chroma-js';
import { scaleLinear } from "d3-scale";
import { Fragment } from "react";
import Dialogo from "./dialogo";

function bboxExtent(bbox) {
    bbox = bbox.replace('BOX(', '').replace(')', '')
    bbox = bbox.split(",")
    let bbox1 = bbox[0].split(" ")
    let bbox2 = bbox[1].split(" ")
    var ext = boundingExtent([[bbox1[0], bbox1[1]], [bbox2[0], bbox2[1]]]);
    ext = transformExtent(ext, 'EPSG:4326', 'EPSG:3857');
    variables.map.getView().fit(ext, variables.map.getSize());
}

function groupByFunct(array, key) {
    const groupBy = array.reduce((objectsByKeyValue, obj) => {
        const value = obj[key];
        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
        return objectsByKeyValue;
    }, {});
    return groupBy
}
// funcion para obtener gamma de colores 
function getColorArray(categoria) {
    var color = ["#1D3A6C", "#2D68AC", "#00699F", "#0088BC", "#44A8E0", "#4599C2", "#70B5D8", "#7AB2E1", "#9CCAED", "#B6D8F0"];
    var colorPrincipal = variables.tematica["CATEGORIAS"][categoria][0]['COLOR'];

    colorPrincipal = colorPrincipal.replace("(", "").replace(")", "");
    colorPrincipal = colorPrincipal.split(",");

    var colorMedium = chroma(colorPrincipal).get('hsl.l');
    var arrayColores = []
    var scaleUp = scaleLinear();
    var scaleDown = scaleLinear();

    // c(colorMedium)
    if (colorMedium > 1) {
        scaleDown.domain([0, 4]).range([1, colorMedium]);
        scaleUp.domain([0, 4]).range([colorMedium, 100]);
        arrayColores = [1, 0, 0, 0, colorMedium, 0, 0, 0, 100]
    }
    else {
        scaleDown.domain([0, 4]).range([0.15, colorMedium]);
        scaleUp.domain([0, 4]).range([colorMedium, 0.90]);
    }
    arrayColores = [scaleDown(0), scaleDown(1), scaleDown(2), scaleDown(3), colorMedium, scaleUp(1), scaleUp(2), scaleUp(3), scaleUp(4)];

    // c(arrayColores)
    color = [chroma(colorPrincipal).set('hsl.l', arrayColores[0]).hex(), chroma(colorPrincipal).set('hsl.l', arrayColores[1]).hex(), chroma(colorPrincipal).set('hsl.l', arrayColores[2]).hex(), chroma(colorPrincipal).set('hsl.l', arrayColores[3]).hex(), chroma(colorPrincipal).hex(), chroma(colorPrincipal).set('hsl.l', arrayColores[5]).hex(), chroma(colorPrincipal).set('hsl.l', arrayColores[6]).hex(), chroma(colorPrincipal).set('hsl.l', arrayColores[7]).hex(), chroma(colorPrincipal).set('hsl.l', arrayColores[8]).hex()];
    return color;
}
const Search = ({ filterSearch, placeholder }) => {
    const [term, setTerm] = useState("");
    const [termDos, setTermDos] = useState("");
    const [btn, setBtn] = useState("264");
    const [tematica, setTematica] = useState(variables.tematica);
    const [btnDos, setBtnDos] = useState(variables.varVariable);
    const [visualList, setVisualList] = useState(true); //Estado para determinar el "ver más"
    const [openDialogo, setOpenDialogo] = useState(false);
    

    variables.visualGroup = function (valor) {
        setVisualList(valor);
    }


    variables.changeTheme = function (nivel, dpto, campo, table) {
        const tipoVariable = variables.tematica["CATEGORIAS"][variables.varVariable][0]["TIPO_VARIABLE"];
        console.log(tipoVariable, "tipo de variable")
        if (nivel == "MNZN") {
            if (variables.dataArrayDatos[variables.varVariable.substring(0, 5)][nivel][dpto] != undefined) {
                variables.changeMap(nivel, dpto);
                console.log("TIPO VARIABLE", tipoVariable)
                if(tipoVariable !== "DC" ){
                    if(variables.changeDonuChartData != null){
                        variables.changeDonuChartData("MNZN2",variables.deptoConsulta)
                      }  
                      if(variables.changePieChartData != null){
                        variables.changePieChartData("MNZN2",variables.deptoConsulta)
                      }
                }
            } else {
                variables.dataArrayDatos[variables.varVariable.substring(0, 5)][nivel][dpto] = {};

                let urlData = variables.urlVariables + "?codigo_subgrupo=" + variables.varVariable.substring(0, 5) + "&nivel_geografico=" + nivel
                    + "&filtro_geografico=" + dpto
                if (campo != undefined) {
                    urlData += "&campo=" + campo
                }

                axios({ method: "GET", url: urlData })
                    .then(function (response) {
                        variables.dataArrayDatos[variables.varVariable.substring(0, 5)][nivel][dpto] = response.data.resultado
                        variables.queryText[variables.varVariable.substring(0, 5)] = response.data.consulta
                        variables.changeMap(nivel, dpto);
                    });
            }
            // }

        } else {
            if (Object.values(variables.dataArrayDatos[variables.varVariable.substring(0, 5)][nivel]).length > 0) {
                variables.changeMap(nivel, dpto, table);
                if (nivel == "DPTO") {
                    if (variables.changeBarChartData != null) {
                        variables.changeBarChartData(nivel, '00');
                        if (variables.deptoVariable != undefined) {
                            variables.changeBarChartData(nivel, variables.deptoVariable);
                        }
                    }
                    if (variables.changeGaugeChartData != null) {
                        variables.changeGaugeChartData(nivel, '00');
                        if (variables.deptoVariable != undefined) {
                            variables.changeGaugeChartData(nivel, variables.deptoVariable);
                        }
                    }
                }
            }
            else {
                let urlData = variables.urlVariables + "?codigo_subgrupo=" + variables.varVariable.substring(0, 5) + "&nivel_geografico=" + nivel
                if (campo != undefined) {
                    urlData += "&campo=" + campo
                }
                axios({ method: "GET", url: urlData })
                    .then(function (response) {
                        variables.dataArrayDatos[variables.varVariable.substring(0, 5)][nivel] = response.data.resultado
                        variables.queryText[variables.varVariable.substring(0, 5)] = response.data.consulta
                        variables.changeMap(nivel, dpto, table);

                        if (variables.deptoSelected == undefined && variables.deptoVariable != undefined) {
                            variables.filterGeo("DPTO", variables.deptoVariable)
                        }

                        if (nivel == "DPTO") {
                            if (variables.changePieChartData != null) {
                                variables.changePieChartData(nivel, '00');
                                if (variables.deptoVariable != undefined) {
                                    variables.deptoVariable(nivel, variables.deptoVariable);
                                }
                            }

                            if (variables.changeDonuChartData != null) {
                                variables.changeDonuChartData(nivel, '00');
                                if (variables.deptoVariable != undefined) {
                                    variables.changeDonuChartData(nivel, variables.deptoVariable);
                                }
                            }

                            if (variables.changeBarChartData != null) {
                                variables.changeBarChartData(nivel, '00');
                                if (variables.deptoVariable != undefined) {
                                    variables.changeBarChartData(nivel, variables.deptoVariable);
                                }
                            }
                            if (variables.changeGaugeChartData != null) {
                                variables.changeGaugeChartData(nivel, '00');
                                if (variables.deptoVariable != undefined) {
                                    variables.changeGaugeChartData(nivel, variables.deptoVariable);
                                }
                            }
                        } else if (nivel == "MPIO") {
                            // console.log(variables.deptoVariable)
                            // if (variables.changeBarChartData != null) {
                            //     variables.changeBarChartData("DPTO",variables.deptoVariable);
                            // }
                            // if (variables.changePieChartData != null) {
                            //     variables.changePieChartData("DPTO",variables.deptoVariable);
                            // }
                            // // console.log(variables.changeDonuChartData);
                            // if (variables.changeDonuChartData != null) {
                            //     variables.changeDonuChartData("DPTO",variables.deptoVariable);
                            // }
                        }
                    });
            }
        }


    }
    useEffect(() => {
        const consultaAPI = async () => {

            if (Object.keys(variables.tematica).length == 0 || Object.keys(variables.dataRangos).length == 0 || Object.keys(variables.coloresLeyend).length == 0) {
                const consulta = await axios({ method: "GET", url: variables.urlTemas + "?codigo=" + variables.codVisor });
                const consultaDos = await axios({ method: "GET", url: variables.urlTemas + "?codigo=" + variables.codVisor + "&sub_temas=yes" });
                const consultaTres = await axios({ method: "GET", url: variables.urlTemas + "?codigo=" + variables.codVisor + "&variables=yes" });
                // const consultaCuatro = await axios({ method: "GET", url: "https://geoportal.dane.gov.co/laboratorio/serviciosjson/visores/clasificacion1.php" });


                const consultaUnoFin = groupByFunct(consulta.data, "COD_GRUPO")
                const consultaDosFin = groupByFunct(consultaDos.data, "COD_SUBGRUPO")
                const consultaTresFin = groupByFunct(consultaTres.data, "COD_CATEGORIA")
                // const consultaCuatroFin = (consultaCuatro.data.resultado).filter(result => (Object.keys(consultaTresFin).indexOf((result.COD_CATEGORIA)) != -1))
                // variables.dataRangos = groupByFunct(consultaCuatroFin, "COD_CATEGORIA")

                Object.keys(consultaDosFin).map((subgrupo) => {
                    variables.dataArrayDatos[subgrupo] = {
                        ["DPTO"]: {},
                        ["MNZN"]: {},
                        ["MPIO"]: {}
                    }
                }, [])
                variables.tematica = {
                    "GRUPOS": consultaUnoFin,
                    "SUBGRUPOS": consultaDosFin,
                    "TEMAS": consultaTres.data,
                    "CATEGORIAS": consultaTresFin
                }
                localStorage.setItem('tematica', JSON.stringify(variables.tematica))
                localStorage.setItem('rangos', JSON.stringify(variables.dataRangos))

                Object.keys(variables.tematica["CATEGORIAS"]).map((datos) => {
                    let punto = 0;
                    // console.log("DOMINIOS RANGE",datos)
                    if ((variables.dataRangos)[datos] != undefined) {
                        let dominiosRange = groupByFunct((variables.dataRangos)[datos], "NIVEL_GEOGRAFICO");


                        variables.coloresLeyend[datos] = {
                            ["MPIO"]: [],
                            ["DPTO"]: [],
                            ["MNZN"]: [],
                        }
                    } else {
                        variables.coloresLeyend[datos] = {
                            ["MPIO"]: [],
                            ["DPTO"]: [],
                            ["MNZN"]: [],
                            ["CAMPOS"]: []
                        }
                    }

                    let colores = getColorArray(datos);

                    (colores).map(function (num, index, arr) {

                        if (index % 2 == 0) {
                            // console.log(punto, "Punto")
                            if (punto === 0) {
                                (variables.coloresLeyend[datos]["DPTO"]).push([arr[index], 'rgba(' + (chroma(arr[index]).rgba()).toString() + ')', + " "]);
                                (variables.coloresLeyend[datos]["MPIO"]).push([arr[index], 'rgba(' + (chroma(arr[index]).rgba()).toString() + ')', + " "]);
                                (variables.coloresLeyend[datos]["MNZN"]).push([arr[index], 'rgba(' + (chroma(arr[index]).rgba()).toString() + ')', + " "]);
                            } else {
                                if (punto === 4) {
                                    (variables.coloresLeyend[datos]["DPTO"]).push([arr[index], 'rgba(' + (chroma(arr[index]).rgba()).toString() + ')', + " "]);
                                    (variables.coloresLeyend[datos]["MPIO"]).push([arr[index], 'rgba(' + (chroma(arr[index]).rgba()).toString() + ')', + " "]);
                                    (variables.coloresLeyend[datos]["MNZN"]).push([arr[index], 'rgba(' + (chroma(arr[index]).rgba()).toString() + ')', + " "]);
                                }
                            }
                        }
                    }, []);
                    // variables.colorMedio = variables.coloresLeyend[datos]["MNZN"][2][0];
                }, [])
                localStorage.setItem('leyenda', JSON.stringify(variables.coloresLeyend));

            } else {
                if (Object.keys(variables.dataArrayDatos).length === 0) {
                    Object.keys(variables.tematica["SUBGRUPOS"]).map((subgrupo) => {
                        variables.dataArrayDatos[subgrupo] = {
                            ["DPTO"]: {},
                            ["MPIO"]: {},
                            ["MNZN"]: {},
                        }
                    }, [])
                }
            }
            setTematica(variables.tematica);

            // console.log(variables.dataArrayDatos[variables.varVariable.substring(0, 5)])

            if (Object.keys(variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"]).length === 0) {
                // console.log("DPTO")
                // console.log(variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"])
                // variables.changeTheme("MNZN", '08', "NM", "n");
                // handleFirstZoom();
                variables.changeTheme("DPTO", 0, "ND", "y");
                // variables.changeTheme("MPIO",0);
                // variables.changeLegend();
                variables.legenTheme();
            }

            // if (Object.keys(variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["MNZN"]).length === 0) {
            //     // console.log("DPTO")
            //     // console.log(variables.dataArrayDatos[variables.varVariable.substring(0, 5)]["DPTO"])
            //     // variables.changeTheme("MNZN", '08', "NM", "n");
            //     handleFirstZoom();
            //     // variables.changeTheme("DPTO", 0, "ND", "y");
            //     // variables.changeTheme("MPIO",0);
            //     // variables.changeLegend();
            //     variables.legenTheme();
            // }
        };

        // console.log(filterSearch);
        consultaAPI();
        // if (!filterSearch) {
        //     consultaAPI();
        // }
    }, []);

    // Primer zoom a ciudad capital de forma aleatoria
    const handleFirstZoom = () => {
        const ciudadSeleccionada = variables.municipioConsulta === null ?
            variables.listaCapitales[Math.floor(Math.random() * variables.listaCapitales.length)] :
            variables.municipioConsulta.substring(0, 2);

        // variables.listaCapitales[Math.floor(Math.random() * variables.listaCapitales.length)];
        variables.changeTheme("MNZN", ciudadSeleccionada.substring(0, 2), "NM", "n");
        const ciudadSelObjeto = (municipios).filter((m) => m.cod_dane === ciudadSeleccionada);
        variables.deptoConsulta = ciudadSelObjeto[0].cod_dane.substring(0, 2);
        // console.log("MCIPIO CONSULTA", variables.municipioConsulta)
        if (variables.municipioConsulta === null) {
            const deptoCiudad = (departamentos).filter((d) => d.cod_dane === ciudadSeleccionada.substring(0, 2));
            const clase = (clases).filter((c) => c.cod_dane === ciudadSelObjeto[0].cod_dane + "1")
            variables.municipioConsulta = ciudadSelObjeto[0].cod_dane;
            variables.loadUE(ciudadSelObjeto[0].cod_dane);
            bboxExtent(clase[0].bextent);
            if (variables.changeDepto != null) {
                // variables.changeDepto("Departamento de " + deptoCiudad[0].name + ", Municipio de " + ciudadSelObjeto[0].name);
                variables.changeDepto(deptoCiudad[0].name + "-" + ciudadSelObjeto[0].name);
            }
        }

    }

    function handleClick(extent) {
        bboxExtent(extent)
        if (filterSearch) {
            setTerm("")
        }
    }

    const handleChange = event => {
        if (!filterSearch) {
            setTermDos(event)
        } else {
            setTerm(event)
        }
    };

    const handleChangeBtn = event => {
        setBtn(event.currentTarget.id)
        variables.visualThematic(null);
    };

    const handleChangeBtnDos = event => {

        event.stopPropagation();
        event.preventDefault();
        setBtnDos(event.currentTarget.id)
        variables.varVariable = event.currentTarget.id;
        const filtroGeografico = variables.tematica["CATEGORIAS"][variables.varVariable][0]["FILTRO_GEOGRAFICO"];

        // variables.changeTheme("MNZN",variables.deptoConsulta,"NM","n");
        let zoom = variables.map.getView().getZoom();

        // variables.changeTheme("MPIO");
        // variables.changeTheme("DPTO", 0, "ND");

        // if (zoom >= 7 && zoom <= 19) {
        //     // variables.changeTheme("MPIO", null, null, "y");

        //     if (variables.deptoSelected == undefined && variables.deptoVariable != undefined) {
        //         variables.filterGeo("DPTO", variables.deptoVariable)
        //         // variables.changeTheme("DPTO", 0, "ND", "n");
        //     }
        // }
        if (zoom < 7) {
            variables.changeTheme("DPTO", 0, "ND", "y");
        } else if (zoom >= 7 && zoom <= 11) {
            variables.changeTheme("MPIO", null, null, "y");

            if (variables.deptoSelected == undefined && variables.deptoVariable != undefined) {
                variables.filterGeo("DPTO", variables.deptoVariable)
                // variables.changeTheme("DPTO", 0, "ND", "n");
            }
        } else if (zoom > 11) {
            variables.changeTheme("MNZN", variables.deptoConsulta, "NM", "n");
            // variables.changeTheme("MNZN2", variables.deptoConsulta, "NM", "n");
        }

        if (filtroGeografico === "MZ") {
            handleFirstZoom();
        } else if (filtroGeografico === "D,M") {
            if (zoom > 11) {
                setOpenDialogo(true);
            }
        }
        // variables.changeTheme("MPIO");
        // variables.map.getView().setZoom(6);
        // variables.changeTheme("DPTO", 0, "ND", "y");
        variables.baseMapCheck = "Gris";
    };

    const cerrarDialogo = () => {
        setOpenDialogo(false)
    }

    const results = municipios.concat(departamentos, centros);
    const searchResultsMapped = results.filter(result => ((result.name).toLowerCase()).includes(term.toLowerCase()) && term.length >= 3).map(filteredResult => {
        return (
            <li className="search__list__item" id="25" key={filteredResult.cod_dane} onClick={() => handleClick(filteredResult.bextent)}>
                <p className="search__list__item__text">
                    <span className="search__list__item__code">{filteredResult.cod_dane}</span>  -  {filteredResult.name} -
                    <span className="search__list__item__type">{filteredResult.ref}</span>
                </p>
            </li>
        )
    });

    const liTemas = (subgrupo) => {
        return (
            (tematica.TEMAS)
                .filter(result => ((result.COD_SUBGRUPO) == subgrupo))
                .map((filteredResult, index) => {
                    if (filteredResult.TIPO_VARIABLE === "DC" && filteredResult.VALOR_DOMINIO === "2") {

                    } else {
                        if (((filteredResult.CATEGORIA).toLowerCase()).indexOf(termDos.toLowerCase()) != "-1") {
                            return (
                                <AccordionItem categoria={filteredResult} index={index} click={handleChangeBtnDos} btn={btnDos} key={index} />
                            )
                        }
                    }
                })
        );
    }

    const temas = Object.values(tematica.SUBGRUPOS).filter(result => (btn.length === 0) ? true : (result[0].COD_GRUPO == btn) ? true : false)
        .map((item, index) => {
            return (
                <Accordion tematica={tematica} item={item} index={index} liTemas={liTemas(item[0].COD_SUBGRUPO)} key={index} />
            )
        });
    return (
        <Fragment>
            <Dialogo open={openDialogo} cerrarDialogo={cerrarDialogo} />
            {!filterSearch && <NavButton temaTematica={tematica} click={handleChangeBtn} btn={btn} />}
            {visualList && <div className="searchBox">
                <div className="search">
                    <input
                        className="search__input"
                        placeholder={placeholder}
                        value={filterSearch ? term : termDos}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    <button className="search__btn" aria-label="Justify" id="search__btn__element">
                        <span className="DANE__Geovisor__icon__search"></span>
                    </button>
                    <div className="search__erase"></div>
                    <p className="search__errorMessage">Lo sentimos, no encontramos nada relacionado.</p>
                    {filterSearch && <ul className="search__list">{searchResultsMapped}</ul>}
                </div>
                {!filterSearch && <div className="filter__thematic">
                    <ul className="filter__thematic__list">
                        {temas}
                    </ul>
                </div>}
            </div>}
        </Fragment>
    );
};
export default Search;

