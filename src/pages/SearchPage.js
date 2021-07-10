import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../shared/Header';
import PostCard from '../components/board/PostCard';
import { Text } from '../elements';
import { config } from "../shared/config";
import axios from 'axios';


const SearchPage = (props) => {
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(false);
	const [react, setReact] = useState("");
	const [go, setGo] = useState("");


	useEffect(() => {
		const fetchGet = async () => {
			setLoading(true);
	
			try {
				const API = `${config.api}/study-posts/limit=3&offset=0`;
				const response = await axios.get(API);
				setPosts(response.data.study_posts);

			} catch (e) {
				console.log(e);
			}
	
			setLoading(false);
		}

		fetchGet();
	}, []);

	const filterPost = (techStack) => {
		posts.filter(post => {
			return post.techStack === techStack;
		})
	}

	if (loading) {
		return <PostListBlock>대기 중...</PostListBlock>
	}

	if (!posts) {
		return null;
	}


	return (
		<PostListBlock>
			<Header />
			
			<PostWrapper>
				<Text bold size="28" marginBottom="24">
					나에게 맞는 모임을 찾아보세요!
				</Text>
				
				<Formgroup>
					<Input placeholder="키워드를 검색해보세요" />
					<SearchButton type="submit">검색</SearchButton>
				</Formgroup>

				{/* <FilterBlock>
					<Button onClick={() => filterPost("react")}>React.js</Button>
					<Button>Go</Button>
				</FilterBlock> */}

				<PostBlock>
					{/* {posts.map(post => (
						<PostCard post={post} />
					))} */}

					<PostCard post={posts} />

				</PostBlock>
			</PostWrapper>
		</PostListBlock>
	);
};

const PostListBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 160vh;
`;

const PostWrapper = styled.div`
	width: 75%;
	height: 150vh;
	padding: 50px 20px 40px;
	background-color: #fff;
	border-radius: 8px;
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Formgroup = styled.form`
	margin: 16px 0;
	width: 40vw;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Input = styled.input`
	width: 250px;
	border: none;
	border-bottom: 1px solid #666;
	margin-right: 8px;
	padding: 4px 10px;
	font-size: 11px;
`;

const SearchButton = styled.button`
	border: 2px solid #888;
	border-radius: 4px;
	background-color: transparent;
	width: 60px;
	padding: 2px 12px;
	font-size: 11px;
	cursor: pointer;
`;

const FilterBlock = styled.div`
	width: 50vw;
	padding: 0 60px;
`;

const Button = styled.button`
	border: 2px solid #eee;
	border-radius: 4px;
	background-color: transparent;
	width: auto;
	padding: 4px 12px;
	font-size: 12px;
	margin-bottom: 2px;
	margin-right: 4px;
	cursor: pointer;
`;

const PostBlock = styled.div`
	width: 90%;
	height: auto;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
`;

export default SearchPage;