import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import './api/server';
import { fetchTodos } from './features/todos/todosSlice';

store.dispatch(fetchTodos());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// import store from './store';

// console.log('Initial state: ', store.getState());

// const unsubscribe = store.subscribe(() =>
//   console.log('State after dispatch: ', store.getState())
// );

// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about reducers' })
// store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about stores' })

// store.dispatch({ type: 'todos/todoToggled', payload: 0 })
// store.dispatch({ type: 'todos/todoToggled', payload: 1 })

// store.dispatch({ type: 'filters/statusFilterChanged', payload: 'Active' })

// store.dispatch({
//   type: 'filters/colorFilterChanged',
//   payload: { color: 'red', changeType: 'added' }
// });


// unsubscribe();

// store.dispatch({ type: 'todos/todoAdded', payload: 'Try creating a store' })
