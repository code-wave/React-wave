import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Text, Loader } from '../elements';
import bannerImage from '../assets/image/main_banner.png';
import PostCard from '../components/board/PostCard';
import CardDetail from '../pages/CardDetail';
import Header from '../shared/Header'; 
import Footer from '../shared/Footer'; 
import { config } from "../shared/config";
import axios from 'axios';
// import { withRouter } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';


const MainPage = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);

			try {
				const API = `${config.api}/study-posts/limit=4&offset=0`;
				const response = await axios.get(API);
				console.log(response.data.study_posts);
				setPosts(response.data.study_posts);
				console.log(posts);

			} catch (e) {
				console.log(e);
			}

			setLoading(false);
		}

		fetchPost();
	}, []);

	if (loading) {
		return (
				<Loader type="spin" color="#2581d6" message={"Loading 중..."} />
		);
	}

	if (!posts) {
		return null;
	}


	return (
		<MainBlock>
			<Header />

			<HeaderBlock>
				<ImageBlock>
					<MainImage src={bannerImage}/>
				</ImageBlock>

					<TextBlock>
						<Text bold size="36" color="#000" marginBottom="36">
							개발자들의 공간, Code Wave
							</Text>
						<Text size="18" color="#000">
							Code Wave는 프로젝트나 스터디를 하기 위해 <br /> 팀원이 필요한
							개발자들이 한데 모여 <br />다양한 기술스택과 분야를 가진 사람들과 함께 할 수 있는 <br />
							웹 기반 플랫폼입니다. 
						</Text>
					</TextBlock>
			</HeaderBlock>

			<BodyBlock>
				<SearchBlock>
					<SearchText>
						원하는 모임을 찾아보세요!
					</SearchText>
					
					<Formgroup>
						<Input placeholder="키워드 검색" />
						<SearchButton type="submit">검색</SearchButton>
					</Formgroup>
				</SearchBlock>

				<PostBlock>
					{posts.map(p => (
						<PostCard key={p.id} post={p} />
					))}
				</PostBlock>
				</BodyBlock>
			<Footer />

		</MainBlock>
	);
};

const MainBlock = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 200vh;
`;

const HeaderBlock = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 0 150px;
	padding-top: 40px;
	padding-bottom: 80px;
	border-bottom: 1px solid #777;
	margin-top: 50px;
`;

const ImageBlock = styled.div`
	width: 380px;
	height: auto;
	margin-right: 50px;
`;

const MainImage = styled.img`
	width: 100%;
	height: 100%;
`;

const TextBlock = styled.div`
	width: 550px;
	margin-top: 30px;
	margin-left: 20px;
`;

const BodyBlock = styled.div`
	position: relative;
	height: 185vh;
`;

const SearchBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 70px auto 50px;
`;

const SearchText = styled.div`
	font-size: 28px;
	font-weight: 700;
	margin: 0 auto 32px;
`;

const PostItem = styled.div`
	width: 250px;
	height: 250px;
	border: 1px solid #888;
	border-radius: 16px;
	margin-right: 40px;
`;

const Formgroup = styled.form`
	margin: 16px 0 24px;
	width: 40vw;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Input = styled.input`
	width: 350px;
	border: none;
	border-bottom: 1px solid #666;
	margin-right: 8px;
	padding: 4px 10px;
	font-size: 16px;

	&:active {
		border: none;
	}
`;

const SearchButton = styled.button`
	border: 2px solid #888;
	border-radius: 6px;
	background-color: transparent;
	width: 80px;
	padding: 6px 14px;
	font-size: 14px;
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

export default MainPage;