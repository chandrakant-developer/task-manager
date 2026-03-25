const Tag = require('../models/tag.model');
const ERRORS = require('../utils/errorCodes');

exports.getTags = async (userId) => {
  let query = {};

  if (userId) {
    query = { $or: [{ userId: null }, { userId: userId }] };
  } else {
    query = { userId: null };
  }

  const tags = await Tag.find(query).sort({ isDefault: -1, name: 1 });

  if(tags.length === 0) {
    throw new Error(ERRORS.TAG_ERRORS.TAG_NOT_FOUND);
  }

  return tags;
};

exports.createTag = async (name, userId) => {
  name = name.trim();
  userId = userId | null;

  if (!name) {
    throw new Error(ERRORS.TAG_ERRORS.TAG_NAME_REQUIRED);
  }

  const existingTag = await Tag.findOne({
    name,
    $or: [
      { userId: null },
      { userId: userId }
    ]
  });

  if (existingTag) {
    throw new Error(ERRORS.TAG_ERRORS.TAG_EXISTS);
  }

  const newTag = await Tag.create({
    name,
    userId,
    isDefault: false
  });

  return newTag;
}

exports.deleteTag = async (id, userId) => {
  const tag = await Tag.findById(id);

  if (!tag) {
    throw new Error(ERRORS.TAG_ERRORS.TAG_NOT_FOUND);
  }

  if (tag.isDefault) {
    throw new Error(ERRORS.TAG_ERRORS.DEFAULT_TAG);
  }

  if (tag.userId && tag.userId !== userId) {
    throw new Error(ERRORS.TAG_ERRORS.UNAUTHORIZED);
  }

  await Tag.findByIdAndDelete(id);
};