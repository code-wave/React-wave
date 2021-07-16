import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from "axios";
import { config } from "../../shared/config";
import { getCookie } from "../../shared/Cookies";
// import { actionCreators as applyActions } from "../modules/apply";
import { SuccessAlert } from "../../shared/Alerts";

// const SET_TEAM = "SET_TEAM";
// const SET_NEXT_TEAM = "SET_NEXT_TEAM";
// const LOADING = "LOADING";
// const ADD_TEAM = "ADD_TEAM";
// const UPDATE_TEAM = "UPDATE_TEAM";
// const DELETE_TEAM = "DELETE_TEAM";
const SET_DETAIL_TEAM = "SET_DETAIL_TEAM";
// const SET_PARTICIPATION_HISTORY = "SET_PARTICIPATION_HISTORY";
// const SET_LEADER_HISTORY = "SET_LEADER_HISTORY";
// const DELETE_LEADER_HISTORY = "DELETE_LEADER_HISTORY";

// const setTeam = createAction(SET_TEAM, (teamList, next_page, init_more) => ({ teamList, next_page, init_more }));
// const setNextTeam = createAction(SET_NEXT_TEAM, (teamList, next_page, has_more) => ({ teamList, next_page, has_more }));
// const addTeam = createAction(ADD_TEAM, (team) => ({ team }));
// const deleteTeam = createAction(DELETE_TEAM, (teamId) => ({ teamId }));
// const updateTeam = createAction(UPDATE_TEAM, (teamId, team) => ({ teamId, team }));
// const loading = createAction(LOADING, (isLoading) => ({ isLoading }));
const setDetailTeam = createAction(SET_DETAIL_TEAM, (teamInfo) => ({ teamInfo }));
// const setParticipationHistory = createAction(SET_PARTICIPATION_HISTORY, (participationList) => ({ participationList }));
// const setLeaderHistory = createAction(SET_LEADER_HISTORY, (leaderList) => ({ leaderList }));
// const deleteLeaderHistory = createAction(DELETE_LEADER_HISTORY, (teamId) => ({teamId}));

const initialState = {
//   list: [],
//   page: 1,
//   hasMorePosts: true,
//   teamParticipationList: {},
//   teamLeaderList: [],
//   isLoading: false,
  teamInfo: {
    teamId: 0,
    title: "",
    createdAt: 1620627320595,
    recruit: 1620713709368,
    begin: 1620627309368,
    end: 1623305709368,
    location: "온라인",
    thumbnail: "https://images.unsplash.com/photo-1542181961-9590d0c79dab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    front: 0,
    back: 0,
    designer: 0,
    planner: 0,
    stack: "",
    contents: "",
    recruitState: "",
    projectState: "",
    leader: {
      id: 0,
      nickname: "",
      position: "",
      desc: "",
      profileImage: null
    }
  },
//   paging: { start: null, next: null, size: 9 },
}

// //팀메이킹 전체 조회
// const getTeamMakingAPI = (page, size = 9) => {
//   return function (dispatch, getState, { history }) {

//     dispatch(loading(true));
//     axios({
//       method: 'get',
//       url: `${config.api}/api/team?page=${page}&size=${size}`,
//     }).then((res) => {
//       if (typeof res.data === 'object') {
//         const next = page + 1;
//         dispatch(setTeam(res.data, next, true));
//       }

//     }).catch((error) => {
//       console.log(error);
//     });
//   }
// }

// //팀메이킹 무한스크롤
// const getNextTeamMakingAPI= (page, size) => {
//   return function (dispatch, getState, { history }) {
//     axios(`${config.api}/api/team?page=${page}&size=${size}`, {
//       params: {
//         page: page,
//         size: size,
//       },
//     })
//       .then((res) => {
//         res.data.length === 9?
//         dispatch(setNextTeam(res.data, page+1, true))
//         :dispatch(setNextTeam(res.data, page, false))
//         dispatch(loading(false));
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
// };

