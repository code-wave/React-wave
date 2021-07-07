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

        console.log(nickname, id);
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
        console.log(res);

        const userInfo = {
          id: res.data.user.id,
          nickname: res.data.user.nickname,
        }

        let token = res.data.access_token.access_token;
        let expireTime = res.data.access_token.expires_at;
        // console.log(token, expireTime);
        setCookie(token, expireTime);

        console.log(userInfo);
        dispatch(setUser(userInfo));
        // let token = res.headers.authorization;
        // setCookie('token', token);

        // axios.defaults.headers.common['authorization'] = token;
        SuccessAlert("Welcome!");
        // history.replace('/');
      })
      .catch((err) => {
        ErrorAlert(`${err.response.data.message}`);
      })
  }
}

//현재 로그인한 유저정보API (새로고침해도 유지되게?)
const loginCheckAPI = () => {
  return function (dispatch, getState, { history }) {

    // const token = getCookie('token');
    // axios.defaults.headers.common['authorization'] = token;

    const API = `${config.api}/api/mypage/profile`;
    axios({
      method: "get",
      url: API,
    })
      .then((res) => {
        dispatch(setUser({
          id: res.data.userid,
          nickname: res.data.nickname,
          profileImage: res.data.profileImage,
          username: res.data.username, //email
          nowteamcnt: res.data.nowTeamCnt,
          applyteamid: res.data.applyTeamIdList,
          // description: descriptions,
          // position: res.data.position,
        }))
      }).catch((err) => {
        console.log('로그인체크에러:', err);
      })
  }
}


//프로필수정하기
const editProfileAPI = (formData) => {
  return function (dispatch, getState, { history }) {
    // const token = getCookie('token');
    // axios.defaults.headers.common['authorization'] = token;

    const API = `${config.api}/api/mypage/profile`
    axios({
      method: "put",
      url: API,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        // "authorization": token,
      },
    })
      .then((res) => {
        SuccessAlert("수정완료")
        dispatch(setUser({
          id: res.data.id,
          nickname: res.data.nickname,
          profileImage: res.data.profileImage,
          username: res.data.username, //email
          // description: res.data.description,
          // position: res.data.position,
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
    // deleteCookie('token');
    axios.defaults.headers.common['Authorization'] = null;
    delete axios.defaults.headers.common['Authorization'];
    SuccessAlert("See you soon")
    dispatch(logOut());
    history.replace('/');
  }
}

//reducer
export default handleActions(
  {
    [SET_USER]: (state, action) => produce(state, (draft) => {
      draft.user = action.payload.user;
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