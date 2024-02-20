import { useEffect, useReducer } from 'react';

import reducer, { initialState } from './reducer';
import './App.css';
import './icons.css';

import {
  fetchSession, fetchLogin,
  fetchTodos, fetchLogout,
  fetchDeleteTodo, fetchUpdateTodo,
  fetchAddTodo, fetchDeleteStickie,
  fetchStickies, fetchAddStickie,
  fetchOnUpdateNotes
} from './services';
import {
  ACTIONS,
  SERVER,
  CLIENT,
  LOGIN_STATUS
} from './constants';

import Status from './Status';
import Loading from './Loading';
import LoginForm from './LoginForm';
import Header from './Header';
import Stickies from './Stickies';

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  function onLogin(username) {
    dispatch({ type: ACTIONS.START_LOADING_TODOS })
    fetchLogin(username)
      .then(fetchedStickies => {
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({ type: ACTIONS.REPLACE_STICKIES, stickies: fetchedStickies });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT })
    fetchLogout()
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  }

  function onRefresh() {
    dispatch({ type: ACTIONS.START_LOADING_STICKIES });
    fetchStickies()
      .then(stickies => {
        dispatch({ type: ACTIONS.REPLACE_STICKIES, stickies });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  }

  function onDeleteTodo(stickieId, id) {
    dispatch({ type: ACTIONS.START_LOADING_TODOS });
    fetchDeleteTodo(stickieId, id)
      .then(() => {
        return fetchTodos(stickieId);
      })
      .then(todos => {
        dispatch({ type: ACTIONS.REPLACE_TODOS, stickieId, todos })
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      })
  }

  function onDeleteStickie(stickieId) {
    dispatch({ type: ACTIONS.START_LOADING_STICKIES });
    fetchDeleteStickie(stickieId)
      .then(() => {
        return fetchStickies();
      })
      .then(stickies => {
        dispatch({ type: ACTIONS.REPLACE_STICKIES, stickies })
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      })
  }

  function onToggleTodo(stickieId, id) {
    fetchUpdateTodo(stickieId, id, { done: !state.stickies[stickieId].todos[id].done })
      .then(todo => {
        dispatch({ type: ACTIONS.TOGGLE_TODO, stickieId, todo });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  }

  function onAddTodo(stickieId, task) {
    fetchAddTodo(stickieId, task)
      .then(todo => {
        dispatch({ type: ACTIONS.ADD_TODO, stickieId, todo });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  }

  function onAddStickie(title, colour, type) {
    fetchAddStickie(title, colour, type)
      .then(stickie => {
        dispatch({ type: ACTIONS.ADD_STICKIE, stickie });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  }

  function onUpdateNotes(stickieId, noteContent) {
    fetchOnUpdateNotes(stickieId, noteContent)
      .then(() => {
        return fetchStickies();
      })
      .then(fetchedStickies => {
        dispatch({ type: ACTIONS.REPLACE_STICKIES, stickies: fetchedStickies });
      })
      .catch(err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  }

  function onCloseDialog() {
    onRefresh();
  }


  function checkForSession() {
    fetchSession()
      .then(session => {
        dispatch({ type: ACTIONS.LOG_IN, username: session.username });
        return fetchStickies();
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION })
        }
        return Promise.reject(err);
      })
      .then(stickies => {
        dispatch({ type: ACTIONS.REPLACE_STICKIES, stickies });
      })
      .catch(err => {
        if (err?.error === CLIENT.NO_SESSION) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return;
        }
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
  }

  useEffect(() => {
    checkForSession()
  }, []);

  return (
    <div className="app">
      {state.error && <Status error={state.error}></Status>}
      {state.loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting"> Loading user ...</Loading>}
      {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin} />}
      {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <div className="dashboard">
          <Header username={state.username} onLogout={onLogout} onRefresh={onRefresh} onAddStickie={onAddStickie} />
          <Stickies
            isStickiePending={state.isStickiePending}
            stickies={state.stickies}
            lastAddedStickieId={state.lastAddedStickieId}
            onDeleteStickie={onDeleteStickie}
            onUpdateNotes={onUpdateNotes}
            onCloseDialog={onCloseDialog}
            lastAddedTodoId={state.lastAddedTodoId}
            onDeleteTodo={onDeleteTodo}
            onToggleTodo={onToggleTodo}
            onAddTodo={onAddTodo}
          />
        </div>
      )}
    </div>
  )

}

export default App
