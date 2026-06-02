const Tag = require('../models/tag.model');

const DEFAULT_TAGS = [
  'Important',
  'Low Priority',
  'In Progress',
  'Blocked',
  'Planning'
];

async function seedTags() {
  try {
    for (const tagName of DEFAULT_TAGS) {
      const existingTag = await Tag.findOne({
        name: tagName,
        userId: 0,
      });

      if (!existingTag) {
        await Tag.create({
          name: tagName,
          userId: 0,
          isDefault: true,
        });

        console.log(`Default tag "${tagName}" created`);
      }
    }
  } catch (error) {
    console.error("Error seeding tags:", error.message);
  }
}

module.exports = seedTags;