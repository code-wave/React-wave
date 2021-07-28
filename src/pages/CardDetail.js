import React from 'react';
import styled from 'styled-components';
import Header from '../shared/Header';
import Footer from '../shared/Footer';
import '../assets/detailtable.css';


const CardDetail = (props) => {
  return (
    <CardDetailBlock>
      <Header />

      <CardDetailWrapper>
        <div style={{ display: "flex", textAlign:"center" }}>
        <table className="first-table">
          <tr>
              <td className="td-bottom">
                리더 이름 <br /><br />
                리더 이메일
              </td>
            </tr>
          <tr>
              <td>
                모임 형태 (온라인/오프라인) <br /><br />
                모임 멤버 수 <br /><br />
                모임 시작날짜 ~ 끝나는 날짜
              </td>
          </tr>
        </table>

        <table className="second-table">
          <tr>
              <td height="300" className="td-bottom">
                모임 제목 <br /><br />
                요구하는 기술 스택
              </td>
          </tr>
          <tr>
            <td>모임 상세내용</td>
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