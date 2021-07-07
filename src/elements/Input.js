import React from 'react';
import styled from 'styled-components';
import { Text } from '../elements';


const Input = (props) => {
	const { width, height,padding, label, placeholder, _onChange, type, marginTop } = props;

	const styles = {
		type: type,
		width: width,
		height: height,
		padding: padding,
		marginTop: marginTop,
		placeholder: placeholder,
		onChange: _onChange,
	}

	return (
		<>
				<Text size="16">{label}</Text>
				<ElInput {...styles} />
		</>
	);
};

Input.defaultProps = {
	width: "50",
	label: "",
	height: "32",
	placeholder: "",
	type: "text",
	marginTop: 0,
	_onChange: () => { },
};

const ElInput = styled.input`
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	padding: 2px 0 0 10px;
	box-sizing: border-box;
	display: inline-block;
`;

export default Input;