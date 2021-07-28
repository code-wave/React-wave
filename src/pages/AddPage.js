import React, { useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { Text } from '../elements';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/esm/locale';
import Header from '../shared/Header';
import { config } from '../shared/config';
import axios from 'axios';
import Arrow from '../assets/image/arrow.jpg';
import "../assets/searchbar.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const TagItem = ({ tag, onRemove }) => (
	<>
		<Tag>
			{tag}
			<button onClick={() => onRemove(tag)}>X</button>
		</Tag>
	</>
);

const TagList = ({ tags, onRemove }) => (
	<TagListBlock>
		{tags.map(tag => (
			<TagItem key={tag} tag={tag} onRemove={onRemove} />
		))}
	</TagListBlock>
);

const AddPage = (props) => {
	const { history } = props;
	const quillRef = useRef();

	//회원 기입사항
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [memberNum, setMemberNum] = useState(0);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [user_id, setUserId] = useState(1);
	const [location, setLocation] = React.useState(true);

	const [skillName, setSkillName] = useState([
		"React", "Go", "Java", "React native", "Javascript",
	]);
	const [input, setInput] = useState('');
	const [results, setResults] = useState([]);
	const [localTags, setLocalTags] = useState([]);
	

	const matchName = (name, keyword) => {
		console.log(keyword);
		var keyLen = keyword.length;
		
		name = name.toLowerCase().substring(0, keyLen);
		console.log(name);

    if (keyword === "") return false;
    return name === keyword;
  };

	const onChange = text => {
		setInput(text);
		console.log(text);

		let nameArr = skillName.filter(item => true === matchName(item, text));
		console.log(nameArr);

		setResults(nameArr);
		console.log(results);
  };

	// 태그 삭제
		const onRemove = (tag) => {
		setLocalTags(localTags.filter(t => t !== tag));
	};

	//태그 추가
	const insertTag = (tag) => {
		if (!tag) return;
		if (localTags.includes(tag)) return;
			setLocalTags([...localTags, tag]);
	};

	const updateText = text => {
		//태그 추가 함수
		insertTag(text);
		//input창  초기화
		setInput("");
		//preview 항목 초기화
    setResults([]);
  };

  const renderResults = results.map((result, index) => {
    return (
			<div
			key={index}
      onClick={() => updateText(result)}
      className={`search-preview ${index === 0 ? "start" : ""}`}>
      <div className="first">
        <p className="name">{result}</p>
      </div>
    </div>
    );
  });

	//작성된 내용들을 백엔드로 보내기
	const fetchPost = async () => {
		const requestBody = {
			title: title,
			content: content,
			num_of_members: Number(memberNum),
			start_date: startDate,
			end_date: endDate,
			user_id: user_id,
			is_online: location,
			tech_stack: localTags
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
		
		history.push("/mypage");
	}

	const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
        ],
      },
    }),
    []
	);
	
	const formats = [
        //'font',
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'align', 'color', 'background',        
      ]

	
	
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

				<TagBoxBlock>
					<TagForm className="auto">
						<input
							className="search-bar"
							placeholder="Search"
							value={input}
							onChange={e => onChange(e.target.value)}
						/>

						{results.length > 0 ? (
							<div className="search-results">{renderResults}</div>
						) : null}
					</TagForm>
					<TagList tags={localTags} onRemove={onRemove} />
				</TagBoxBlock>

				<Text bold size="16" marginTop="20" marginBottom="6">
					모임정원
				</Text>
				<input
					type="text"
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
					onChange={(e) => { 
						if(e.target.value === "true") {
						setLocation(true)} else {setLocation(false)}}}
				>
          <option value="true">온라인</option>
          <option value="false">오프라인</option>
				</SelectBox>

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

				<ReactQuill
					style={{ height: "400px", overflow: "scroll"}}
						ref={quillRef}
						id="editor"
						placeholder="모임에 대한 상세한 정보를 입력해 주세요."
						value={content || ''}
						onChange={(content, delta, source, editor) => setContent(editor.getHTML())}
						modules={modules}
						formats={formats}
						theme="snow"
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
	height: 150vh;
`;

const AddWrapper = styled.div`
	width: 640px;
	padding: 30px 50px 0;
	background-color: #fff;
	border: 2px solid #b4b4b4;
	border-radius: 8px;
	margin-top: 60px;
`;

const AddHeader = styled.div`
	width: 80%;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0 auto 40px;
	border-bottom: 1px solid #999;
`;

const Title = styled.p`
	font-size: 24px;
	font-weight: bold;
`;

const TagBoxBlock = styled.div`
	width: 100%;
`;

const TagForm = styled.form`
	border-radius: 4px;
	display: flex;
	width: 300px;
`;

const Tag = styled.div`
	margin-right: 8px;
	border: 2px solid #0078ff;
	border-radius: 8px;
	padding: 4px 12px;
	color: #0078ff;

	button {
		color: #888;
		font-size: 12px;
		border: none;
		background: transparent;
		padding: 0 0 7px 7px;
		cursor: pointer;
	}
`;

const TagListBlock = styled.div`
	display: flex;
	margin-top: 30px;
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