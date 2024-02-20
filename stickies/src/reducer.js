import {
    LOGIN_STATUS,
    CLIENT,
    ACTIONS,
} from './constants';

export const initialState = {
    username: '',
    error: '',
    loginStatus: LOGIN_STATUS.PENDING,
    stickies: {},
    isStickiePending: false,
    isTodoPending: false,
    lastAddedStickieoId: '',
    lastAddedTodoId: '',
}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.LOG_IN:
            return {
                ...state,
                error: '',
                loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
                username: action.username,
            };
        case ACTIONS.LOG_OUT:
            return {
                ...state,
                error: '',
                isStickiePending: false,
                username: '',
                lastAddedStickieoId: '',
                stickies: {},
                loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
            };
        case ACTIONS.REPORT_ERROR:
            return {
                ...state,
                error: action.error || 'ERROR',
            }
        case ACTIONS.REPLACE_STICKIES: {
            const obj = {
                ...state,
                error: '',
                isStickiePending: false,
                stickies: action.stickies,
                lastAddedStickieoId: ''
            }
            return obj;
        }
        case ACTIONS.REPLACE_TODOS:
            return {
                ...state,
                error: '',
                isTodoPending: false,
                stickies: {
                    ...state.stickies,
                    [action.stickieId]: {
                        ...state.stickies[action.stickieId],
                        todos: action.todos
                    }
                },
                lastAddedTodoId: ''
            }
        case ACTIONS.START_LOADING_TODOS:
            return {
                ...state,
                error: '',
                isTodoPending: true
            }
        case ACTIONS.START_LOADING_STICKIES:
            return {
                ...state,
                error: '',
                isStickiePending: true
            }
        case ACTIONS.TOGGLE_TODO:
            return {
                ...state,
                stickies: {
                    ...state.stickies,
                    [action.stickieId]: {
                        ...state.stickies[action.stickieId],
                        todos: {
                            ...state.stickies[action.stickieId].todos,
                            [action.todo.id]: action.todo
                        }
                    }
                },
            }
        case ACTIONS.ADD_TODO:
            return {
                ...state,
                stickies: {
                    ...state.stickies,
                    [action.stickieId]: {
                        ...state.stickies[action.stickieId],
                        todos: {
                            ...state.stickies[action.stickieId].todos,
                            [action.todo.id]: action.todo
                        }
                    }
                },
            }
        case ACTIONS.ADD_STICKIE:
            return {
                ...state,
                stickies: {
                    ...state.stickies,
                    [action.stickie.id]: action.stickie,
                },
            }
        default:
            throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action });
    }
}

export default reducer;