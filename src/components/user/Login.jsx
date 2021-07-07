import React from "react";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux/modules/user";
import { Container } from "../../elements";
import { history } from "../../redux/configStore";
import { Link } from "react-router-dom";
import Header from "../../shared/Header";
import { WarningAlert } from "../../shared/Alerts";

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [pw, setPw] = React.useState("");

  const onLogin = () => {
    if (email === "") {
      WarningAlert("이메일을 입력해주세요");
      return;
    }
    if (pw === "") {
      WarningAlert("비밀번호를 입력해주세요");
      return;
    }

    dispatch(actionCreators.loginAPI(email, pw));

    history.push("/");
  };

  return (
    <React.Fragment>
      <Header />
      <Container>
        <LoginContainer>
          <Title>로그인</Title>
          <LoginForm>
            <LoginTable>
              <tbody>
                <tr>
                  <td>
                    <b>이메일</b>
                  </td>
                  <td>
                    <Input
                      marginTop="24"
                      placeholder="codewave@gmail.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>비밀번호</b>
                  </td>
                  <td>
                    <Input
                      type="password"
                      value={pw}
                      onChange={(e) => {
                        setPw(e.target.value);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </LoginTable>
            <LoginBtn onClick={onLogin}>로그인</LoginBtn>
            <Link to="/signup">
              <ToSignup>
                <span>아직 회원이 아니신가요?</span>
                <span>지금 바로 가입해보세요!</span>
              </ToSignup>
            </Link>
          </LoginForm>
        </LoginContainer>
      </Container>
    </React.Fragment>
  );
};

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const LoginForm = styled.div`
  /* text-align:center; */
  width: 50%;
  color: black;
  border: solid 1px lightgray;
  box-sizing: border-box;
  background-color: white;
`;

const LoginTable = styled.table`
  margin: 50px auto 0 auto;
  padding-bottom: 50px;
  box-sizing: border-box;
  & tr {
    text-align: left;
    font-size: 16px;
    font-weight: 400;
  }
  & td {
    position: relative;
    padding-bottom: 16px;
    @media ${(props) => props.theme.tablet} {
      font-size: 14px;
    }
    @media ${(props) => props.theme.mobile} {
      font-size: 12px;
    }
  }
  td:nth-child(1) {
    box-sizing: border-box;
    padding: 15px 30px 0px 18px;
    @media ${(props) => props.theme.mobile} {
      font-size: 12px;
      padding: 15px 10px 0px 0px;
    }
  }
`;

const Title = styled.div`
  width: 50%;
  margin-top: 70px;
  padding: 20px 10px;
  text-align: center;
  box-shadow: 0 0 2px 0 rgba(216, 216, 216, 0.86);
  background-color: #f2f5fa;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-sizing: border-box;
  font-size: 1.3vw;
  font-weight: 700;
  @media ${(props) => props.theme.tablet} {
    font-size: 18px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: 16px;
  }
`;

const Input = styled.input`
  width: 283px;
  border: none;
  border-bottom: 1px solid lightgray;
  @media ${(props) => props.theme.tablet} {
    font-size: 14px;
  }
  @media ${(props) => props.theme.mobile} {
    width: 180px;
    font-size: 12px;
  }
  &:focus {
    outline: none;
  }
`;

const LoginBtn = styled.div`
  width: 100px;
  margin: 20px auto 50px;
  padding: 12px;
  border: 1px solid grey;
  border-radius: 4px;
  background-color: #ffffff;
  letter-spacing: 0.5px;
  font-size: 16px;
  font-weight: 700;
  text-align: center;
  box-sizing: border-box;
  &:hover {
    cursor: pointer;
  }
  @media ${(props) => props.theme.tablet} {
    font-size: 12px;
  }
  @media ${(props) => props.theme.mobile} {
    font-size: 12px;
  }
`;

const ToSignup = styled.div`
  margin: 20px;
  /* display:flex;
    justify-content:space-between; */
  text-align: right;
  padding-left: 80px;
  padding-bottom: 20px;
  cursor: pointer;
  font-size: 12px;
  &span {
  }
  & span:nth-child(2) {
    margin-left: 10px;
    color: #683fee;
    text-decoration: underline;
  }
  @media ${(props) => props.theme.mobile} {
    text-align: center;
    padding-left: 10px;
  }
`;

export default Login;
