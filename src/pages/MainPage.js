import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {Loading, Projects} from "../components";
import {useAppContext} from "../context/app_context";
import styled from "styled-components";

const MainPage = () => {
    const {state} = useAppContext();

    if (state.isLoading) {
        return <Loading/>
    }
    return (
        <Wrapper>
            <nav className='nav-btns'>
                <Link className="navigate-btn" to='/'>Projects list</Link>
                {state.user.organizations.length>0? <Link className="navigate-btn" to='add-project'>Add Project</Link>:null}
                <Link className="navigate-btn" to='create-company'>Create Company</Link>
            </nav>
            <Outlet />
        </Wrapper>
    );
};
const Wrapper = styled.div`
    .nav-btns{
      display: flex;
      gap: 40px;
      justify-content: center;
      align-items: center;
      margin-bottom: 40px;
    }
  .navigate-btn{
    padding: 10px;
    border: 1px solid black;
    
  }
`

export default MainPage;