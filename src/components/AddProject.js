import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {FormInput} from "./index";
import {useAppContext} from "../context/app_context";
const initValues={
    active: 0,
    name: '',
    short_name: '',
    color: '#000000',
    client_id: '',
    time_estimated: '',
    description: '',
    start_date: '',
    end_date: '',
    estimate_units: '1',
    currency: null,
    hourly_rate: null,
    cost_hourly_rate: null,
    not_billable: false
}
const AddProject = () => {
    const {state,addProject}=useAppContext()
    const [formData, setFormData] = useState(initValues)
    const [isSuccess,setIsSuccess] = useState(false)
    const handleChange = (e) => {
        let key = e.target.name
        let value = e.target.value
        if (e.target.type === 'checkbox') {
            value = e.target.checked?1:0
            console.log(value)
        }
        setFormData(prev => ({...prev, [key]: value}))
    }
    // "Project":{
    //         "active": 1,
    //         "name": "New project", // you must choose you name
    //         "short_name": "",
    //         "color": "#FFCA28", // you must choose you color
    //         "client_id": "",
    //         "time_estimated": "",
    //         "description": "",
    //         "start_date": "",
    //         "end_date": "",
    //         "estimate_units": "1",
    //         "currency": null,
    //         "hourly_rate": null,
    //         "cost_hourly_rate": null,
    //         "not_billable": false
    // }
    return (
        <Wrapper>
            <form onSubmit={(e)=>{
                e.preventDefault()
                addProject(formData)
            }}>
                {isSuccess? <span className='isSuccess'>Project Created</span>:null}
                <div className='form-row'>
                    <FormInput name="color" labelText="Color Tag" type='color'
                               value={formData.color} handleChange={handleChange}/>
                    <FormInput name="active" labelText="Status" type='checkbox' value={formData.active}
                               handleChange={handleChange}/>
                </div>
                <FormInput name="name" labelText="Name" value={formData.name} handleChange={handleChange}/>
                <FormInput name="short_name" labelText="Short Name" value={formData.short_name}
                           handleChange={handleChange}/>
                <FormInput name="client_id" labelText="Client id" value={formData.client_id}
                           handleChange={handleChange}/>
                <FormInput name="start_date" labelText="Start Date" value={formData.start_date} type='date'
                           handleChange={handleChange}/>
                <FormInput name="end_date" labelText="End Date" value={formData.end_date} type='date'
                           handleChange={handleChange}/>
                <FormInput name="time_estimated" labelText="Time estimated (hours)" value={formData.time_estimated}
                           type='number' handleChange={handleChange}/>
                <FormInput name="cost_hourly_rate" labelText="Cost Hourly Rate" value={formData.cost_hourly_rate}
                           type='number' handleChange={handleChange}/>
                <FormInput name="description" labelText="Description" value={formData.description}
                           handleChange={handleChange}/>
                <div className='units-select'>
                    <label className="label" htmlFor='estimate_units-select'>
                        Estimate Units
                    </label>
                    <select name="estimate_units" id="estimate_units-select" onChange={handleChange}>
                        <option value='1' defaultValue>days</option>
                        <option value='2'>hours</option>
                    </select>
                </div>
                <button disabled={!!!formData.name}>Submit</button>
            </form>
        </Wrapper>
    );
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

export default AddProject;