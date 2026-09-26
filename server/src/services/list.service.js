const List = require('../models/list.model');
const { ERRORS } = require("../constants");

exports.getLists = async (role, userId) => {
  let query = {};

  if (role === 'user') {
    query = { $or: [{ isDefault: true }, { userId }] };
  } else {
    query = { isDefault: true };
  }

  return await List.find(query).sort({ isDefault: -1, createdAt: 1 }).lean();
};

exports.createList = async (name, userId) => {
  name = name.trim();
  
  const existingList = await List.findOne({ name, userId });

  if (existingList) {
    throw new Error(ERRORS.LIST_ERRORS.LIST_EXISTS);
  }

  return await List.create({ name, userId, isDefault: false });
};

exports.deleteList = async (id, userId) => {
  const list = await List.findById(id);

  if (!list) {
    throw new Error(ERRORS.LIST_ERRORS.LIST_NOT_FOUND);
  }

  if (list.isDefault) {
    throw new Error(ERRORS.LIST_ERRORS.DEFAULT_LIST);
  }

  if (list.userId && Number(list.userId) !== Number(userId)) {
    throw new Error(ERRORS.LIST_ERRORS.UNAUTHORIZED);
  }

  await list.deleteOne();
}