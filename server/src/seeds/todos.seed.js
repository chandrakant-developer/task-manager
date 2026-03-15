const Todo = require('../models/todo.model');

const DEFAULT_TODOS = [
  {
    title: "Review code changes",
    description: "Go through commits and review the code quality.",
    completed: false,
    list: "Personal",
    tags: ["Important", "Planning"],
    dueDate: "2026-01-05",
  },
  {
    title: "Update project documentation",
    description: "Write setup instructions for the project.",
    completed: false,
    list: "Work",
    tags: ["Important", "In Progress"],
    dueDate: "2025-12-27",
  },
  {
    title: "Team Meeting Preparation",
    description: "Prepare agenda for weekly meeting.",
    completed: false,
    list: "Health",
    tags: ["Planning", "Important"],
    dueDate: "2025-12-28",
  },
  {
    title: "Deploy to production",
    description: "Deploy the latest version to production.",
    completed: false,
    list: "Work",
    tags: ["Important"],
    dueDate: "2025-12-29",
  },
];

async function seedTodos() {
  try {
    for (const todo of DEFAULT_TODOS) {
      const existingTodo = await Todo.findOne({
        title: todo.title,
        userId: null,
      });

      if (!existingTodo) {
        await Todo.create({
          ...todo,
          userId: null,
        });

        console.log(`Default todo "${todo.title}" created`);
      }
    }
  } catch (error) {
    console.error("Error seeding todos:", error.message);
  }
}

module.exports = seedTodos;