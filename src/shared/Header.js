import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';
import { actionCreators } from "../redux/modules/user";
import waveLogo from '../assets/image/codewave_logo.png';
import { Text } from '../elements';
import '../assets/wave.css';


const Header = ({ history }) => {
	const dispatch = useDispatch();
	let isLogin = useSelector((state) => state.user.isLogin);
	// let [isLogin, setIsLogin] = useState(false);


	useEffect(() => {
		const username = localStorage.getItem("username");

		if (username) {
			isLogin = true;
		}
	}, []);


	const LogOut = () => {
		dispatch(actionCreators.logout());
			isLogin = false;
  };
	
	return (
		<HeaderBlock>
			<LogoBlock onClick={() => history.push('/')}>
					<Logo src={waveLogo} alt="Logo" />
					<Text
						display="inline-block"
						size="32"
						color="#0d3a53"
						bold
						paddingTop="16px">
						Code Wave
					</Text>
			</LogoBlock>

			<MenuBlock className={isLogin ? "addUserLog" : ""}>
					<MenuButton onClick={() => history.push('/search')}>모임 찾기</MenuButton>
				<MenuButton onClick={() => history.push('/add')}>팀 만들기</MenuButton>
				
				{isLogin ? 
					(<MenuButton onClick={() => history.push('/mypage')}>나의 모임</MenuButton>)
					: ""}
			</MenuBlock>

			{isLogin ? (
				<ButtonBlock>
					<Button onClick={LogOut}>로그아웃</Button>
			</ButtonBlock>
			) : (
				<ButtonBlock>
						<Button onClick={() => history.push('/signup')}>회원가입</Button>
						<Button onClick={() => history.push('/login')}>로그인</Button>
				</ButtonBlock>
			)}
		</HeaderBlock>
	);
};

const HeaderBlock = styled.div`
	position: relative;
	width: 89.35%;
	height: 15vh;
	display: flex;
	justify-content: space-between;
	padding: 0 90px;
	margin-bottom: 32px;
`;

const LogoBlock = styled.button`
	border: none;
	background: transparent;
	position: absolute;
	top: 25px;
	left: 10%;
	display: flex;
	align-items: center;
	cursor: pointer;
`;

const Logo = styled.img`
	width: auto;
	height: 60px;
`;

const MenuBlock = styled.div`
	position: absolute;
	top: 50px;
	left: 37%;
	display: flex;
	padding: 0 20px;

	&.addUserLog{
    gap:45px;
  }
`;

const MenuButton = styled.button`
	border: none;
	background-color: transparent;
	font-size: 18px;
	font-weight: 700;
  color: #222831;
	cursor: pointer;
	margin-right: 7vw;

	&:last-child {
		margin-right: 0;
	}
`;

const ButtonBlock = styled.div`
	position: absolute;
	top: 30px;
	right: 10vw;
	display: flex;
	align-items: center;
	padding-right: 70px;
`;

const Button = styled.button`
	border: 2px solid #eee;
	border-radius: 4px;
	background-color: #fff;
	box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, .4);
	width: auto;
	padding: 6px 16px;
	font-size: 14px;
	font-weight: 700;
	cursor: pointer;
	margin-right: 16px;

	& + & {
		margin-right: 0;
	}
`;

export default withRouter(Header);