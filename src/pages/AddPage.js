import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
// import SearchPlace from './SearchPlace';
import { useDispatch } from "react-redux";
// import { actionCreators } from "../redux/modules/post";
import { Text, Input, Checkbox } from '../elements';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import Header from '../shared/Header';
import { WarningAlert } from "../shared/Alerts";
import { config } from "../shared/config";
import axios from 'axios';
import API from '../shared/config';
import Arrow from "../assets/image/arrow.jpg";


const AddPage = (props) => {
  const dispatch = useDispatch();
	const filter_box = React.useRef();
	const [arr, setArr] = useState([]);
	const [is_filter, setIsFilter] = useState(false);
	const { history } = props;

	//회원 기입사항
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [memberNum, setMemberNum] = useState();
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [user_id, setUserId] = useState(1);
	// const [is_online, setIsOnline] = useState(false);
	const [location, setLocation] = React.useState("온라인");
	const [techStack, setTechStack] = useState("");
	const [techStackList, setTechStackList] = useState([]);
	const [color, setColor] = useState("black");


	useEffect(() => {
		//렌더링 되자마자 서버에서 tech_stack 리스트를 받아옴
		const fetchGetSkills = async () => {
				try {
				const API = `${config.api}/tech-stacks`;
					const response = await axios.get(API);
					console.log(response);
					setTechStackList(response.data.tech_stack);
			} catch (e) {
				console.log(e);
			}
		}

		fetchGetSkills();
	}, []);


	// const PostSkills = async () => {
	// 	alert(1);

	// 	techStackList.forEach(techStack => {
	// 		setTechStack(techStack);
	// 	});

	// 	axios({
	// 		method: 'post',
	// 		url: `${config.api}/tech-stack`,
	// 		data: { 'tech_name' : techStack }
	// 	}).then(res => {
	// 		console.log(res.data);
	// 		alert(res);
	// 	}).catch(err => {
	// 		console.log(err.response.data);
	// 	})
		
  //   // history.push("/mypage");
	// }

	const AddFilter = (e) => {
		let active = e.target.active;
		let val = e.target.parentNode.childNodes[1].textContent;
		
		if (active) {
			setIsFilter(false);
			setColor("#0078FF");
			// techStackList.push(val);
		} else {
			setIsFilter(true);
			setColor("#000");
			// techStackList.splice(val,1);
		}
	};

	// //기술스택 - 엔터 시 기술스택 내용 처리
	// const onClick = (e) => {
	// 	const nextStack = techStack.concat(inputSkill);
	// 	setTechStack(nextStack);
	// 	setInputSkill('');
	// }

	// //기술스택 - 엔터치면 아래에 등록
	// const onKeyPress = (e) => {
	// 	if (e.key === 'Enter') {
	// 		onClick();
	// 	}
	// }

	const skill_box = useRef();

	//X 버튼 - 등록된 기술스택 삭제
	const deleteSkill = (e) => {
		skill_box.current.style.height = '0';
		skill_box.current.style.display = 'none';
	}

	const fetchPost = async () => {
		// alert(1);

		const requestBody = {
				title: title,
				content: content,
				num_of_members: Number(memberNum),
				start_date: startDate,
				end_date: endDate,
				user_id: user_id,
				// is_online: is_online,
				is_online: location,
				tech_stack: techStack
			}
		
		console.log(requestBody);
		
		axios({
			method: 'post',
			url: `${config.api}/study-post`,
			data: requestBody
			// console.log(data);
		}).then(res => {
			console.log(res.data);
		}).catch(err => {
			// console.log(data);
			console.log(err.response.data);
		})
		
    // history.push("/mypage");
	}

		const GetCategory = (val) => {
        switch(val){
            case "react":
                return "level";
            case "프로그래밍 언어":
                return "language";
            case "문제 모음":
                return "reference";
            default:
                return null;
        }
    };

	return (
		<AddBlock>
			<Header />

			<AddWrapper>
				<AddHeader>
					<Title>모임 만들기</Title>
				</AddHeader>

				<Text bold size="16" marginTop="20" marginBottom="6">
					모임제목
				</Text>
				<input
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					/>
					
					<Text bold size="16"  marginTop="20" marginBottom="6">
						기술스택
				</Text>

				<LanguageInput type='text' value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder="React/Go" />

				{/* <TechStackList ref={filter_box}>
					{techStackList.map(techStack => (
						<List
							key={techStack}
							onClick={AddFilter}
						>
							{techStack}
						</List>
					))}
				</TechStackList> */}
				
							{/* <SkillInput
								placeholder="검색"
								value={inputSkill}
								onChange={(e) => setInputSkill(e.target.value)}
								onKeyPress={onKeyPress}
							/>

							<SkillList ref={skill_box}>
								{techStack.map((value, index) => (
									<List key={index}>
										{value}
										<DeleteBtn onClick={deleteSkill}>&times;</DeleteBtn>
									</List>
								))}
				</SkillList> */}

				<Text bold size="16" marginTop="20" marginBottom="6">
					모임정원
				</Text>
					<input
						value={memberNum}
						onChange={(e) => setMemberNum(e.target.value)}
					/>
						&nbsp;<span style={{ fontSize:"14px"}}>명</span>
					<br />

					<Text bold size="16" marginTop="20" marginBottom="6">
						모임형태
				</Text>
				<SelectBox
					value={location}
					onChange={(e) => setLocation(e.target.value)}
				>
          <option value="온라인">온라인</option>
          <option value="오프라인">오프라인</option>
				</SelectBox>
				
				{/* <input
					type="checkbox"
						value={is_online}
						onclick={(e) => setIsOnline(true)}
					/>
					<span>온라인</span>

					<Input
						type="checkbox"
						height="24"
							value={is_online}
							onClick={(e) => setIsOnline(false)}
					/>
					<span>오프라인</span> */}

				<Text bold size="16" marginTop="20" marginBottom="6">
					모임기간
				</Text>
						<SDatePicker
							dateFormat="yyyy년 MM월 dd일"
							selected={startDate}
							onChange={date => setStartDate(date)}
							selectsStart
							locale={ko}
							minDate={new Date()}
							placeholderText="📅 시작날짜 선택"
							startDate={startDate}
							closeOnScroll={true}
						/>
						&nbsp; - &nbsp;
						<SDatePicker
							dateFormat="yyyy년 MM월 dd일"
							selected={endDate}
							onChange={date => setEndDate(date)}
							selectsEnd
							locale={ko}
							minDate={new Date()}
							placeholderText="📅 끝나는 날짜 선택"
							endDate={endDate}
							closeOnScroll={true}
						/>

					<Text bold size="16" marginTop="20" marginBottom="4">
						모임 상세정보
					</Text>
					<textarea
								placeholder="모임에 대한 상세한 정보를 입력해 주세요."
								value={content}
								onChange={(e) => setContent(e.target.value)}
								rows="7" cols="80"
						/>

				<ButtonGrid>
					<AddButton
						type="submit"
						onClick={fetchPost}
					>
						개설완료
					</AddButton>
				</ButtonGrid>
			</AddWrapper>
		</AddBlock>
	);
};

