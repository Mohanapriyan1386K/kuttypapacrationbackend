import Category from "../model/CategoryModal.js";
import cloudinary from "../Config/cloudinary.js";




export const createCategory = async (req, res) => {
  try {
    let { name, status, options } = req.body;

    const exist = await Category.findOne({ name });

    if (exist) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    let image = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "category",
      });

      image = result.secure_url;
    }

    // If FormData sends options as string
    if (typeof options === "string") {
      options = JSON.parse(options);
    }

    const category = await Category.create({
      name,
      image,
      status,
      options,
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const updateCategory = async (req, res) => {
  try {
    let { name, status, options } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "category",
      });

      category.image = result.secure_url;
    }

    if (typeof options === "string") {
      options = JSON.parse(options);
    }

    category.name = name;
    category.status = status;
    category.options = options;

    await category.save();

    res.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



















