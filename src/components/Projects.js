import React, {useEffect} from 'react';
import {useAppContext} from "../context/app_context";
import styled from "styled-components";

const columnNames = [
    "Project Name",
    "Tag Color",
    "Short Name",
    "Client",
    "Status",
    "Start Date",
    "Estimated Completition Date",
    "Teams",
    "People",
    "Time Estimated",
    "Time Logged",
    "Time Billable",
]
const Projects = () => {
    const {state} = useAppContext()

    return (
        <>
            {state.projects?.length > 0 ?
                <div className='title'>Projects</div> :
                <div className='title'>No Projects</div>
            }
            <Wrapper>
                {
                    state.projects?.length > 0
                        ? <>
                            <table>
                                <thead>
                                <tr>
                                    {columnNames.map((name) => {
                                        return <th key={name}>{name}</th>
                                    })}
                                </tr>
                                </thead>
                                <tbody>
                                {state.projects.map((project) => {
                                    const {
                                        id,
                                        name,
                                        color,
                                        short_name,
                                        client_id,
                                        active,
                                        start_date,
                                        end_date,
                                        teams,
                                        members,
                                        time_estimated,
                                        time_logged_per_days,
                                        total_time_billable
                                    } = project

                                    const data = [name, color, short_name, client_id, active ? 'Active' : 'Inactive', start_date, end_date, teams.length, members.length, time_estimated, time_logged_per_days, total_time_billable]
                                    return (
                                        <tr key={id}>
                                            {data.map((item, index) => {
                                                if (item === color) {
                                                    return <td key={index}><span
                                                        style={{
                                                            display: "block",
                                                            backgroundColor: color,
                                                            paddingTop: "50%"
                                                        }}/>
                                                    </td>
                                                }
                                                return <td key={index}>{item}</td>
                                            })}

                                        </tr>
                                    )
                                })
                                }
                                </tbody>
                            </table>
                        </>
                        : null
                }
            </Wrapper>
        </>

    );
};
const Wrapper = styled.div`
  overflow: auto;

 

  table {
    border-collapse: collapse;
    width: 100%;
  }

  th {
    background-color: #ababab;

  }

  td, th {
    border: 1px solid #4d4d4d;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(odd) {
    background-color: #dedede;
  }

`
export default Projects;