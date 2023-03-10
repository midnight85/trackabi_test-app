import React, {useState} from 'react';
import styled from "styled-components";
import {FormInput} from "./index";
import {useAppContext} from "../context/app_context";

const initValues = {
    name: "",
    alias: "",
    timezone: "Europe/Kiev",
    gmtOffset: 120
}
const CreateCompany = () => {
    const {state, createCompany} = useAppContext()
    const [formData, setFormData] = useState(initValues)
    const handleChange = (e) => {
        let key = e.target.name
        let value = e.target.value
        setFormData(prev => ({...prev, [key]: value}))
    }
    return (<Wrapper>
        {state.user.organizations.length === 3 ? <div>Company creation limit - 3</div> : <form onSubmit={(e) => {
            e.preventDefault()
            if (!formData.alias) {
                const tempData = {...formData, alias: formData.name.toLowerCase().replaceAll(' ', '-')}
                createCompany(tempData)
                return
            }
            createCompany(formData)
        }}>
            <FormInput name="name" labelText="Name" value={formData.name} handleChange={handleChange}/>
            <FormInput name="alias" labelText="Alias" value={formData.alias} handleChange={handleChange}/>
            <button disabled={!!!formData.name}>Submit</button>
        </form>}

    </Wrapper>);
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    width: 400px;
    flex-direction: column;
    gap: 15px;

    button {
      padding: 10px;
    }
  }

  .units-select {
    display: flex;
    flex-direction: column;

    .label {
      margin-bottom: 5px;
    }

    select {
      box-sizing: border-box;
      padding: 10px;
      width: 100%;
    }
  }

  .form-row {
    display: flex;
    gap: 30px;
  }

`
export default CreateCompany;