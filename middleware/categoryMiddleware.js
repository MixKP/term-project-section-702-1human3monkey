CategoryModel = require('../models/categoryModel');

function createCategoryMiddleware(db) {
  const categoryModel = new CategoryModel(db);

  return async (req, res, next) => {
    try {
      const categories = await categoryModel.getCategories();
      res.locals.categories = categories;
      next();
    } catch (error) {
      console.error('Error getting categories: ', error);
      res.status(500).json({ error: 'Error getting categories' });
    }
  }
}

module.exports = createCategoryMiddleware;