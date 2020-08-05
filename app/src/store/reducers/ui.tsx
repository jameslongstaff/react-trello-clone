import * as actions from "../actions/ui";
import { Action } from "../types";

export interface UIState {
	loading: boolean,
	menuOpen: boolean;
}

const initialState: any = {
	loading: true,
	menuOpen: false,
};

const reducer = (state: any = initialState, action: Action) => {
	const { payload, type } = action;

	if (type === actions.TOGGLE_BOARD_MENU) {
		return {
			...state,
			menuOpen: !state.menuOpen,
		};
	}

	if (type === actions.OPEN_BOARD_MENU) {
		return {
			...state,
			menuOpen: true,
		};
	}

	if (type === actions.CLOSE_BOARD_MENU) {
		return {
			...state,
			menuOpen: false,
		};
	}

	if (action.type === actions.LOADING_START) {
		return {
			...state,
			loading: true
		};
	}

	if (action.type === actions.LOADING_END) {
		return {
			...state,
			loading: false
		};
	}

	return state;
};

export default reducer;
