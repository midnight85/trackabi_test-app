import {
    SET_LOADING,
    END_LOADING,
    SET_ERROR,
    SET_USER,
    REMOVE_USER,
    SET_SELECTED_ORG,
    GET_PROJECTS
} from "../actions";
import {
    addUserToLocalStorage,
} from "../utils/localStorage";

const app_reducer = (state, action) => {
    switch (action.type) {
        case SET_LOADING: {
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        }
        case END_LOADING: {
            return {
                ...state,
                isLoading: false,
                isError: false
            }
        }
        case SET_ERROR: {
            const msg = action.payload ? action.payload : null
            return {
                ...state,
                isLoading: false,
                isError: true,
                errorsMsg: msg
            }
        }
        case SET_USER: {
            addUserToLocalStorage(action.payload)
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                isError: false
            }
        }
        case REMOVE_USER: {
            return {...action.payload}
        }

        case SET_SELECTED_ORG: {

            return {
                ...state,
                user:
                    {
                        ...state.user,
                        selectedOrg: action.payload
                    }
            }
        }
        case GET_PROJECTS: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                projects: action.payload
            }

        }
        default:
            throw new Error(`No Matching "${action.type}" - action type`);
    }

}
export default app_reducer