import React from "react";
import styled from "styled-components";
import errorImg from "../assets/image/404-errorpage.png";

const ErrorPage = () => {
  return (
    <ErrorPageBlock>
      <img src={errorImg} height="100%" margin="0" alt="400 Error" />;
    </ErrorPageBlock>
  );
};

const ErrorPageBlock = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  margin: 0;
  background-color: #000;
`;

export default ErrorPage;
