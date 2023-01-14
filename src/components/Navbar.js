import React from 'react';
import styled from "styled-components";
import {useAppContext} from "../context/app_context";
import {Link} from "react-router-dom";

const Navbar = () => {
    const {state, logout, handleSelectOrg} = useAppContext()

    return (<Wrapper>
        <div className="nav-center">
            <div className="nav-header">
                <div className="org-name">
                    {state.user.organizations.length > 0 ?
                        <>
                            {state.user.selectedOrg?.logo ?
                                <div className="org-logo">
                                    <img src={`https://trackabi.com${state.user.selectedOrg?.logo}`} alt="user-img"/>
                                </div> :
                                null}
                            <div className="custom-select">
                                <select name="orgs" id="orgs-select" onChange={handleSelectOrg} defaultValue={state.user.selectedOrg.name}>
                                    {state.user.organizations.map((item) => {
                                        return <option key={item.name} value={item.name}>{item.name}</option>
                                    })}
                                </select>
                            </div>
                        </>
                        : <span>no companies</span>}
                </div>
                <div className="account-info">
                    {state.user.token ? <div className="user">
                        <div className="user-info">
                            <span style={{fontSize: 12}}>Logged in as</span>
                            <span className="user-name">{state.user.name}</span>
                            <Link to='/login' onClick={logout} className="btn">
                                Log out
                            </Link>
                        </div>
                        <div className={state.user.avatar ? "user-img" : "user-img no-avatar"}>
                            {state.user.avatar ? <img src={`https://trackabi.com${state.user.avatar.cropped_name}`}
                                                      alt="user-img"/> : <span>{state.user.first_name[0]}</span>}
                        </div>
                    </div> : <Link to='/login' className="login-btn">
                        Log In
                    </Link>

                    }
                </div>
            </div>

        </div>
    </Wrapper>);
};
const Wrapper = styled.nav`
  display: flex;
  width: 100%;
  height: 64px;
  align-items: center;
  justify-content: center;

  .nav-center {
    width: 100%;
    margin: 0 auto;
    max-width: var(--max-width);
  }

  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .custom-select {
    select {
      background-color: transparent;
      border: none;
    }
  }


  .org-logo {
    width: 38px;
    height: 38px;
    border-radius: 100%;
    border: 1px solid #000;
    overflow: hidden;

    img {
      max-width: 100%;
      object-fit: cover;
    }
  }

  .org-name {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    text-transform: capitalize;
  }

  .user {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .user-info {
    display: flex;
    flex-direction: column;
  }

  .user-img {
    width: 48px;
    height: 48px;
    border-radius: 100%;
    border: 1px solid #000;
    overflow: hidden;

    img {
      max-width: 100%;
      object-fit: cover;
    }
  }

  .no-avatar {
    background-color: #f3cece;
    text-transform: uppercase;
    font-size: 36px;
    text-align: center;
  }
`

export default Navbar;