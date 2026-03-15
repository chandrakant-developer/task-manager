const List = require('../models/list.model');
const ERRORS = require("../utils/errorCodes");

exports.getLists = async (userId) => {
  let query = {};

  if (userId) {
    query = { $or: [{ userId: null }, { userId: userId }] };
  } else {
    query = { userId: null };
  }

  const lists = await List.find(query).sort({ isDefault: -1, name: 1 });

  if(lists.length === 0) {
    throw new Error(ERRORS.LIST_ERRORS.LIST_NOT_FOUND);
  }

  return lists;
};

exports.createList = async (name, userId) => {
  name = name.trim();
  userId = userId | null;

  if (!name) {
    throw new Error(ERRORS.LIST_ERRORS.LIST_NAME_REQUIRED);
  }

  const existingList = await List.findOne({
    name,
    $or: [
      { userId: null },
      { userId: userId }
    ]
  });

  if (existingList) {
    throw new Error(ERRORS.LIST_ERRORS.LIST_EXISTS);
  }

  const newList = await List.create({
    name,
    userId,
    isDefault: false
  });

  return newList;
};

exports.deleteList = async (id, userId) => {
  const list = await List.findById(id);

  if (!list) {
    throw new Error(ERRORS.LIST_ERRORS.LIST_NOT_FOUND);
  }

  if (list.isDefault) {
    throw new Error(ERRORS.LIST_ERRORS.DEFAULT_LIST);
  }

  if (list.userId && list.userId !== userId) {
    throw new Error(ERRORS.LIST_ERRORS.UNAUTHORIZED);
  }

  await List.findByIdAndDelete(id);
}