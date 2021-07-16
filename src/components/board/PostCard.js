import React from 'react';
import styled from 'styled-components';
import { Text } from '../../elements';
import { history } from '../../redux/configStore';


const PostCard = ({ post }) => {
	const skills = post.tech_stack;
	const id = post.id;

	return (
		<>
			<CardBlock post={post} onClick={() => { history.push(`/detail/${id}`) }}>
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
			</CardBlock>
			</>
	);
};

PostCard.defaultProps = {
	color: "#0066ff",
	border: "1px solid #0066ff",
};

const CardBlock = styled.div`
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

export default PostCard;