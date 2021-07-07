import React from 'react';
import styled from 'styled-components';
import { Text } from '../../elements';
import "../../assets/modal.css";


const Modal = (props) => {

	const { state, close, header } = props;

	return (
		<div className={ state ? 'openModal modal': 'modal'}>
			{state ? (
				<section>
					<header>
						{header}
						<button className="close" onClick={close}> &times; </button>
					</header>
					<main>
						{props.children}
					</main>
					<footer>
						<button className="close" onClick={close}> close </button>
					</footer>
				</section>
			) : null}
		</div>
	);
};

export default Modal;