import { createAction, handleActions } from 'redux-actions';
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookies";
import { SuccessAlert, ErrorAlert } from "../../shared/Alerts";
import { produce } from 'immer';
import axios from "axios";
import { config } from "../../shared/config";


const ADD_TEAM = "ADD_TEAM";

const addTeam = createAction(ADD_TEAM, (team) => ({ team }));

//팀메이킹 글 작성
export const addTeamMakingAPI = () => {
  return function (dispatch, getState, { history }) {
    // const token = getCookie('token');

    axios({
      method: "post",
      // header: {
      //   authorization: token,
      // },
      url: `${config.api}/api/team`,
      // data: formdata,
    }).then((res) => {

      dispatch(addTeam(res.data));
      history.push("/team");

    }).catch((err) => {
      console.log("팀메이킹 글작성 에러:", err);
    })

  }
}

const actionCreators = {
  addTeamMakingAPI,
};

export { actionCreators };