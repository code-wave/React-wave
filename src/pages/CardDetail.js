import React from 'react';
import styled from 'styled-components';
import Header from '../shared/Header';
import Footer from '../shared/Footer';


const CardDetail = (props) => {
  return (
    <CardDetailBlock>
      <Header />

      <CardDetailWrapper>
        <div style={{ display: "flex" }}>
        <table border="1" bordercolor="blue" width ="400" height="700" align = "center" >
          <tr>
            <td>리더 정보</td>
          </tr>
          <tr>
            <td>모임 정보</td>

          </tr>
          </table>
        <table border="1" bordercolor="blue" width ="400" height="700" align = "center" >
          <tr>
            <td height="200">제목, 스택</td>
          </tr>
          <tr>
            <td>상세content</td>
          </tr>
        </table>
        </div>

        <ApplyButton>신청하기</ApplyButton>
      </CardDetailWrapper>


      <Footer />
    </CardDetailBlock>
  );
};

const CardDetailBlock = styled.div`
  width: 100%;
  height: 100vh;
`;

const CardDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ApplyButton = styled.button`
  border: 1px solid #888;
  background: none;
  border-radius: 8px;
  margin: 40px 0;
  padding: 12px 18px;
  width: 200px;
  font-size: 24px;
  font-weight: 700;
`;

export default CardDetail;