import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { actionCreators } from "../../redux/modules/user";
import { nicknameCheck, pwContinuous, pwMatch } from "../../shared/Common";
import { Container } from "../../elements";
import { SuccessAlert, WarningAlert, ErrorAlert } from "../../shared/Alerts";
import axios from "axios";
import { Link } from 'react-router-dom';
import Header from '../../shared/Header';
import { config } from "../../shared/config";


const Signup = (props) => {
	const dispatch = useDispatch();

    const [email, setEmail] = React.useState("");
	const [emailDup, setEmailDup] = React.useState(false);
	const [pw, setPw] = React.useState("");
	const [pwCheck, setPwCheck] = React.useState("");
	const [nickname, setNickname] = React.useState("");
	const [nicknameDup, setNicknameDup] = React.useState(false);
	const nickNameInfoUl = useRef(),
		nickNameInfo = useRef(),
		pwInfoLen = useRef(),
		pwInfoMatch = useRef(),
		pwInfoContinuos = useRef(),
		pwInfoUl = useRef(),
		rePwInfoUl = useRef(),
		rePwInfoLiT = useRef()

    //정규식 각 조건에 충족여부에 따라 info 확인 가능하도록
    const changeNickname = (e, nickNameInfo) => {

        const targetNickname = e.target.value;
        setNickname(targetNickname);

        if (!nicknameCheck(targetNickname)) {
            nickNameInfo.classList.add('error');
            nickNameInfo.classList.remove('ok');
        } else {
            nickNameInfo.classList.remove('error');
            nickNameInfo.classList.add('ok');
        }
    }

    //비밀번호
    const changePw = (e, pwInfoLen, pwInfoMatch, pwInfoContinuos) => {

        const targetPw = e.target.value;
        setPw(targetPw);

        if (targetPw.length < 4) {
            pwInfoLen.classList.add('error');
            pwInfoLen.classList.remove('ok');
        } else {
            pwInfoLen.classList.remove('error');
            pwInfoLen.classList.add('ok');
        }

        if (!pwMatch(targetPw)) {
            pwInfoMatch.classList.add('error');
            pwInfoMatch.classList.remove('ok');
        } else {
            pwInfoMatch.classList.add('ok');
            pwInfoMatch.classList.remove('error');
        }

        if (pwContinuous(targetPw)) {
            pwInfoContinuos.classList.add('error');
            pwInfoContinuos.classList.remove('ok');
        } else {
            pwInfoContinuos.classList.add('ok');
            pwInfoContinuos.classList.remove('error');
        }
    }

    //비밀번호 재확인
    //pwOk && (컴포넌트 보여주기)
    const changePwMatch = (e, rePwInfoUl, rePwInfoLiT) => {
        const checkPw = e.target.value;
        setPwCheck(checkPw);

        if (pw === checkPw) {
            rePwInfoUl.current.style.display = "block";
            rePwInfoLiT.current.style.color = "#683fee";
            return false;
        } else {
            rePwInfoUl.current.style.display = "none";
        }
    }

    //checkEmailAPI(username:email)
    const checkEmailAPI = (email) => {
        if (email === '') {
            WarningAlert("이메일을 입력해주세요");
            return false;
        }

        const API = `${config.api}/users/signup`;
        axios.post(API,
            {
                email: email,
                password: pw,
                nickname: nickname,
            })
            .then((res) => {
                if (res.data === "duplicated email") {
                    WarningAlert("이미 등록된 이메일입니다.");
                    setEmailDup(false);
                } else {
                    SuccessAlert("사용가능한 이메일입니다.");
                    setEmailDup(true);
                }
            })
            .catch((err) => {
                console.log(err.response.data);
                ErrorAlert("중복된 이메일입니다. 다시 입력해주세요.");
            })
    }

    //checkNicknameAPI
    const checkNicknameAPI = (nickname) => {

        if (nickname === '') {
            WarningAlert("닉네임을 입력해주세요");
            return false;
        }

        const API = `${config.api}/users/signup`;
        axios.post(API,
            {
                nickname: nickname,
            })
            .then((res) => {
                
                if (res.data === "duplicated nickname") {
                    WarningAlert("이미 등록된 닉네임입니다!");
                    setNicknameDup(false);
                } else {
                    SuccessAlert("사용 가능한 닉네임입니다!");
                    setNicknameDup(true);
                }
            })
            .catch((err) => {
                console.log(err.response.data);
                ErrorAlert("중복된 닉네임입니다. 다시 입력해주세요.");
            })
    }


    //회원가입하기!
    const signUp = () => {
        if (email === '') {
            WarningAlert("이메일을 입력해주세요!");
            return false;
        }

        if (nickname === '') {
            WarningAlert("닉네임을 입력해주세요!");
            return false;
        }

        // if (emailDup === false) {
        //     WarningAlert("이메일 중복확인을 해주세요!");
        //     return false;
        // }

        if (pw === '') {
            WarningAlert("비밀번호를 입력해주세요!");
            return false;
        }

        if (pwCheck === '') {
            WarningAlert("비밀번호를 다시 한 번 확인해주세요!");
            return false;
        }

        // if (nicknameDup === false) {
        //     WarningAlert("닉네임 중복확인을 해주세요!");
        //     return false;
        // }

        if (pw !== pwCheck) {
            WarningAlert("비밀번호 확인이 일치하지 않습니다!");
            return false;
        }

        checkEmailAPI(email);
        // history.push('/login');

        //회원가입API
        dispatch(actionCreators.signupAPI(email, pw, nickname));
    }



	return (
		<React.Fragment>
			<Header />
			<Container>
        <SignupContainer>
					<Title>
						회원가입
					</Title>
					<SignupForm>
						<SignupTable>
							<tbody>
								<tr>
									<td>이메일</td>
									<td>
										<Input width="12vw" margin="4px 12px" padding="12px" type="text"
											placeholder="mate12@naver.com"
											value={email}
											onChange={(e) => {
												setEmail(e.target.value)
                      }} />
                  </td>
                  <td>
                      <Button width="8vw" margin="12px 16px 0 0" padding="12px" font-size="0.5vw"
                          // onClick={() => {
                          //     checkEmailAPI(email);
                          // }}
                          >중복확인
                      </Button>
                  </td>
                </tr>
                  <tr>
                      <td>닉네임</td>
                      <td>
                              <Input width="12vw" margin="4px 12px" padding="12px"
                                      maxLength="6"
                                      value={nickname}
                                      onClick={() => {
                                              nickNameInfoUl.current.style.display = "block";
                                      }}
                                      onChange={(e) => {
                                              changeNickname(e, nickNameInfo.current);
                                      }} 
                                      />
                              <InfoUl className="checkPw" ref={nickNameInfoUl}>
                                      <li ref={nickNameInfo}>·한글,영문,숫자만 2~6자리 가능</li>
                              </InfoUl>
                      </td>
                      <td>
                              <Button width="8vw" margin="12px 16px 0 0" padding="12px" font-size="0.5vw"
                                      // onClick={() => {
                                      //         checkNicknameAPI(nickname)
                                      // }}
                              >중복확인</Button></td>
                  </tr>
                  <tr>
                    <td>비밀번호</td>
                    <td>
                            <Input width="20vw" margin="4px 12px" padding="12px" type="password"
                                    value={pw}
                                    onClick={() => {
                                            pwInfoUl.current.style.display = "block";
                                    }}
                                    onChange={(e) => {
                                            changePw(e, pwInfoLen.current, pwInfoMatch.current, pwInfoContinuos.current);
                                    }} />
                            <InfoUl className="checkPw" ref={pwInfoUl}>
                                    <li ref={pwInfoLen}>·글자수는 4~20 글자 </li>
                                    <li ref={pwInfoMatch}>·영문/숫자만 허용, 2개 이상의 조합</li>
                                    <li ref={pwInfoContinuos}>·동일한 문자 3개 이상 연속 사용 불가</li>
                            </InfoUl>
                    </td>
                  </tr>
                  <tr>
                    <td>비밀번호확인</td>
                    <td>
                            <Input width="20vw" margin="4px 12px" padding="12px" type="password"
                                    value={pwCheck}
                                    onClick={() => {
                                            rePwInfoUl.current.style.display = "block";
                                    }}
                                    onChange={(e) => {
                                            changePwMatch(e, rePwInfoUl, rePwInfoLiT)
                                    }}
                            />
                            <InfoUl className="ReCheckPw" ref={rePwInfoUl}>
                                    <li ref={rePwInfoLiT}>·비밀번호 일치</li>
                            </InfoUl>
                    </td>
                  </tr>
                </tbody>
				</SignupTable>
				<SignupBtn onClick={signUp} tabIndex="0">회원가입하기</SignupBtn>
				</SignupForm>
            </SignupContainer>
        </Container>
		</React.Fragment>
	);
};


