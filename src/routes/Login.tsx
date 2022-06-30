import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: black;
  min-height: 100vh;
  display: flex;
`;

const Frame = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto;
  padding: 60px 20px;
  border-radius: 15px;
  text-align: center;
`;

const Logo = styled.svg`
  width: 115px;
  height: 40px;
  margin-top: -20px;
  margin-bottom: 20px;
`;

const LoginForm = styled.form``;

const Input = styled.div`
  padding: 10px 5px;
  margin: 8px 0;
  border: 2px solid black;
  border-radius: 15px;
  display: flex;

  input {
    border: none;

    &:focus {
      outline: none;
    }
  }

  span {
    padding: 0 3px;

    svg {
      width: 13px;
      height: 16px;
      fill: ${(props) => props.theme.red};
    }
  }
`;

const LoginBtn = styled.button`
  border: none;
  background-color: #039be5;
  margin-top: 25px;
  width: 90%;
  padding: 10px;
  border-radius: 15px;
  font-weight: bold;
`;

const SignupLink = styled.div`
  /* background-color: blue; */
  margin-top: 20px;
  font-size: 11px;

  span {
    text-decoration: underline;
  }
`;

interface FormData {
  email: string;
  nickname: string;
  password: string;
  birth: string;
}

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const getUserdata = () => {
    const getDataStr = localStorage.getItem("user");
    const getDataObj = JSON.parse(getDataStr || "");
    return getDataObj;
  };
  const onValid = (data: FormData) => {
    if (
      data.email === getUserdata().email &&
      data.password === getUserdata().password
    ) {
      navigate("/home");
      window.location.reload();
    }
    return;
  };
  return (
    <Wrapper>
      <Frame>
        <Logo
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <path
            d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
            fill="#d81f26"
          />
        </Logo>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <Input>
            <input
              {...register("email", {
                required: true,
              })}
              type="text"
              placeholder="email"
            />
            <span>
              {errors.email ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                </svg>
              ) : null}
            </span>
          </Input>
          <Input>
            <input
              {...register("password", {
                required: true,
              })}
              type="password"
              placeholder="password"
            />
            <span>
              {errors.password ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                </svg>
              ) : null}
            </span>
          </Input>
          <LoginBtn type="submit">Login</LoginBtn>
        </LoginForm>
        <SignupLink>
          계정이 없으신가요?
          <Link to={`/signup`}>
            <span>회원가입</span>
          </Link>
        </SignupLink>
      </Frame>
    </Wrapper>
  );
}

export default Login;
