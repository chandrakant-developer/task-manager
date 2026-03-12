const List = require('../models/List');
const Tag = require('../models/Tag');
const Todo = require('../models/Todo');

const DEFAULT_LISTS = ['Personal', 'Work', 'Shopping', 'Health', 'Travel'];

const DEFAULT_TAGS = ['Important', 'Low Priority', 'In Progress', 'Blocked', 'Planning'];

const DEFAULT_TODOS = [
  {
    title: "Review code changes",
    description: "Go through all the recent commits and review the code quality, check for improvements.",
    completed: false,
    list: "Personal",
    tags: ["Important", "Planning"],
    dueDate: "2026-01-05",
  },
  {
    title: "Update project documentation",
    description: "Write comprehensive documentation for the project including setup instructions.",
    completed: false,
    list: "Work",
    tags: ["Important", "In Progress"],
    dueDate: "2025-12-27",
  },
  {
    title: "Team Meeting Preparation",
    description: "Prepare agenda and materials for the weekly team sync meeting",
    completed: false,
    list: "Health",
    tags: ["Planning", "Important"],
    dueDate: "2025-12-28",
  },
  {
    title: "Deploy to production",
    description: "Deploy the latest version to production environment and verify all services.",
    completed: false,
    list: "Work",
    tags: ["Important"],
    dueDate: "2025-12-29",
  },
];

async function seedDefaultData() {
  try {
    for (const listName of DEFAULT_LISTS) {
      const existingList = await List.findOne({ name: listName, userId: null });

      if (!existingList) {
        await List.create({
          name: listName,
          userId: null,
          isDefault: true,
        });

        console.log(`Default list "${listName}" created`);
      }
    }

    for (const tagName of DEFAULT_TAGS) {
      const existingTag = await Tag.findOne({ name: tagName, userId: null });

      if (!existingTag) {
        await Tag.create({
          name: tagName,
          userId: null,
          isDefault: true,
        });

        console.log(`Default tag "${tagName}" created`);
      }
    }

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

    console.log("Default data seeding completed");
  } catch (error) {
    console.error("Error seeding default data:", error.message);
  }
}

module.exports = seedDefaultData;