const AddBlock = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	height: 180vh;
`;

const AddWrapper = styled.div`
	width: 640px;
	padding: 40px 50px 0;
	background-color: #fff;
	border: 2px solid #888;
	border-radius: 8px;
	margin-top: 50px;
`;

const AddHeader = styled.div`
	margin-bottom: 40px;
	width: 80%;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding-bottom: 18px;
	margin: 0 auto 42px;
	border-bottom: 1px solid #999;
`;

const Title = styled.p`
	font-size: 24px;
	font-weight: bold;
`;

const TechStackList = styled.ul`
	width: 500px;
	height: 50px;
`;


const FilterList = styled.ul`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none;
    height: auto;
    transition: height .3s ease-out;
`;

const FList = styled.li`
    position: relative;
    display: block;
    margin-top: .5rem;
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: -0.009em;
    :hover {
        color: #0078FF;
    }
`;

const FilterInput = styled.input`
    pointer-events: none;
    opacity: 0;
    width: 0;
    height: 0;
    left: 0;
    margin: 0 0 0 -10px;
    position: absolute;
    :checked + label:after{
        content: '';
        background: url('https://programmers.co.kr/assets/img-check-light-bcda1ac96cc8d1e2b0a4087aa60ff04b9b15d649a3b4b72a28f8f1112f42827b.png') no-repeat center;
        background-size: auto;
        background-size: cover;
        background-color: #263747;
        border: 0.35rem solid #263747;
        border-radius: 0.25rem;
        width: 0.875rem;
        height: 0.75rem;
        display: block;
        position: absolute;
        top: 0.1rem;
        left: 0.05rem;
    }
`;

	const List = styled.li`
    position: relative;
    display: inline-block;
    margin-top: .5rem;
		margin-right: .5rem;
		padding: 4px 12px;
    font-size: 14px;
    line-height: 1.5;
		cursor: pointer;
		border: 1px solid #0078FF;
		border-radius: 4px;
    letter-spacing: -0.009em;
    &:hover {
        color: #0078FF;
				/* border: 1px soild #0078FF; */
    }
    &.active {
        color: #0078FF;
				/* border: 1px soild #0078FF; */
    }
`;


const SelectBox = styled.select`
  padding: 7px 6px;
  outline: none;
  border: 1px solid #888;
  box-sizing: border-box;
  appearance: none;
  width: 170px;
  background: url(${Arrow}) no-repeat 98% 50%;
  background-size: 22px;
  background-color: ${props => props.theme.main_gray};
  font-size: 12px;
`;

const LanguageInput = styled.input`
  padding:4px 5px;
  box-sizing: border-box;
  outline: none;
  width:170px;
  border:1px solid lightgray;
  border-radius: 3px;
  &::placeholder{
    color:#C0C0C0;
  }
`;

const SkillInput = styled.input`
	width: 300px;
	height: 32px;
	padding: 8px 0 6px 10px;
	margin-right: 100px;
`;

const SkillList = styled.ul`
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	list-style: none;
	height: auto;
	`;

// const List = styled.li`
// 	display: inline-flex;
// 	justify-content: center;
// 	align-items: center;
// 	margin: 8px 8px 16px 0;
// 	padding: 0 8px 4px 12px;
// 	box-sizing: border-box;
// 	border: none;
// 	border-radius: 6px;
// 	background-color: #eae3fd;
// 	color: #6d13ff;
// 	font-weight: 700;
// `;

const DeleteBtn = styled.button`
	border: none;
	background-color: transparent;
	font-size: 22px;
	cursor: pointer;
	color: #c5c5f3;
`;

const SDatePicker = styled(DatePicker)`
	width: 140px;
	height: 24px;
	padding: 6px 12px;
	border-radius: 4px;
	border: 1px solid #c4c4c4;
	font-size: 12px;
`;

const ButtonGrid = styled.div`
	display: flex;
	justify-content: center;
`;

const AddButton = styled.button`
	width: 300px;
	margin: 40px auto;
	padding: 12px 0;
	font-size: 18px;
	font-weight: 700;
	border: none;
	border-radius: 8px;
	color: #fff;
	background-color: #4d4fdb;
	cursor: pointer;
`;

export default AddPage;