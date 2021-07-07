import React from 'react';
import styled from 'styled-components';
import Header from '../../shared/Header';
import { Text } from '../../elements';


const Mypage = (props) => {
	return (
		<MypageBlock>
			<Header />

			<MyPageWrapper>
				
				<InfoHeader>
					<Text bold size="18" marginBottom="16">
						회원정보 수정
					</Text>
				</InfoHeader>
				
				<UserInfoBlock>
					<ProfileImage>
						<Image />
						<ImageChangeBtn>
							프로필이미지 수정
						</ImageChangeBtn>
					</ProfileImage>
			
					<UserInfo>
					<UserInfoHeader>
						<Text size="20" bold>CodeWave</Text>
						<InfoChangeBtn>회원정보 수정</InfoChangeBtn>
					</UserInfoHeader>
						
					<UserInfoBody>
						<table>
							<tr>
								<td><Text size="14" bold marginBottom="16">이메일</Text></td>
								<td>
									codewave@gmail.com
								</td>
							</tr>
							<tr>
								<td><Text size="14" bold marginBottom="16">닉네임</Text></td>
								<td>코드웨이브</td>
							</tr>
						</table>
					</UserInfoBody>
				</UserInfo>
				</UserInfoBlock>
				
			<PostBlock>
					<AppliedPost>
						<AppliedHeader>
							<Text bold size="18" marginBottom="16">
								신청한 모임
							</Text>
						</AppliedHeader>
				</AppliedPost>

					<LeadingPost>
						<LeadingHeader>
							<Text bold size="18" marginBottom="16">
								참여 중인 모임
							</Text>
						</LeadingHeader>

				</LeadingPost>
			</PostBlock>
			</MyPageWrapper>
		</MypageBlock>
	);
};

const MypageBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 180vh;
`;

const MyPageWrapper = styled.div`
	width: 900px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const UserInfoBlock = styled.div`
	display: flex;
	justify-content: center;
	width: 90%;
`;

const InfoHeader = styled.div`
	width: 90%;
	height: 60px;
	padding: 24px 50px 0;
	background: #fff;
	margin-top: 50px;
	border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const ProfileImage = styled.div`
	background-color: white;
	position: relative;
	padding: 25px;
	border: 1px solid #bdbdbd;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Image = styled.img`
	display: block;
	width: 280px;
	height: 280px;
	border: 1px solid #bdbdbd;
`;

const ImageChangeBtn = styled.button`
	cursor: pointer;
	border: none;
	background-color: transparent;
	border: 1px solid #bdbdbd;
	border-radius: 8px;
	padding: 8px 18px;
	font-size: 14px;
	font-weight: bold;
	margin-top: 16px;
`;

const UserInfo = styled.div`
	width: 780px;
	display: flex;
	flex-direction: column;
	font-size: 14px;
	padding: 20px 10px;
	border: 1px solid #bdbdbd;
	background-color: white;
	z-index: 5;
`;

const UserInfoHeader = styled.div`
	display: flex;
	justify-content: space-between;
	padding: 14px 20px;
	border-bottom: 1px solid #bdbdbd;
`;

const InfoChangeBtn = styled.button`
	cursor: pointer;
	border: none;
	background-color: transparent;
	border: 1px solid #bdbdbd;
	border-radius: 8px;
	padding: 4px 12px;
	font-size: 12px;
	font-weight: bold;
`;

const UserInfoBody = styled.div`
	display: flex;
	flex-direction: column;
	padding: 14px 10px;
`;

const PostBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 90%;
	margin: 20px 0;
	background-color: white;
	border: 1px solid #bdbdbd;
`;

const AppliedPost = styled.div`
	width: 80%;
	height: 300px;
	padding: 24px 20px 0;
`;

const AppliedHeader = styled.div`
	border-bottom: 1px solid #bdbdbd;
`;

const LeadingPost = styled.div`
	width: 80%;
	height: 300px;
	padding: 0 20px;
	border-bottom: 1px solid #bdbdbd;
`;

const LeadingHeader = styled.div`
	border-bottom: 1px solid #bdbdbd;
`;


export default Mypage;