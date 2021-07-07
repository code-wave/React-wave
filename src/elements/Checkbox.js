import React from 'react';
import styled from 'styled-components';



const CheckBox = (props) => {
	const { _onChange, checked, label, id } = props;

	return (
		<Wrapper>
			<input type="checkbox" id={id} onChange={_onChange} checked={checked} />
			<label htmlFor={id} >{label}</label>
		</Wrapper>
	);
};

const Wrapper = styled.div`
  & input[type=checkbox] + label {
  display: block;
  margin: 0.2em;
  cursor: pointer;
  padding: 0.2em;
  font-size:0.9em;
}
& input[type=checkbox] {
  display: none;
}
& input[type=checkbox] + label:before {
  font-family:"Font Awesome 5 Free";
  font-weight:900;
  font-size:10px;
  content: "\f00c";
  border: 0.1em solid lightgray;
  border-radius: 0.2em;
  display: inline-block;
  width: 12px;
  height: 10px;
  padding: 0.3em 0.1em 0.3em 0.3em;
  margin-right: 0.4em;
  vertical-align: bottom;
  color: transparent;
  transition: .2s;
  position: relative;
  top:2px;
}
& input[type=checkbox] + label{
  color:#979797;
}
& input[type=checkbox]:checked + label{
  color:#000000;
}
& input[type=checkbox] + label:active:before {
  transform: scale(0);
}
& input[type=checkbox]:checked + label:before {
  color: black;
}
& input[type=checkbox]:disabled + label:before {
  transform: scale(1);
  border-color: #aaa;
}
& input[type=checkbox]:checked:disabled + label:before {
  transform: scale(1);
  background-color: #bfb;
  border-color: #bfb;
}
`;

export default CheckBox;