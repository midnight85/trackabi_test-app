import React, {useState} from "react";
import styled from "styled-components";
import _uniqueId from "lodash/uniqueId";

const FormInput = ({type = 'text', name, value, handleChange, labelText}) => {
    const [id] = useState(_uniqueId("input-"));
    return (<Wrapper>
        <label className="label" htmlFor={id}>
            {labelText || name}
        </label>
        <input
            className="input"
            name={name}
            type={type}
            id={id}
            value={value}
            onChange={handleChange}
        />
    </Wrapper>);
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .input {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
  }

  input[type="color" i] {
    appearance: auto;
    width: 50px;
    height: 27px;
    cursor: default;
    box-sizing: border-box;
    background-color: buttonface;
    color: buttontext;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    padding: 1px 2px;
  }

  .label {
    margin-bottom: 5px;
  }

`;

export default FormInput;
