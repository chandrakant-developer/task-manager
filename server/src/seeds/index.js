const seedLists = require('./lists.seed');
const seedTags = require('./tags.seed');
const seedTodos = require('./todos.seed');
const seedUsers = require('./users.seed');

async function seedData() {
  await seedLists();
  await seedTags();
  await seedTodos();
  await seedUsers();
  
  console.log("Default data seeding completed");
}

module.exports = seedData;