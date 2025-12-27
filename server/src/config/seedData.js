const List = require('../models/List');
const Tag = require('../models/Tag');

const DEFAULT_LISTS = ['Personal', 'Work', 'Shopping', 'Health', 'Travel'];
const DEFAULT_TAGS = ['Important', 'Low Priority', 'In Progress', 'Blocked', 'Planning'];

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

    console.log('Default data seeding completed');
  } catch (error) {
    console.error('Error seeding default data:', error.message);
  }
}

module.exports = seedDefaultData;
