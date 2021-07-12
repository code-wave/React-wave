import React from 'react';
import styled from 'styled-components';
import waveLogo from '../assets/image/codewave_logo.png';


const Footer = (props) => {
	return (
		<FooterBlock>
			<LogoBlock>
				<Logo src={waveLogo} alt="Logo" />
				<P1>
					2021 (주)코드웨이브
				</P1>
			</LogoBlock>
			<TextBlock>
				<P2>
					© Team CodeWave
				</P2>
				<P2>
					Produced By &nbsp; 김정민 / 안태건 / 윤예나
				</P2>
			</TextBlock>
		</FooterBlock>
	);
};

const FooterBlock = styled.div`
	width: 97%;
	height: 24vh;
	background: #eeeeeedc;
	padding-top: 18px;
	padding-left: 50px;
`;

const LogoBlock = styled.div`
	width: 80%;
	border: none;
	background: transparent;
	display: flex;
	align-items: center;
`;

const Logo = styled.img`
	width: auto;
	height: 60px;
`;

const TextBlock = styled.div`
	padding-left: 25px;
	padding-bottom: 10px;
`;

const P1 = styled.span`
 	display: inline-block;
	padding-right: 30px;
	color: #777777;
	font-size: 20px;
	font-weight: 600;
`;

const P2 = styled.span`
	display: inline-block;
	margin-top: 0;
	padding-left: 50px;
	color: #777777;
`;

export default Footer;