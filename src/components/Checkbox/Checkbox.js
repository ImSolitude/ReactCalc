import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./Checkbox.scss";

const Checkbox = props => {
  const [check, setCheck] = useState(false);
  const handleCheck = e => {
    setCheck(e.target.checked);
  };

  const [inProp, setInProp] = useState(false);

  return (
    <li className="checkbox-item">
      <input
        type="checkbox"
        id={`checkbox`}
        checked={check}
        onChange={handleCheck}
      />
      <label htmlFor={`checkbox`}>
        <span className="checkbox-label">Switch</span>
        <span className="styled-checkbox" />
      </label>
    </li>
  );
};

export default Checkbox;
