import React from 'react';
import ReactLoading from 'react-loading';

function Loader({ type, color, message }) {
	return (
		<div class="contentWrap">
			<div style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				position: "fixed",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)"
			}}>
				<h1>{message}</h1>
				<h4>창을 닫지 말아주세요🌊</h4>
				<ReactLoading
					type={type}
					color={color}
					height={'50%'}
					width={'50%'}
				/>
			</div>
		</div>
	);
}

export default Loader;
