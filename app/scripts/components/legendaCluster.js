import React, { useState, useEffect, useContext, useLayoutEffect } from "react";
import { variables } from '../base/variables';

const LeyendaCluster = () => {

  const handleChange = (e) => {
    let check = e.target.checked;
    Object.keys(variables.layersInMap).map((l) => {
      if (variables.layersInMap[l]["ue"] !== undefined) {
        variables.layersInMap[l]["ue"].setVisible(check);
      }
    })

  }

  variables.changeLegend = function (nivel) { }

  return (
    <div className="legend">
      <ul className="legend__list">
        <li className="legend__item">
          <label className="legend__checkBox">
            <input type="checkbox" className="layer__item" style={{ margin: 'auto', marginRight: 5 }} name="radio" onChange={handleChange} defaultChecked={false} />
          </label>
          <p className="legend__text">Active o desactive las unidades económicas</p>
        </li>
        <li className="legend__item">
          <span className="circle">25</span>
          <p className="circle__text">Agrupación de edificaciones con unidades económicas</p>
        </li>
        <li className="legend__item">
          <img width="50" height="50" className="cluster" src="./img/gps-cyan.png" alt="Clúster"></img>
          <p className="circle__text">Edificaciones con unidades económicas</p>
        </li>
      </ul>
    </div >
  );
}

export default LeyendaCluster;
