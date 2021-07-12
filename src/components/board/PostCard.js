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

	const skills = post.tech_stack;
	console.log(skills);

	return (
		<CardBlock>
			<CardWrapper>
				<Text bold size="25" marginBottom="16px">
					{post.title}
				</Text>
				<Filter>
					{skills.map(skill => (
						<FilterBtn>{skill}</FilterBtn>
					))}
				</Filter>
				<Text size="14" marginBottom="24px">
					{post.start_date} - {post.end_date}
				</Text>
				<Text size="13">{post.content}</Text>
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
	width: 250px;
	height: 250px;
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
	display: inline-block;
	margin-bottom: 16px;
`;

const FilterBtn = styled.span`
	margin-right: 12px;
	font-size: 16px;
	background: none;
	border: 1px solid #888;
	padding: 4px 12px;
	border-radius: 6px;

	& + & {
		margin-right: 0;
	}
`;

export default Card;