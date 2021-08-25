import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_LOGIN } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const updateProfile = (user) => async(dispatch, getState) => {
	try {
		dispatch({ type: USER_UPDATE_REQUEST });

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post('/api/users/profile', user, config);

		dispatch({ USER_UPDATE_SUCCESS, payload: data });

		dispatch({ USER_LOGIN, payload: data });

		localStorage.setItem('userInfo', JSON.stringify(data));
		
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
				? error.response.data.message
				: error.message,
		})
		
	}
}