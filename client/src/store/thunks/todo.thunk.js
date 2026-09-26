import { getTodosService, getTodoCountsService, createTodoService, updateTodoService, deleteTodoService } from "../../services";
import { setTodos, setTodoLoading, setTodosLoaded, setTodoCounts, setTodoCountsLoading, addTodo, updateTodo, deleteTodo, toggleTodo } from "../slices/todo.slice";

export const fetchTodosThunk = (filter = "") => async (dispatch) => {
    try {
        dispatch(setTodoLoading(true));
        const res = await getTodosService(filter);
        dispatch(setTodos(res.data || []));
    } catch (error) {
        console.log("Fetch todos error:", error);
        dispatch(setTodos([]));
        throw error;
    } finally {
        dispatch(setTodoLoading(false));
        dispatch(setTodosLoaded(true));
    }
};

export const fetchTodoCountsThunk = () => async (dispatch) => {
    try {
        dispatch(setTodoCountsLoading(true));
        const res = await getTodoCountsService();
        dispatch(setTodoCounts(res.data));
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        dispatch(setTodoCountsLoading(false));
    }
};

export const createTodoThunk = (todoData) => async (dispatch) => {
    try {
        const res = await createTodoService(todoData);
        dispatch(addTodo(res.data));
        dispatch(fetchTodoCountsThunk());
    } catch (error) {
        console.log("Add todos error:", error);
        throw error;
    }
};

export const updateTodoThunk = (id, updates) => async (dispatch) => {
    try {
        const res = await updateTodoService(id, updates);
        dispatch(updateTodo(res.data));
        dispatch(fetchTodoCountsThunk());
    } catch (error) {
        console.log("Update todo error:", error);
        throw error;
    }
};

export const deleteTodoThunk = (id) => async (dispatch) => {
    try {
        await deleteTodoService(id);
        dispatch(deleteTodo(id));
        dispatch(fetchTodoCountsThunk());
    } catch (error) {
        console.log("Delete todo error:", error);
        throw error;
    }
};

export const toggleTodoThunk = (todo) => async (dispatch) => {
    try {
        const updatedData = {
            completed: !todo.completed
        };

        const res = await updateTodoService(todo._id, updatedData);
        dispatch(toggleTodo(res.data._id));
        dispatch(fetchTodoCountsThunk());
        return res;
    } catch (error) {
        console.log("Update todo error:", error);
        throw error;
    }
}