//팀메이킹 디테일 조회 
const getDetailTeamMakingAPI = (teamId) => {
  return function (dispatch, getState, { history }) {

    if (teamId === null) {
      return false;
    }

    axios({
      method: 'get',
      url: `${config.api}/api/team/detail?team_id=${teamId}`,
    }).then((res) => {

      dispatch(setDetailTeam(res.data));

    }).then((res) => {
			console.log(res);
      // if (getState()?.team?.teamInfo?.leader?.id === getState().user.user.id) {
      //   dispatch(applyActions.getApplyAPI(teamId));
      // }
    }).catch((error) => {
 
    })

  }
}

// //팀메이킹 글 작성 
// const addTeamMakingAPI = (formdata) => {
//   return function (dispatch, getState, { history }) {

//     const token = getCookie('token');

//     if (!formdata) {
//       return false;
//     }

//     axios({
//       method: "post",
//       header: {
//         authorization: token,
//       },
//       url: `${config.api}/api/team`,
//       data: formdata,
//     }).then((res) => {

//       dispatch(addTeam(res.data));
//       history.push("/team");

//     }).catch((err) => {
//       console.log("팀메이킹 글작성 에러:", err);
//     })

//   }
// }

// //팀메이킹 글 삭제 
// const deleteTeamMakingAPI = (teamId, move = 'team') => {
//   return function (dispatch, getState, { history }) {

//     if (teamId === null) {
//       return false;
//     }

//     axios({
//       method: 'delete',
//       url: `${config.api}/api/team/detail?team_id=${teamId}`,
//     }).then((res) => {

//       dispatch(deleteTeam(teamId));
//       dispatch(deleteLeaderHistory(teamId));
//       SuccessAlert("삭제 성공!")

//       if (move === 'team') {
//         history.replace('/team');
//       } else if (move === 'log') {
//         history.replace(`/userpage/${getState().user.user.id}`);
//       }
//     }).catch((err) => {
//       console.log('팀메이킹 글삭제 에러:', err);
//     })

//   }
// }

// //팀메이킹 글 수정 
// const updateTeamMakingAPI = (teamId, formData) => {
//   return function (dispatch, getState, { history }) {

//     if (teamId === null || formData === null) {
//       return false;
//     }

//     axios({
//       method: 'put',
//       url: `${config.api}/api/team/detail?team_id=${teamId}`,
//       data: formData,
//     }).then((res) => {

//       dispatch(updateTeam(teamId, res.data));
//       history.replace(`/team/detail/${teamId}`);

//     }).catch((err) => {
//       console.log('팀메이킹 글수정 에러:', err);
//     })

//   }
// }

// //유저가 지원한 팀프로젝트 목록 리스트
// const getUserApplyListAPI = ( otherId = null) => {
//   return function (dispatch, getState, { history }) {

//     let API;
//     if(otherId === null){
//       API = `${config.api}/api/mypage/apply`
//     }else{
//       API = `${config.api}/api/mypage/apply?user_id=${otherId}`
//     }

//     axios({
//       method: 'get',
//       url: API,
//     }).then((res) => {

//       dispatch(setTeam(res.data));

//     }).catch((err) => {
//       console.log('마이페이지 로그인 유저 지원한 프로젝트 조회 에러:', err);
//     })
//   }
// }

// //유저가 참여한 팀프로젝트 목록 리스트 (객체로 전달옴)
// const getUserParticipateListAPI = (otherId = null) => {
//   return function (dispatch, getState, { history }) {

//     let API;
//     if(otherId === null){
//       API = `${config.api}/api/mypage/team`
//     }else{
//       API = `${config.api}/api/mypage/team?user_id=${otherId}`
//     }
//     axios({
//       method: 'get',
//       url:API,
//     }).then((res) => {
//       //console.log('팀메이킹 프로필의 유저가 참여 프로젝트 목록::', res);


//       let myTeamHistory = {
//         activateProject: res.data.myTeamHistory.activatedProject,
//         finishedProject: res.data.myTeamHistory.finishedProject
//       }
//       dispatch(setParticipationHistory(myTeamHistory));

//     }).catch((err) => {
//       console.log('마이페이지 프로필의 유저 참여 프로젝트 조회 에러:', err);
//     })

//   }
// }

