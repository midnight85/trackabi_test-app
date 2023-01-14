import React, {useContext, useEffect, useReducer} from "react";
import {
    getUserFromLocalStorage,
    addUserToLocalStorage,
    removeUserFromLocalStorage,

} from "../utils/localStorage";
import reducer from "../reducers/app_reducer"
import {
    SET_LOADING,END_LOADING,SET_ERROR, SET_USER, REMOVE_USER , SET_SELECTED_ORG, GET_PROJECTS,

} from "../actions";
import authHeader from "../utils/authHeaders";
import customFetch from "../utils/axios";

const AppContext = React.createContext()
const initialState = {
    user: {
        token: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        name: null,
        organizations: [],
        selectedOrg: null,
        freeOrganizationsCount: null,
        trialOrganizationsCount: null,
        avatar: null
    },
    projects: {},
    isLoading: false,
    isError: false,
    isSuccess:false,
    errorsMsg: {}
}
export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const login = async (email, password) => {
        dispatch({type: SET_LOADING})
        try {
            const response = await customFetch.post("/https://trackabi.com/user/login?realUtcOffset=120&timezone=Europe%2FKiev", JSON.stringify({
                LoginForm: {
                    email: email, password: password
                }
            }), {
                "headers": {
                    "accept": "application/json",
                    "content-type": "application/json",
                    "x-requested-with": "XMLHttpRequest",
                }
            });
            if (response.data.errors) {
                dispatch({
                    type: SET_ERROR, payload: {
                        email: response.data.errors.email, password: response.data.errors.password
                    }
                })
            }
            if (response.status === 200 && !!response.data.data.account) {
                console.log(response);
                const {
                    first_name,
                    last_name,
                    email,
                    phone,
                    name,
                    organizations,
                    freeOrganizationsCount,
                    trialOrganizationsCount,
                    avatar
                } = response.data.data.account
                const token = response.headers.authorization.split(' ')[1]
                dispatch({
                    type: SET_USER, payload: {
                        first_name,
                        last_name,
                        email,
                        phone,
                        name,
                        organizations,
                        selectedOrg:organizations[0],
                        freeOrganizationsCount,
                        trialOrganizationsCount,
                        avatar,
                        token
                    }
                })

            }
        } catch (error) {
            console.log(error)
            // dispatch({type:SET_ERROR)

        }
    }
    const logout = () => {
        dispatch({type: REMOVE_USER, payload: initialState})
        removeUserFromLocalStorage()
    };
    const handleSelectOrg = (e) => {
        const orgName = e.target.value
        const selected = state.user.organizations.find((item) => item.name === orgName)
        console.log(selected)
        dispatch({type: SET_SELECTED_ORG, payload: selected})
    }
    const fetchProjects = async () => {
        const orgAlias = state.user.selectedOrg?.alias
        if (orgAlias) {
            // https://orgName2.trackabi.com/project/list
            dispatch({type: SET_LOADING})
            try {
                const response = await customFetch.get(`/https://${orgAlias}.trackabi.com/project/list?`, authHeader());
                if (response.data.errors) {
                    dispatch({
                        type: SET_ERROR, payload: {
                            email: response.data.errors.email, password: response.data.errors.password
                        }
                    })
                }
                if (response.status === 200 && response.data.data.length === 0) {
                    dispatch({type: GET_PROJECTS, payload: null})
                }
                if (response.status === 200 && response.data.data.length > 0) {
                    dispatch({type: GET_PROJECTS, payload: response.data.data})
                }
            } catch (error) {
                console.log(error)
                // dispatch({type:SET_ERROR)

            }
        }
    }
    const addProject = async (formData) => {
        const orgAlias = state.user.selectedOrg?.alias
        console.log(formData)
        if (orgAlias) {
            dispatch({type: SET_LOADING})
            try {
                const response = await customFetch.post(`/https://${orgAlias}.trackabi.com/project/create?`,
                    JSON.stringify({
                        Project: formData
                    }),
                    authHeader());
                if (response.data.errors || !!response.data.globalError) {
                    console.log(response.data.globalError)
                    dispatch({
                        type: SET_ERROR, payload: {msg:response.data.globalError}
                    })
                }
                if (response.status === 200 && response.data.success ) {
                    alert('project created')
                    console.log(response)
                    dispatch({type: END_LOADING})
                    await fetchProjects()
                }

            } catch (error) {
                console.log(error)
                // dispatch({type:SET_ERROR)

            }
        }
    }

    useEffect(() => {
        const localUser = getUserFromLocalStorage()
        if (localUser) {
            dispatch({type: SET_USER, payload: localUser})
        }
    }, [])

    useEffect(() => {
        fetchProjects()
        addUserToLocalStorage(state.user)
    }, [state.user])
    const value = {
        state, login, logout, fetchProjects, handleSelectOrg, addProject
    }
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export const useAppContext = () => {
    return useContext(AppContext);
};