import * as todoApi from "../api/todo.api";

export const getTodosService = async (filter = "") => {
    const response = await todoApi.getTodosAPI(filter);
    return response.data;
}

export const getTodoCountsService = async () => {
    const response = await todoApi.getTodoCountsAPI();
    return response.data;
}

export const createTodoService = async (todoData) => {
    const response = await todoApi.createTodoAPI(todoData);
    return response.data;
}

export const updateTodoService = async (id, updates) => {
    const response = await todoApi.updateTodoAPI(id, updates);
    return response.data;
}

export const deleteTodoService = async (id) => {
    const response = await todoApi.deleteTodoAPI(id);
    return response.data;
}