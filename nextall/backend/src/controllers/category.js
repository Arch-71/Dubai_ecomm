const User = require('../models/User');
const Categories = require('../models/Category');
const SubCategories = require('../models/SubCategory');
const { singleFileDelete } = require('../config/uploader');
const getBlurDataURL = require('../config/getBlurDataURL');
const cloudinary = require('../config/cloudinary');
const { singleFileUploader } = require('../config/uploader');

const createCategory = async (req, res) => {
  try {
    const { name, metaTitle, slug, description, metaDescription, status, cover } = req.body;
    if (!cover || !cover.url) {
      return res.status(400).json({ success: false, message: 'No image URL provided' });
    }
    const blurDataURL = await getBlurDataURL(cover.url);
    await Categories.create({
      name,
      metaTitle,
      slug,
      description,
      metaDescription,
      status,
      cover: {
        _id: cover._id,
        url: cover.url,
        blurDataURL,
      },
    });
    res.status(201).json({ success: true, message: 'Category Created' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getAllHeaderCategories = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    await SubCategories.findOne();
    const categories = await Categories.find()
      .sort({
        createdAt: -1,
      })
      .select(['name', 'slug', 'subCategories'])
      .populate({ path: 'subCategories', select: ['name', 'slug'] });

    res.status(201).json({
      success: true,
      data: categories,
      ...(!userCount && {
        adminPopup: true,
      }),
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const getAllCategories = async (req, res) => {
  try {
    await SubCategories.findOne();
    const categories = await Categories.find()
      .sort({
        createdAt: -1,
      })
      .select(['name', 'slug'])
      .populate({ path: 'subCategories', select: ['name', 'slug'] });


    res.status(201).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getCategoriesByAdmin = async (req, res) => {
  try {
    const categories = await Categories.find()
      .sort({
        createdAt: -1,
      })
      .select(['name', 'slug']);

    res.status(201).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getCategoryByAdmin = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Categories.findOne({ slug });

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category Not Found',
      });
    }

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Categories.findOne({ slug }).select([
      'name',
      'description',
      'metaTitle',
      'metaDescription',
      'cover',
      'slug',
    ]);

    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category Not Found',
      });
    }

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const updateCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const { cover, ...others } = req.body;
    // Validate if the 'blurDataURL' property exists in the logo object
    if (!cover.blurDataURL) {
      // If blurDataURL is not provided, generate it using the 'getBlurDataURL' function
      cover.blurDataURL = await getBlurDataURL(cover.url);
    }
    await Categories.findOneAndUpdate(
      { slug },
      {
        ...others,
        cover: {
          ...cover,
        },
      },
      { new: true, runValidators: true }
    );

    res.status(201).json({ success: true, message: 'Category Updated' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Categories.findByIdAndDelete(id);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category Not Found',
      });
    }
    if (category.cover && category.cover._id) {
      await singleFileDelete(category.cover._id);
    }
    res.status(201).json({ success: true, message: 'Category Deleted Successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Categories.findOneAndDelete({ slug });
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Category Not Found',
      });
    }
    if (category.cover && category.cover._id) {
      await singleFileDelete(category.cover._id);
    }
    res.status(201).json({ success: true, message: 'Category Deleted Successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Existing deleteCategory (by slug or id in body) remains for backward compatibility

const getCategories = async (req, res) => {
  try {
    const { limit = 10, page = 1, search = '' } = req.query;

    const skip = parseInt(limit) || 10;
    const totalCategories = await Categories.find({
      name: { $regex: search, $options: 'i' },
    });
    const categories = await Categories.find(
      {
        name: { $regex: search, $options: 'i' },
      },
      null,
      {
        skip: skip * (parseInt(page) - 1 || 0),
        limit: skip,
      }
    ).sort({
      createdAt: -1,
    });

    res.status(201).json({
      success: true,
      data: categories,
      count: Math.ceil(totalCategories.length / skip),
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const getCategoriesSlugs = async (req, res) => {
  try {
    const categories = await Categories.find().select('slug');

    res.status(201).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const getSubCategoriesSlugs = async (req, res) => {
  try {
    const categories = await SubCategories.find()
      .select('slug')
      .populate({ path: 'parentCategory', select: ['slug'] });

    res.status(201).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
const getCategoryNameBySlug = async (req, res) => {
  try {
    const category = await Categories.findOne({
      slug: req.params.slug,
    }).select(['name', 'slug']);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports = {
  createCategory,
  getCategories,
  getAllHeaderCategories,
  getCategoryBySlug,
  updateCategoryBySlug,
  deleteCategoryBySlug,
  deleteCategoryById,
  getCategoriesSlugs,
  getSubCategoriesSlugs,
  getCategoryByAdmin,
  getCategoryNameBySlug,
  getAllCategories,
  getCategoriesByAdmin,
};
