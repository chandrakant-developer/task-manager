export function getListCounts(todos) {
  return todos.reduce((acc, todo) => {
    acc[todo.list] = (acc[todo.list] || 0) + 1;

    return acc;
  }, {});
}