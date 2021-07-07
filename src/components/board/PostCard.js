import React from 'react';
import styled from 'styled-components';
import { Text } from '../../elements';
// import Modal from './Modal';


const Card = ({ post }) => {
	// const [is_modal, setModal] = React.useState(false);
	
	// const openModal = () => {
	// 	setModal(true);
	// }
	// const closeModal = () => {
	// 	setModal(false);
	// }

	return (
		<CardBlock>
			<CardWrapper>
					{/* <Filter>{post.tech_stack.go}</Filter> */}
					{/* <Filter>{post.tech_stack.react}</Filter> */}
					<Text bold size="20" margin="8px 0"></Text>
					<Text> - </Text>
					<Text></Text>
			</CardWrapper>

			{/* modal창은 모달창을 띄우기 위한 요소와 분리되어 있어야 한다 */}
				{/* <Modal state={is_modal} close={closeModal} header="Modal heading">
					모달 팝업창입니다!
				</Modal> */}
		</CardBlock>
	);
};

Card.defaultProps = {
	color: "#0066ff",
	border: "1px solid #0066ff",
};

const CardBlock = styled.div`

`;

const CardWrapper = styled.div`
	width: 300px;
	height: 300px;
	padding: 30px;
	margin: 30px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #fff;
	border: 2px solid #888;
	border-radius: 16px;
	cursor: pointer;

	&:hover {
		box-shadow: 2px 4px 12px 0 rgba(0, 0, 0, .4);
	}

	@media (max-width: 1600px) {
		width: 200px;
		height: 200px;
	}
`;

const Filter = styled.div`
	color: ${(props) => props.color};
	border: ${(props) => props.border};
	font-size: 14px;
	padding: 2px 8px;
	display: inline-block;
`;

export default Card;