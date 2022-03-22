import React, { useState } from 'react';

const HeatMap = () => {

    return (
        <div className="analysis__list__option">
            <div className="analysis__boxDescription">
                <p className="analysis__boxDescription__text">Cambie el tamaño del círculo de búsqueda para definir la <span className="analysis__boxDescription__text__bold">Densidad de <span>viviendas</span> por manzana</span></p>
            </div>
            <div className="analysis__slideTrans">
                <p className="analysis__slideTrans__textValue">4 <span> viviendas</span></p>
                <div className="analysis__slideTrans__scrollBar">
                    <button type="button" name="Viviendas" title="Viviendas" className="analysis__slideTrans__scrollBtn heatMap" ></button>
                </div>
                <p className="analysis__slideTrans__textValue">500<span> viviendas</span></p>
            </div>
            <button type="button" name="Calcular" title="Calcular" class="analysis__btn_heatMap">
                <span class="DANE__Geovisor__icon__chartAnalysis analysis__btn__icon"></span>Calcular
            </button>
        </div>
    )
}

export default HeatMap;
