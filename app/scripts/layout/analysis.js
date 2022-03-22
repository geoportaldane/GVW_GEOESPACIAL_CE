// Layout componentes menu de navegación secundario (Herramientas)
import React, { useState } from 'react';
import { Tabs, useTabState, usePanelState } from "@bumaga/tabs";
import AreaAnalysis from '../components/analysis/analysis-area';
import HeatMap from '../components/analysis/analysis-heatmap';


const cn = (...args) => args.filter(Boolean).join(' ')

const Tab = ({ children }) => {
    const { isActive, onClick } = useTabState();

    return <li className="analysis__StepContainer__step__btnList__item">
        <button className={cn("tools__list__item__btn", isActive && '--active')} onClick={onClick}>{children}</button>
    </li>;
};

const Panel = ({ children }) => {
    const isActive = usePanelState();

    return isActive ? <div className="tools__container">{children}</div> : null;
};

const Analysis = () => {
    const state = useState(0);

    return (
        <div className="tools__panel">
            <h3 className="tools__title"> Análisis </h3>
            <div className="analysis__StepContainer__step analysis__step01">
                <h4 className="analysis__step__title">Paso 1</h4>
                <p className="analysis__boxDescription__text">Seleccione el tipo de análisis que desea hacer.</p>
                <Tabs state={state}>
                    <ul className="analysis__StepContainer__step__btnList">
                        <Tab>
                            <button type="button" title="Análisis por área" name="AnlysisArea" className="analysis__StepContainer__btn analysis__location" id="analysis__location">
                                <span className="DANE__Geovisor__icon__location analysis__StepContainer__btn__icon"></span>Análisis por Área
                            </button>
                        </Tab>
                        <Tab>
                            <button type="button" title="Mapa de Calor" name="HeatMap" className="analysis__StepContainer__btn analysis__heatmap" id="analysis__heatmap">
                                <span className="DANE__Geovisor__icon__heatmap analysis__StepContainer__btn__icon"></span>Mapa de calor
                            </button>
                        </Tab>
                    </ul>

                    <div className="analysis__StepContainer__step analysis__step02">
                        <h4 className="analysis__step__title">Paso 2</h4>
                        <div className="analysis__boxDescription">
                            <div className="analysis__boxDescription__icon">
                                <span className="DANE__Geovisor__icon__location"></span>
                            </div>
                            <p className="analysis__boxDescription__text">En el mapa está viendo un marcador, arrástrelo hasta el lugar de su interés o escriba la ubicación en el buscador.</p>
                        </div>
                        <div className="analysis__SearchBox">
                            <input placeholder="Escribe una ubicación" className="analysis__SearchBox__input" id="analysis__btnFiltrar" />
                            <button type="button" name="search" title="Búequeda ubicación" className="analysis__SearchBox__btn" id="analysis__SearchBox__btn">
                                <span className="DANE__Geovisor__icon__search"></span>
                            </button>
                            <div className="analysis__SearchBox__eraseSearch"></div>
                            <p className="analysis__SearchBox__errorMessage">Debes ingresar una ubicación</p>
                        </div>
                    </div>

                    <div class="analysis__StepContainer__step analysis__step03">
                        <h4 class="analysis__step__title">Paso 3</h4>
                        <Panel> <AreaAnalysis /></Panel>
                        <Panel> <HeatMap /></Panel>
                    </div>

                </Tabs >
            </div>
        </div>
    );
}

export default Analysis;