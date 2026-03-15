const List = require('../models/list.model');

const DEFAULT_LISTS = [
  'Personal',
  'Work',
  'Shopping',
  'Health',
  'Travel'
];

async function seedLists() {
  try {
    for (const listName of DEFAULT_LISTS) {
      const existingList = await List.findOne({
        name: listName,
        userId: null,
      });

      if (!existingList) {
        await List.create({
          name: listName,
          userId: null,
          isDefault: true,
        });

        console.log(`Default list "${listName}" created`);
      }
    }
  } catch (error) {
    console.error("Error seeding lists:", error.message);
  }
}

module.exports = seedLists;