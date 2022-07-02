import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ISignup {
  email: string;
  nickname: string;
  password: string;
  birth: string;
}

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignup>();
  const onValid = (data: ISignup) => {
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  };
  return (
    <Wrapper>
      <Frame>
        <Title>Sign Up</Title>
        <SignupForm onSubmit={handleSubmit(onValid)}>
          <Input>
            <input
              {...register("email", {
                required: true,
                pattern: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              })}
              type="text"
              placeholder="email"
            />
          </Input>
          {errors.email && <Error>이메일 형식에 맞게 입력해주세요</Error>}
          <Input>
            <input
              {...register("nickname", {
                required: true,
                maxLength: 5,
                minLength: 2,
              })}
              type="text"
              placeholder="nickname"
            />
          </Input>
          {errors.nickname && <Error>2자 이상 5자 이하로 입력해주세요</Error>}
          <Input>
            <input
              {...register("password", {
                required: true,
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!%*#?&])[A-Za-z\d@!%*#?&]{8,}$/,
              })}
              type="password"
              placeholder="password"
            />
          </Input>
          {errors.password && (
            <Error>대문자, 숫자, 특수기호 포함 8자 이상 입력해주세요</Error>
          )}
          <Input>
            <input
              {...register("birth", {
                required: true,
                pattern:
                  /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/,
              })}
              type="text"
              placeholder="date of birth : 1999-02-02"
            />
          </Input>
          {errors.birth && <Error>형식에 맞게 입력해주세요</Error>}
          <SignupBtn type="submit">Sign Up</SignupBtn>
        </SignupForm>
      </Frame>
    </Wrapper>
  );
}

export default SignUp;

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
  padding: 45px 30px;
  border-radius: 15px;
  text-align: center;
`;

const Title = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.red};
`;

const SignupForm = styled.form``;

const Input = styled.div`
  padding: 10px;
  margin: 18px 0 7px 0;
  border-bottom: 2px solid black;
  display: flex;

  input {
    border: none;
    padding: 0 30px;

    &:focus {
      outline: none;
    }
  }

  span {
    padding: 0 3px;

    svg {
      width: 13px;
      height: 16px;
      fill: green;
    }
  }
`;

const SignupBtn = styled.button`
  border: none;
  background-color: #039be5;
  margin-top: 25px;
  width: 90%;
  padding: 10px;
  border-radius: 15px;
  font-weight: bold;
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
`;
