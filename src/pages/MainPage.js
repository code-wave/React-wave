import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Text } from '../elements';
import bannerImage from '../assets/image/main_banner.png';
import PostCard from '../components/board/PostCard';
import Header from '../shared/Header';
import { BsBoxArrowRight } from 'react-icons/bs';
import { config } from "../shared/config";
import axios from 'axios';


const MainPage = ({ history }) => {
	const [posts, setPosts] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchPost = async () => {
			setLoading(true);

			try {
				const API = `${config.api}/study-post/1`;
				const response = await axios.get(API);
				setPosts(response.data.study_post);

			} catch (e) {
				console.log(e);
			}

			setLoading(false);
		}

		fetchPost();
	}, []);

	if (loading) {
		return <MainBlock>대기 중...</MainBlock>
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
						<Text bold size="36" color="#000" marginBottom="48">
							개발자들의 공간, Code Wave
							</Text>
						<Text size="18" color="#000">
							Code Wave는 프로젝트나 스터디를 하기 위해 <br /> 팀원이 필요한
							개발자들이 한데 모여 <br />다양한 기술스택과 분야를 가진 사람들과 함께 할 수 있는 <br />
							웹 기반 플랫폼입니다. 
						</Text>
					</TextBlock>
			</HeaderBlock>

			<AboutBlock>
				<TextBlock>
					<Text>
						CodeWave는 코딩 실력을 높이고 싶은 사람들이
						함께 모임을 결성하고 각자의 꿈을 이루어 나가기 위해
						파도와 같이 전진하는 곳입니다.
					</Text>
					<Text>
						
					</Text>
				</TextBlock>
				
			</AboutBlock>
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
	padding-top: 70px;
	padding-bottom: 60px;
`;

const ImageBlock = styled.div`
	width: 400px;
	height: auto;
	margin-right: 50px;
`;

const MainImage = styled.img`
	width: 100%;
	height: 100%;
`;

const TextBlock = styled.div`
	width: 550px;
	margin-top: 20px;
`;

const AboutBlock = styled.div`
	position: absolute;
	top: 400px;
	width: 80vw;
	height: 800px;
	border-top: 1px solid #888;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 60px auto;
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