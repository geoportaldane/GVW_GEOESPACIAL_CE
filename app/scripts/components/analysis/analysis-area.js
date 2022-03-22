import React, { useState } from 'react';

const AreaAnalysis = () => {
    const state = useState(0);

    return (
        <div className="tools__panel">
            <div class="analysis__boxDescription">
                <p class="analysis__boxDescription__text">Seleccione el método para obtener la información:</p>
                <ul class="tools__radioList">
                    <li class="tools__radioList__item --active">
                        <input type="radio" name="AnalysisArea" value="AnalysisArea" class="tools__radioList__item__radio"></input>
                        <div class="tools__radioList__item__radioBox"></div>
                        <p class="tools__radioList__item__text">Área alrededor de la ubicación</p>
                    </li>
                    <li class="tools__radioList__item">
                        <input type="radio" name="AnalysisDrawArea" value="AnalysisDrawArea" class="tools__radioList__item__radio"></input>
                        <div class="tools__radioList__item__radioBox"></div>
                        <p class="tools__radioList__item__text"> Dibujar un área</p>
                    </li>
                </ul>
            </div>
            <div class="analysis__list__option">
                <div class="analysis__boxDescription">
                    <p class="analysis__boxDescription__text">Cambie el tamaño del círculo de búsqueda para definir el <span class="analysis__boxDescription__text__bold">área</span></p>
                </div>
                <div class="analysis__slideTrans">
                    <p class="analysis__slideTrans__textValue">100 metros</p>
                    <div class="analysis__slideTrans__scrollBar">
                        <button type="button" name="transAnalysis" title="Análisis Metros" class="analysis__slideTrans__scrollBtn analysis"></button>
                    </div>
                    <p class="analysis__slideTrans__textValue">5.000 metros</p>
                </div>
                <button type="button" name="Calcular Análisis" title="Calcular Análisis" class="analysis__btn">
                    <span class="DANE__Geovisor__icon__chartAnalysis analysis__btn__icon"></span>Calcular
                </button>
            </div>
        </div>
    )
}

export default AreaAnalysis;
