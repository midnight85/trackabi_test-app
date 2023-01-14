import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import FormInput from "./UI/FormInput";
import {useAppContext} from "../context/app_context";

const AuthForm = ({title, handleClick}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {authError, handleAuthError} = useAppContext();
    useEffect(() => {
        handleAuthError();
    }, []);

    return (
        <Wrapper>
            <div className="form-title">{title}</div>
            <form className="form">
                {authError.errorCode && (
                    <div
                        style={{
                            color: "red",
                            padding: "0px 0px 20px 10px",
                            fontSize: "1rem",
                        }}
                    >
                        {authError.errorCode?.split("/")[1]}
                    </div>
                )}
                <FormInput label="Email" value={email} setValue={setEmail} />
                <FormInput
                    label="Password"
                    type="password"
                    value={password}
                    setValue={setPassword}
                />
                <button
                    disabled={!email || !password}
                    className="btn"
                    type="button"
                    onClick={() => handleClick(email, password)}
                >
                    {title}
                </button>

            </form>

            {title === "log in" ? (
                <p>
                    Don't have an Account? <Link to="/register">Register</Link>
                </p>
            ) : (
                <p>
                    Have an account already? <Link to="/login">Log in</Link>
                </p>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 10px;
  p {
    margin-top: 10px;
    font-size: 1rem;
    text-align: center;
  }
  a {
    transition: all 0.3s ease 0s;
  }
  a:hover {
    color: var(--clr-primary-5);
  }

  .form-title {
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    line-height: 40px;
    margin-bottom: 40px;
    text-transform: capitalize;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
  }

  .btn {
    padding: 20px;
    font-size: 1rem;
    border-radius: 10px;
  }
  .btn:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .err {
    outline: 1px solid #ff0000;
  }
`;

export default AuthForm;
