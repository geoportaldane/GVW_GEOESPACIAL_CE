// Layout componentes resultados 
import React, { useState, useRef, Fragment } from 'react'
import { variables } from '../base/variables';
import Leyenda from '../components/legend';
import LeyendaCluster from '../components/legendaCluster';
import TematicCharts from '../layout/tematicCharts';
import { useDetectOutsideClick } from "./useDetectOutsideClick";

const Accordion = ({ titleAccordion, title, icon, name, children, data }) => {
  const [isOpen, setOpen] = React.useState(data);
  return (
    <div className="results__item">
      <button type="button" name={name} title={title} className={`results__accordion ${isOpen ? "open" : ""}`} onClick={() => setOpen(!isOpen)}>
        <span className={`results__icon ${icon}`}></span>
        <p className="results__icon__name">{titleAccordion}</p>
      </button>
      <div className={`results__item__panel ${!isOpen ? "collapsed" : ""}`}>
        <div className="results__item__content">{children}</div>
      </div>
    </div>
  );
};

const Results = () => {
  const [tema, setTema] = React.useState("");
  const [subtema, setSubtema] = React.useState("");
  const [locationDpto, setLocationDpto] = React.useState("Todos los departamentos");
  const [results, setResults] = useState([]);
  const [active, setActive] = useState(true);
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  variables.legenTheme = function (nivel) {
    setTema(variables.tematica["GRUPOS"][variables.varVariable.substring(0, 3)][0]["GRUPO"]);
    setSubtema(variables.tematica["SUBGRUPOS"][variables.varVariable.substring(0, 5)][0]["SUBGRUPO"]);
  }

  variables.legendChange = function (legendcluster) {
    setActive(legendcluster)
  }

  variables.changeDepto = (depto) => {
    setLocationDpto(depto)
  }

  return (
    <div ref={dropdownRef} className={`results__main ${isActive ? "inactive" : "active"}`}>
      <Fragment>
        <div className="results__collapseBtn" onClick={onClick}>
          <div className="results__collapseBtn__triangle"></div>
        </div>
        <div className="results__resize"></div>
        <div className="results__container">
          <div className="results__top">
            <h2 className="results__top__title" id="title">{tema}</h2>
            <h3 className="results__top__subtitle" id="title">{subtema}</h3>
            <h4 className="results__top__thirdtitle result__locationDpto">{locationDpto}</h4>
          </div>

          <Accordion titleAccordion="Leyenda" icon="DANE__Geovisor__icon__layers" title="Leyenda" name="Leyenda">
            <Leyenda />
          </Accordion>

          <Accordion titleAccordion="Datos principales" icon="DANE__Geovisor__icon__graphBarVertical" title="Datos principales" name="Datos principales">
            <TematicCharts />
          </Accordion>

          <Accordion titleAccordion="Estado de la unidad económica" icon="DANE__Geovisor__icon__graphLine" title="Estado de la unidad económica" name="Estado de la unidad económica">
            <TematicCharts />
          </Accordion>

          <Accordion titleAccordion="Sector económico" icon="DANE__Geovisor__icon__factory" title="Sector económico" name="Sector económico">
            <TematicCharts />
          </Accordion>

          <Accordion titleAccordion="Unidad de observacion" icon="DANE__Geovisor__icon__urbanAround" title="Unidad de observacion" name="Unidad de observacion" data={true}>
            <TematicCharts />
          </Accordion>

          <div className="results__panel__source">
            <p className="results__panel__source__name">Fuente: <a rel="noreferrer" href="https://www.dane.gov.co/index.php/estadisticas-por-tema/comercio-interno/censo-economico-de-colombia-documento-metodologico#conteo-nacional-de-unidades-economicas" target="_blank" className="results__source__link">{variables.title}</a></p>
          </div>
        </div>
      </Fragment>
    </div>
  )
};

export default Results;