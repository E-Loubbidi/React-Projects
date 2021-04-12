import React from 'react';
// import { shallowEqual } from 'react-redux';
import {useSelector} from 'react-redux';
import TodoListItem from './TodoListItem';
import { selectFilteredTodoIds } from './todosSlice';

// const selectTodos = state => state.todos;
// const selectTodosIds = state => state.todos.map(todo => todo.id);

const TodosList = () => {
    // const todosIds = useSelector(selectTodosIds, shallowEqual);
    const todosIds = useSelector(selectFilteredTodoIds);
    const loadingStatus = useSelector(state => state.todos.status)

    if (loadingStatus === 'loading') {
      return (
        <div className="todo-list">
          <div className="loader" />
        </div>
      )
    }

    const renderedListItems = todosIds.map(todoId => {
        return <TodoListItem key={todoId} id={todoId} />
    });

    return <ul className="todo-list">{renderedListItems}</ul>
};

export default TodosList;