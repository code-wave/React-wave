import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Down } from '../media/svg/SvgIcon';
import { useDispatch } from 'react-redux';
import { addFilter, removeFilter } from '../redux/modules/filter';
import { setFilteredPostAWS } from '../redux/modules/post';


const Filter = (props) => {
	//부모 컴포넌트로부터 is_first와 category를 props로 받아옴
	//is_first: "난이도"에만 있음 (처음에 유저가 들어왔을 때 난이도 박스의 내용은 보이도록)
	//category: "난이도", "프로그래밍 언어", "문제 모음" 등의 필터 제목
	const { is_first, category } = props;

	const dispatch = useDispatch();
	const filter_box = React.useRef();
	const [tog, setTog] = React.useState(true); //초기값은 true(안 보임)
	const [arr, setArr] = React.useState([]); // 화면에 보여질 필터 리스트
		
		//사용자가 선택한 한글 카테고리를 영어명으로 리턴하는 함수
    const GetCategory = (val) => {
        switch(val){
            case "난이도":
                return "level";
            case "프로그래밍 언어":
                return "language";
            case "문제 모음":
                return "reference";
            default:
                return null;
        }
    };

		//필터리스트 내용을 토글시킴 (보였다 안 보였다 하게)
		const Toggle = () => {
			// tog 변수가 true이면 
			if (tog) {
				//filter_box 안 보이게 해 주고
				filter_box.current.style.height = '0';
				filter_box.current.style.display = 'none';
				//tog 변수를 false로 바꿈
				setTog(false);

			// tog 변수가 false이면
			} else {
				// filter_box를 보이게 하고
        filter_box.current.style.display = 'block';
				filter_box.current.style.height = 'auto';
				//tog 변수를 true로 바꿈
        setTog(true);
      }
    };

		const AddFilter = (e) => {
				//입력받은 checked의 상태 (사용자가 체크박스를 누름)
				let checked = e.target.checked;
				//label 선택 (checkbox에서 한 층 위(부모노드)로 올라가서 자식노드 중 2번째([1], lable)의 text값을 가져옴)
				let val = e.target.parentNode.childNodes[1].textContent;
				//영어명으로 바꾼 카테고리를 일시 저장
        let temp = GetCategory(category);

				//checked가 true이면
        if (checked) {
            // 필터 추가
            dispatch(addFilter(val, temp)); //리덕스에 보내고
						dispatch(setFilteredPostAWS(val, temp)); //AWS에도 보냄
				//checked가 false이면
        } else {
            // 필터 삭제
            dispatch(removeFilter(val, temp)); //리덕스에 보내고
            dispatch(setFilteredPostAWS(val, temp)); //AWS에도 보냄
        }
    };

	React.useEffect(() => {
			//list_arr 빈 배열 선언
			let list_arr = [];
			
			//category의 값에 따라 서버에 get 요청
			switch (category) {
					//"난이도"이면 filter 뒤에 level을 붙여 요청
					case "난이도":
						axios.get('http://54.180.113.24/filter/level')
						.then((res) => {
								//1) 받아온 데이터를 forEach로 꺼내서
								res.data.forEach((val) => {
										//list_arr 배열에 val의 'level' 요소를 추가
										list_arr.push(val.level);
								});
								//2) 화면에 보여질 필터리스트 배열에 list_arr 배열을 넣음
								setArr(list_arr);
							
								}).catch((err)=>{
										console.log(err);
								});
							break;
				
					//"프로그래밍 언어"이면 filter 뒤에 language를 붙여 요청
          case "프로그래밍 언어":
						axios.get('http://54.180.113.24/filter/language')
							.then((res) => {
								res.data.forEach((val) => {
										//list_arr에 val의 'language' 요소를 추가
										list_arr.push(val.language);
								});
								//arr(화면에 보여질 필터리스트)에 만든 list_arr 추가
								setArr(list_arr);
								
								}).catch((err)=>{
											console.log(err);
								});
							break;
				
          case "문제 모음":
						axios.get('http://54.180.113.24/filter/reference')
							.then((res) => {
								res.data.forEach((val) => {
										//list_arr에 val의 'reference' 요소를 추가
										list_arr.push(val.reference);
								});
								//화면에 보여질 필터리스트에 만든 list_arr 추가
								setArr(list_arr);

							}).catch((err) => {
									console.log(err);
							});
							break;
					default:
						return null;
        }
    }, []);

    return(
			<FilterContainer>
				{/* is_first가 true인 경우 (난이도) */}
        {is_first ? 
            (<>
						<div>
							{/* 헤더타이틀 부분 클릭 시 toggle 함수 실행 */}
                    <HeaderTitle onClick={Toggle}>
                        <Category>{category}</Category>
                        <span>
                            <Down />
                        </span>
                    </HeaderTitle>
                </div>
					</>)
					// is_first가 false(props로 넘어오지 않음)인 경우 (프로그래밍 언어, 문제 모음)
					:
            (<>
						<FilterHeader>
							{/* 헤더타이틀 부분 클릭 시 toggle 함수 실행 */}
                    <HeaderTitle onClick={Toggle}>
                        <span>{category}</span>
                        <span>
                            <Down />
                        </span>
                    </HeaderTitle>
                </FilterHeader>
					</>)}
				
				{/* filter_box는 ref로 잡고 toggle 실행 */}
				<FilterList ref={filter_box}>
					{/* arr: 각 선택한 category에 따라 서버에서 받아온 필터 배열 */}
					{arr.map((val, index) => {
									//GetCategory 함수로 한글명을 영어로 바꿈
                    let temp = GetCategory(category);
                    let name = `filter_${temp}_${index}`;
                    return (
											<List key={index}>
												{/* 체크박스 클릭 시 AddFilter 함수 실행 */}
												<FilterInput id={name} type='checkbox' onClick={AddFilter} />

												{/* 체크박스 옆의 label */}
												{/* htmlFor에 input의 id나 name을 적어 인풋과 연결 */}
												<FilterLabel htmlFor={name}>
														<span>{val}</span>
												</FilterLabel>
                      </List>
                    );
                })}
            </FilterList>
        </FilterContainer>
    );
};