const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding-top: 32px;
`;

const SignupForm = styled.div`
    width: 50%;
	padding-top: 20px;
    color: black;
    border: solid 1px lightgray;
    box-sizing:border-box;
    background-color: white;
`;

const InfoUl = styled.ul`
    font-size:12px;
    color:#666666;
    position: relative;
    left:0;
    margin-top:4px;
    font-weight: 400;
    & li{
        margin-top:4px;
    }
`;

const SignupTable = styled.table`
    margin:20px auto;
    padding-bottom: 49px;
    box-sizing:border-box;
    & tr{
        text-align: left;
        font-size: 16px;
        font-weight: 400;
    }
    & td{
    position: relative;
    padding-bottom: 16px;
    @media ${props => props.theme.tablet}{
        font-size: 14px;
        }
    @media ${props => props.theme.mobile}{
        font-size: 12px;
        }
    }
    & td:nth-child(1){
    box-sizing: border-box;
    padding: 15px 30px 0px 18px;
    @media ${props => props.theme.mobile}{
        font-size: 12px;
        padding: 0 10px 0px 18px;
        }
    }
    
`;

const Title = styled.div`
    width:50%;
    padding:20px 10px;
    margin-top: 40px;
    text-align: center;
    box-shadow: 0 0 2px 0 rgba(216, 216, 216, 0.86);
    background-color: #f2f5fa;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    box-sizing:border-box;
    font-size: 1.3vw;
    font-weight: 700;
    @media ${props => props.theme.tablet}{
        font-size: 18px;
        }
    @media ${props => props.theme.mobile}{
        font-size: 16px;
    }
`;

const Input = styled.input`
    width:85%;
    border:none;
    border-bottom: 1px solid lightgray;
    &:focus{
        outline:none;
    }
`;

const Button = styled.button`
    margin: 0 auto;
    padding: 4px 8px;
    color: #ffffff;
    border:none;
    border-radius: 8.5px;
    background-color:#999cda;
    font-size: 9px;
    &:hover{
        cursor: pointer;
    }
    @media ${props => props.theme.mobile}{
        font-size: 12px;
    }
    
`;

const SignupBtn = styled.div`
    width:150px;
    margin: 20px auto;
    padding: 12px;
    border: 1px solid grey;
    border-radius: 4px;
    background-color: #ffffff;
    letter-spacing: 0.5px;
    font-size: 14px;
    font-weight: 700;
    text-align:center;
    &:hover{
        cursor: pointer;
    }
`;


const Select = styled.select`
    width:15vw;
    border:none;
    border-bottom:1px solid lightgray;
    &:focus{
        outline:none;
    }
    &option{
        border:1px solid red;
    }
    @media ${props => props.theme.mobile}{
        width: 38vw;
    }
`;



export default Signup;