const Tag = require('../models/tag.model');
const { ERRORS } = require("../constants");

exports.getTags = async (role, userId) => {
  let query = {};

  if (role === 'user') {
    query = { $or: [{ isDefault: true }, { userId }] };
  } else {
    query = { isDefault: true };
  }

  return await Tag.find(query).sort({ isDefault: -1, createdAt: 1 }).lean();
};

exports.createTag = async (name, userId) => {
  name = name.trim();

  const existingTag = await Tag.findOne({ name, userId });

  if (existingTag) {
    throw new Error(ERRORS.TAG_ERRORS.TAG_EXISTS);
  }

  return await Tag.create({ name, userId, isDefault: false });
}

exports.deleteTag = async (id, userId) => {
  const tag = await Tag.findById(id);

  if (!tag) {
    throw new Error(ERRORS.TAG_ERRORS.TAG_NOT_FOUND);
  }

  if (tag.isDefault) {
    throw new Error(ERRORS.TAG_ERRORS.DEFAULT_TAG);
  }

  if (tag.userId && Number(tag.userId) !== Number(userId)) {
    throw new Error(ERRORS.TAG_ERRORS.UNAUTHORIZED);
  }

  await tag.deleteOne();
};