Filter.defaultProps = {
    is_first : false,
    category : '',
    list : [],
};

const FilterContainer = styled.div`
    box-sizing: border-box;
`;

const FilterHeader = styled.div`
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 0.0625rem solid #D7E2EB;
`;

const HeaderTitle = styled.a`
    display: block;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        color: #0078FF;

				/* 타이틀의 아래쪽 화살표 */
        & svg {
					/* svg는 fill로 색을 바꾼다 */
          fill: #0078FF;
        }
    }

		/* 아래쪽 화살표 */
    & svg {
        float: right; //오른쪽 배치
        fill: #263747; //hover하기 전 기본색
        width: 1.5rem; //24px
        height: 1.5rem;
        transition: transform .2s;
    }
`;

//카테고리 제목 (화살표가 옆에 붙도록 span으로 지정)
const Category = styled.span`
    display: inline-block; //면적 속성도 가질 수 있게
    vertical-align: top; //위쪽에 정렬
    line-height: 1.5rem; //padding 대신 줄간격으로 아래쪽 간격을 띄워줌
    margin-top: 0;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 800;
`;

//필터리스트가 뜨는 전체 박스 (ul로 처리)
const FilterList = styled.ul`
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    list-style: none; //기본 li 앞에 붙는 가운데점 초기화 (ul에 작성!!)
    height: auto;
		//toggle 시 'height' 조절로 박스가 보였다 안 보였다 함 (transition 줘서 효과 부드럽게)
    transition: height .3s ease-out;
`;

//ul 안의 li 리스트 (안에 Input과 Lable이 들어있음)
const List = styled.li`
    position: relative;
    display: block; //li는 block 요소인데 굳이 왜..?
    margin-top: .5rem; //8px
    font-size: 14px;
    line-height: 1.5;
    letter-spacing: -0.009em; //글자간격 좁혀주기

		//li에 hover 시 글자 파란색
    &:hover {
        color: #0078FF;
    }
`;

//필터의 체크박스
const FilterInput = styled.input`
		//부모요소로부터 '절대적으로' 떨어져 있음
    position: absolute;
    left: 0;

		//none : HTML 요소에 정의된 클릭, 상태(hover,active등), 커서 옵션들을 비활성화
    pointer-events: none;
    opacity: 0;
    width: 0;
    height: 0;
    margin-left: -10px;

		//체크박스에 check 표시가 되었을 때
    &:checked + label:after{
			content: '';
			//체크표시 이미지
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

//필터의 체크박스 옆의 label
const FilterLabel = styled.label`
		//부모요소로부터 '상대적으로' 떨어져 있음
    position: relative;
    display: flex;
    align-items: center;
    padding: 0;
    margin-right: 1rem;
		//min-height: 지정된 HTML 요소가 가질 수 있는 최소 높이(height)
    min-height: unset; //unset: 부모로부터 상속할 값이 존재하면 상속값을(inherit), 그렇지 않다면 초깃값(initial) 사용. all 단축속성을 포함한 모든 속성에 사용 가능
    cursor: pointer;

    &:before {
        transition-duration: 0.08s;
        transition-property: all;
        transition-timing-function: ease-in-out;
        transition-delay: initial;
        font-size: 1.25rem;
        content: '';
        display: inline-block;
        margin-right: 0.5rem;
        width: 1.25rem;
        height: 1.25rem;
        min-width: 1.25rem;
        max-width: 1.25rem;
        border-radius: 0.25rem;
        border: 0.125rem solid #CDD7E0;

        ${List}:hover & {
            background-color: #263747;
            border: 0.125rem solid #263747;
        }
    }

    & span {
        font-size: 14px;
        font-weight: 400;
    }
`;

export default Filter;