// //유저가 리더인 팀프로젝트 목록 리스트(객체로 전달옴)
// const getUserLeaderListAPI = (otherId = null) => {
//   return function (dispatch, getState, { history }) {
    
//     let API;
//     if(otherId === null){
//       API=`${config.api}/api/mypage/leader`
//     }else{
//       API=`${config.api}/api/mypage/leader?user_id=${otherId}`
//     }
//     axios({
//       method: 'get',
//       url: API,
//     }).then((res) => {
//       dispatch(setLeaderHistory(res.data));

//     }).catch((err) => {
//       console.log('마이페이지 로그인 유저 참여 프로젝트 조회 에러:', err);
//     })

//   }
// }

// //특정 유저가 참여한 팀프로젝트 목록 리스트
// const getMemberParticipateListAPI = () => {
//   return function (dispatch, getState, { history }) {

//     axios({
//       method: 'get',
//       url: `${config.api}`,
//     }).then((res) => {

//       dispatch(setParticipationHistory(res.data));

//     }).catch((err) => {
//       console.log('마이페이지 특정 유저 참여 프로젝트 조회 에러:', err);
//     })
//   }
// }

// //특정 유저가 리더인 팀프로젝트 목록 리스트
// const getMemberLeaderListAPI = () => {
//   return function (dispatch, getState, { history }) {

//     axios({
//       method: 'get',
//       url: `${config.api}`,
//     }).then((res) => {

//       dispatch(setLeaderHistory(res.data));

//     }).catch((err) => {
//       console.log('마이페이지 특정 유저 리더 프로젝트 조회 에러:', err);
//     })

//   }
// }

export default handleActions(
  {
//     [SET_TEAM]: (state, action) => produce(state, (draft) => {
//       draft.list = action.payload.teamList;
//       draft.isLoading = false;
//       draft.page = action.payload.next_page
//       draft.hasMorePosts = action.payload.init_more
//     }),
//     [SET_NEXT_TEAM]: (state, action) => produce(state, (draft) => {
//       draft.list = draft.list.concat(action.payload.teamList)
//       draft.page = action.payload.next_page
//       draft.hasMorePosts = action.payload.has_more
//     }),
//     [ADD_TEAM]: (state, action) => produce(state, (draft) => {
//       draft.list.push(action.payload.team);
//     }),
//     [UPDATE_TEAM]: (state, action) => produce(state, (draft) => {
//       let idx = draft.list.findIndex((t) => t.teamId === action.payload.teamId);
//       draft.list[idx] = { ...draft.list[idx], ...action.payload.team };
//     }),
//     [DELETE_TEAM]: (state, action) => produce(state, (draft) => {
//       draft.list = draft.list.filter((t) => t.teamId !== action.payload.teamId);
//     }),
//     [LOADING]: (state, action) => produce(state, (draft) => {
//       draft.isLoading = action.payload.isLoading;
//     }),
    [SET_DETAIL_TEAM]: (state, action) => produce(state, (draft) => {
      draft.teamInfo = action.payload.teamInfo;
    }),
//     [SET_PARTICIPATION_HISTORY]: (state, action) => produce(state, (draft) => {
//       draft.teamParticipationList = action.payload.participationList;
//     }),
//     [SET_LEADER_HISTORY]: (state, action) => produce(state, (draft) => {
//       draft.teamLeaderList = action.payload.leaderList;
//     }),
//     [DELETE_LEADER_HISTORY]: (state, action) => produce(state, (draft) => {
//       draft.teamLeaderList = draft.teamLeaderList.filter((team) => team.teamId !== Number(action.payload.teamId));
    // })
  }, initialState);


const actionCreators = {
//   getTeamMakingAPI,
//   getNextTeamMakingAPI,
  getDetailTeamMakingAPI,
//   addTeamMakingAPI,
//   deleteTeamMakingAPI,
//   updateTeamMakingAPI,
//   getUserApplyListAPI,
//   getUserParticipateListAPI,
//   getUserLeaderListAPI,
//   getMemberParticipateListAPI,
//   getMemberLeaderListAPI
};

export { actionCreators };