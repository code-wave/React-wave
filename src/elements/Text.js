import React from 'react';
import styled from 'styled-components';



const Text = (props) => {
	const { display, bold, color, size, borderBottom, marginTop, marginBottom, marginRight, paddingTop, paddingBottom, lineHeight, children } = props;

	const styles = {
		display: display,
		bold: bold,
		color: color,
		size: size,
		borderBottom: borderBottom,
		marginTop: marginTop,
		marginBottom: marginBottom,
		marginRight: marginRight,
		paddingTop: paddingTop,
		paddingBottom: paddingBottom,
		lineHeight: lineHeight,
	}

	return (
			<P {...styles}>{children}</P>
	);
};

// 받아온 props 전체의 초기값 설정 (children 포함)
Text.defaultProps = {
	children: null,
	display: "",
	bold: false,
	color: "#2B292D",
	size: "12",
	borderBottom: '1px solid #888',
	marginTop: 0,
	marginBottom: 0,
	marginRight: 0,
	paddingTop: 0,
	paddingBottom: 0,
	lineHeight: 0,
};

const P = styled.p`
	display: ${(props) => props.display};
	color: ${(props) => props.color};
	font-size: ${(props) => props.size}px;
	//글자 굵기는 true or false -> 삼항연산자로 처리
	font-weight: ${(props) => (props.bold ? "600" : "400")};
	margin-top: ${(props) => props.marginTop}px;
	margin-bottom: ${(props) => props.marginBottom}px;
	margin-right: ${(props) => props.marginRight}px;
	padding-top: ${(props) => props.paddingTop}px;
	padding-bottom: ${(props) => props.paddingBottom}px;
	line-height: 24px;
`;


export default Text;