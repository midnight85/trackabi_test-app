import styled from "styled-components";
import FormInput from "./FormInput";
import {useAppContext} from "../context/app_context";

const AuthForm = ({authData, title, handleChange}) => {
    const {state, login} = useAppContext();
    return (<Wrapper>
        <div className='title'>{title}</div>
        <form className='form'>
            {state.isError ? <>
                    {!!state.errorsMsg.email && <span className='error'>{state.errorsMsg.email}</span>}
                    {!!state.errorsMsg.password && <span className='error'>{state.errorsMsg.password}</span>}
                </>
                : null}
            <FormInput labelText="Email" name="email" type="email" value={authData.email} handleChange={handleChange}/>
            <FormInput labelText="Password" name="password" type="password" value={authData.password}
                       handleChange={handleChange}/>
            <button
                type="button"
                onClick={() => {
                    login(authData.email, authData.password)
                }}
                disabled={!authData.email || !authData.password}
                className="btn"
            >
                Login
            </button>
        </form>
    </Wrapper>);
};

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 500px;
  width: 100%;
  padding: 30px 15px;

  .title {
    font-size: 22px;
    text-align: center;
    margin-bottom: 30px;
    text-transform: capitalize;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
  }

  .btn {
    padding: 10px;
  }

  .error {
    color: red;
    text-align: center;
  }

`

export default AuthForm;
