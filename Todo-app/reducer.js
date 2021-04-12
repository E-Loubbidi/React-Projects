import { combineReducers } from "redux";
import filtersReducer from "./features/filters/filtersSlice";
import todosReducer from "./features/todos/todosSlice";

// export default function rootReducer(state = {}, action) {
//     return {
//         todos: todosReducer(state.todos, action),
//         filters: filtersReducer(state.filters, action)
//     }
// }

const rootReducer = combineReducers({
    todos: todosReducer,
    filters: filtersReducer
});

export default rootReducer;