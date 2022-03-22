import React, { useState } from 'react';

const DrawArea = () => {

    return (
        <div className="analysis__list__option">
            <div className="analysis__boxDescription">
                <p className="analysis__boxDescription__text">Clic en cualquier parte del mapa para ir dibujando el polígono, cierre el polígono dando clic en el punto inicial.</p>
            </div>
            <button type="button" name="Cerrar poligono" title="Cerrar Poligono" className="toolBar__container__panel__functionBox__uploadType__type__uploadbtn" id="close_polygon">
                <span className="DANE__Geovisor__icon__closePolygon toolBar__container__panel__functionBox__uploadType__type__uploadbtn__icon"></span>Cerrar poligono
            </button>
            <button type="button" name="Borrar Poligono" title="Borrar Poligono" className="toolBar__container__panel__functionBox__uploadType__type__uploadbtn" id="delete_polygon">
                <span className="DANE__Geovisor__icon__erase toolBar__container__panel__functionBox__uploadType__type__uploadbtn__icon"></span>Borrar poligono
            </button>
            <button type="button" name="Calcular" title="Calcular" className="analysis__btn">
                <span className="DANE__Geovisor__icon__chartAnalysis analysis__btn__icon"></span>Calcular
            </button>
        </div>
    )
}

export default DrawArea;
