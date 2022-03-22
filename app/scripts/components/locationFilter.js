// FUNCIONALIDAD Y MAQUETA PARA FILTRO DE UBICACION (GROGRAFICO)

import React, { Component, useState } from 'react';
import municipios from '../../json/mpio-extent.json'
import departamentos from '../../json/dpto-extent.json'
import clase from '../../json/clase-extent.json'
import cps from '../../json/centros_poblados-extent.json'
import Select from 'react-select'
import { boundingExtent } from 'ol/extent';
import { transformExtent } from 'ol/proj';
import { variables } from '../base/variables';
import { Fill, Stroke, Style } from 'ol/style';
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

const Filter = (props) => {

    const options1 = departamentos

    const options2 = municipios

    const options3 = [
        { value: '1', label: '1 - Cabecera municipal' },
        { value: '2', label: '2 - Centros poblados' },
        { value: '3', label: '3 - Rural disperso' }
    ]

    let options4 = [];

    const [listCp, setListCp] = useState([]);
    const [selectedOption3, setSelectedOption3] = useState(0);
    const [selectedOption2, setSelectedOption2] = useState(0);
    const [selectedOption, setSelectedOption] = useState(0);
    const [openDialogo, setOpenDialogo] = useState(false);

    let filteredOptions = options2.filter((o) => (o.cod_dane).substring(0, 2) === selectedOption.cod_dane)

    const handleChange1 = (evt) => {
        setSelectedOption(evt);
        let bbox = evt.bextent
        bboxExtent(bbox)
        // console.log(evt)
        variables.deptoSelected = evt.cod_dane;
        variables.deptoSelectedFilter = evt.cod_dane;
        variables.deptoVariable = evt.cod_dane;

        
        variables.filterGeo("DPTO", evt.cod_dane)

        

        // let currZoom = variables.map.getView().getZoom();
        // if(currZoom < 9){
        //     variables.map.getView().setZoom(9.1) 
        // }  

        variables.currentZoom = variables.map.getView().getZoom();
        filteredOptions = [];

        setSelectedOption2({ cod_dane: "", value: "" });
        setSelectedOption3({ cod_dane: "", value: "" });
        variables.baseMapPrev = variables.baseMapCheck;
        variables.baseMapCheck = "Gris";
        if (variables.changeDepto != null) {
            // variables.changeDepto("Departamento de " + evt.name)
            variables.changeDepto(evt.cod_dane + " - " + evt.name)
        }

        let nivel = 'DPTO';

        if (variables.changePieChartData != null) {
            variables.changePieChartData(nivel, evt.cod_dane);
        }
        if (variables.changeDonuChartData != null) {
            variables.changeDonuChartData(nivel, evt.cod_dane);
        }
        if (variables.changeBarChartData != null) {
            variables.changeBarChartData(nivel, evt.cod_dane);
        }
        if (variables.changeGaugeChartData != null) {
            variables.changeGaugeChartData(nivel, evt.cod_dane);
        }

        variables.deptoConsulta = evt.cod_dane;

        let layer = variables.capas['deptos_vt2'];
        // let layer2 = variables.capas['mpios_vt2'];
        hightlightFeature(layer, evt.cod_dane, 'id')
        variables.changeStyleDepto();
        if(variables.changeStyleDepto != null){
            variables.changeStyleDepto();
        }
        
        
        // if (variables.changeGaugeChartData != null) {
        //     variables.changeGaugeChartData(nivel);
        // }
        // setSelectedOption2(0);
        // variables.deptoSelected = undefined;

    };



    const handleChange2 = (evt) => {
        // console.log(evt)
        // const filtroDos = clase.filter((o) => (o.cod_dane).indexOf(evt.cod_dane) != -1)
        // console.log(filtroDos)
        // console.log(evt)
        // const filtroDos = municipios.filter((o) => o.cod_dane === evt.cod_dane)
        setSelectedOption2(evt)
        let bbox = evt.bextent
        bboxExtent(bbox)
        if (variables.changeLoader != null) {
            variables.changeLoader(false);
        }

        // variables.loadUE(evt.cod_dane);
        setSelectedOption3({ cod_dane: "", value: "" });
        variables.baseMapPrev = variables.baseMapCheck;
        variables.baseMapCheck = "Satelital";
        if (variables.changeDepto != null) {
            // variables.changeDepto("Departamento de " + selectedOption.name + ", Municipio de " + evt.name)
            variables.changeDepto(evt.cod_dane.substring(0, 2) + " - " + selectedOption.name + " - " + evt.cod_dane + " - " + evt.name)
        }
        //   console.log(variables.map.getZoom())
        if (variables.map.getView().getZoom() < 12) {
            let filter = clase.filter((o) => (o.cod_dane).indexOf(evt.cod_dane + "1") != -1)
            bboxExtent(filter[0].bextent)
        }

        let nivel = 'MPIO';

        if (variables.changePieChartData != null) {
            variables.changePieChartData(nivel, evt.cod_dane);
        }
        // console.log(variables.changeDonuChartData);
        if (variables.changeDonuChartData != null) {
            variables.changeDonuChartData(nivel, evt.cod_dane);
        }
        if (variables.changeBarChartData != null) {
            variables.changeBarChartData(nivel, evt.cod_dane);
        }
        if (variables.changeGaugeChartData != null) {
            variables.changeGaugeChartData(nivel, evt.cod_dane);
        }

        variables.municipioConsulta = evt.cod_dane;

        nivel = 'MNZN';

        variables.changeTheme(nivel, selectedOption.cod_dane, "NM", "N");

        const filtroGeografico = variables.tematica["CATEGORIAS"][variables.varVariable][0]["FILTRO_GEOGRAFICO"];

        if(filtroGeografico === "D,M"){
            if(variables.map.getView().getZoom() > 11){
                setOpenDialogo(true)
                // alert("No hay datos disponibles para el nivel de manzanas");
            } 
        }


    }

    const handleChange3 = (evt) => {
        const filtroTres = clase.filter((o) => (o.cod_dane).indexOf(selectedOption2.cod_dane + evt.value) != -1)
        setSelectedOption3(evt.value)
        let bbox = filtroTres[0].bextent
        bboxExtent(bbox)
        options4 = cps.filter((o) => o.cod_dane.substring(0, 5) === selectedOption2.cod_dane);
        // console.log(options4)
        setListCp(options4)
    }

    const handleChange4 = (evt) => {
        let bbox = evt.bextent
        bboxExtent(bbox)
    }

    const hightlightFeature = (layer, id, capa) => {

        let styleHg = new Style({
            fill: null,
            stroke: new Stroke({
                color: "#00ffff",
                width: 10
            })
        });
        layer.setStyle(function (feature) { 
            var getlayer = feature.get(capa);
            let style;
            if (getlayer === id) {
                style = styleHg;
                layer.setZIndex(1);
            }

            return style;
        })

    }

    const cerrarDialogo = () => {
        setOpenDialogo(false)
    }


    return (
        <div className="tools__panel">
            <Dialogo open={openDialogo} cerrarDialogo={cerrarDialogo}/>
            {/* <h3 className="tools__title"> Filtrar </h3> */}
            <p className="tools__text">Realice la selección geográfica que desea ver en el mapa</p>
            <div className="selectBox">
                <p className="selectBox__name">Departamento:</p>
                <Select
                    styles={{
                        navBar: provided => ({ zIndex: 9999 })
                    }}
                    name="form-field-name"
                    value={selectedOption.value}
                    onChange={handleChange1}
                    className="select2-container" placeholder="Seleccione un departamento" options={options1}
                    // isClearable={true}
                    getOptionValue={(option) => option.cod_dane}
                    getOptionLabel={(option) => option.cod_dane + " - " + option.name}
                />
            </div>
            <div className="selectBox">
                <p className="selectBox__name">Municipio:</p>
                <Select
                    // styles={{
                    //     navBar: provided => ({ zIndex: 9999 })
                    // }}
                    name="form-field-name"
                    value={selectedOption2.value}
                    onChange={handleChange2}
                    className="select2-container" placeholder="Seleccione un municipio" options={filteredOptions}
                    // isClearable={true}
                    getOptionValue={(option) => option.cod_dane}
                    getOptionLabel={(option) => option.cod_dane + " - " + option.name}
                />
            </div>

            <div className="selectBox">
                <p className="selectBox__name">Clase:</p>
                <Select
                    // styles={{
                    //     navBar: provided => ({ zIndex: 9999 })
                    // }}
                    name="form-field-name"
                    value={selectedOption3.value}
                    onChange={handleChange3}
                    className="select2-container" placeholder="Seleccione una clase" options={options3}
                    getOptionLabel={(option) => option.label}
                    getOptionValue={(option) => option.value}
                // isClearable={true}
                />
            </div>

            {
                selectedOption3 == 2 ?
                    <div className="selectBox">
                        <p className="selectBox__name">Centro poblado:</p>
                        <Select
                            // styles={{
                            //     navBar: provided => ({ zIndex: 9999 })
                            // }}
                            name="form-field-name"
                            // value={selectedOption3.value}
                            onChange={handleChange4}
                            className="select2-container" options={listCp}
                            getOptionValue={(option) => option.cod_dane}
                            getOptionLabel={(option) => option.cod_dane + " - " + option.name}
                        // isClearable={true}
                        />
                    </div> : null
            }




        </div>
    );
}

export default Filter;
