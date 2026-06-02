const Todo = require('../models/todo.model');

const today = new Date().toLocaleDateString("en-CA");

const DEFAULT_TODOS = [
  {
    userId: 0,
    title: "Review code changes",
    description: "Go through commits and review the code quality.",
    completed: false,
    list: "Personal",
    tags: ["Important", "Planning"],
    dueDate: today,
  },
  {
    userId: 0,
    title: "Update project documentation",
    description: "Write setup instructions for the project.",
    completed: false,
    list: "Work",
    tags: ["Important", "In Progress"],
    dueDate: today,
  },
  {
    userId: 0,
    title: "Team Meeting Preparation",
    description: "Prepare agenda for weekly meeting.",
    completed: false,
    list: "Health",
    tags: ["Planning", "Important"],
    dueDate: today,
  },
  {
    userId: 0,
    title: "Deploy to production",
    description: "Deploy the latest version to production.",
    completed: false,
    list: "Work",
    tags: ["Important"],
    dueDate: today,
  },
];

async function seedTodos() {
  try {
    for (const todo of DEFAULT_TODOS) {
      const existingTodo = await Todo.findOne({
        title: todo.title,
        userId: 0,
      });

      if (!existingTodo) {
        await Todo.create({
          ...todo,
        });

        console.log(`Default todo "${todo.title}" created`);
      }
    }
  } catch (error) {
    console.error("Error seeding todos:", error.message);
  }
}

module.exports = seedTodos;