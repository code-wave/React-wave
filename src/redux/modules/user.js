import { createAction, handleActions } from 'redux-actions';
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookies";
import { SuccessAlert, ErrorAlert } from "../../shared/Alerts";
import { produce } from 'immer';
import axios from "axios";
import { config } from "../../shared/config";


const SET_USER = 'SET_USER';
const LOG_OUT = 'LOG_OUT';

const setUser = createAction(SET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

const initialState = {
  user: null,
  isLogin: false,
};

const signupAPI = (email, pw, nickname) => {
  return function (dispatch, getState, { history }) {
    const API = `${config.api}/users/signup`;
    axios({
      method: "post",
      url: API,
      data: {
        email: email,
        password: pw,
        nickname: nickname,
      },
    })
      .then((res) => {
        let nickname = res.data.nickname;
        let id = res.data.id;

        // console.log(nickname, id);
        SuccessAlert("회원가입 성공!");
        history.push('/login');

      })
      .catch((err) => {
        console.log("회원가입에러:", err.response.data.message);
        ErrorAlert("회원가입 실패😭");
      })
  }
}

const loginAPI = (email, pw) => {
  return function (dispatch, getState, { history }) {
    const API = `${config.api}/auth/users/login`;
    axios({
      method: "post",
      url: API,
      data: {
        email: email,
        password: pw,
      },
    })
      .then((res) => {
        console.log(res.data);

        if(res.data === "wrong email") {
          ErrorAlert("올바르지 않은 이메일입니다. 다시 입력해 주세요.");
          return;
        }

        if(res.data === "wrong password") {
          ErrorAlert("올바르지 않은 비밀번호입니다. 다시 입력해 주세요.");
          return;
        }

        const userInfo = {
          id: res.data.user.id,
          email: res.data.user.email,
          nickname: res.data.user.nickname,
        }
        console.log(userInfo);

        dispatch(setUser(userInfo));
      })
      .catch((err) => {
        console.log(err.response.data);
        ErrorAlert("이메일 또는 패스워드를 다시 확인해주세요.");
      })
  }
}

//현재 로그인한 유저정보API
const loginCheckAPI = () => {
  return function (dispatch, getState, { history }) {

    const API = `${config.api}/api/mypage/profile`;
    axios({
      method: "get",
      url: API,
    })
      .then((res) => {
        dispatch(setUser({
          id: res.data.userid,
          nickname: res.data.nickname,
          username: res.data.username, //email
          nowteamcnt: res.data.nowTeamCnt,
          applyteamid: res.data.applyTeamIdList,
        }))
      }).catch((err) => {
        console.log('로그인체크에러:', err);
      })
  }
}


//프로필수정하기
const editProfileAPI = (formData) => {
  return function (dispatch, getState, { history }) {
    const API = `${config.api}/api/mypage/profile`
    axios({
      method: "put",
      url: API,
    })
      .then((res) => {
        SuccessAlert("수정완료")
        dispatch(setUser({
          id: res.data.id,
          nickname: res.data.nickname,
          email: res.data.email, 
        }));

        //해당 유저의 마이페이지로 이동
        history.push(`/mypage/${res.data.id}`);
      })
      .catch((err) => {
        console.log("포지션수정 에러" , err);
        ErrorAlert(`${err.response.data.msg}`);
      })
  }
}

const logout = () => {
  return function (dispatch, getState, { history }) {
    dispatch(logOut());
    history.replace('/');
  }
}

//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) => produce(state, (draft) => {
      draft.user = action.payload;
      draft.isLogin = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft) => {
      draft.user = null;
      draft.isLogin = false;
    }),

  }, initialState);

const actionCreators = {
  signupAPI,
  loginAPI,
  loginCheckAPI,
  logout,
  editProfileAPI,
  //isLogin
};

export { actionCreators };