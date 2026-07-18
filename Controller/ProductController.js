import Product from "../model/ProductModel.js";
import Category from "../model/CategoryModal.js";
import cloudinary from "../Config/cloudinary.js";

/* ---------------- CREATE ---------------- */

export const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }
    const {
      title,
      category,
      description,
      price,
      offerPrice,
      stock,
      customizable,
      featured,
      status,
      instagram
    } = req.body;

    const categoryExist = await Category.findById(category);

    if (!categoryExist) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

     const cloudinaryResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "papakutty" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      stream.end(req.file.buffer);
    });

 

    const product = await Product.create({
      title,
      category,
      description,
      price,
      offerPrice,
      stock,
      image:cloudinaryResult.secure_url,
      customizable,
      featured,
      status,
      instagram
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;

    const skip = (page - 1) * limit;

    const filter = {};
    if (category) {
      filter.category = category;
    }

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate("category", "name image")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Product.countDocuments(filter),
    ]);

    const totalDocument = await Product.estimatedDocumentCount();

    res.status(200).json({
      success: true,
      data: products,
      totalDocument,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------- GET ONE ---------------- */

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name image",
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------- UPDATE ---------------- */

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const {
      title,
      category,
      description,
      price,
      offerPrice,
      stock,
      customizable,
      featured,
      status,
      instagram
    } = req.body;

    // Upload new image only if provided
    if (req.file) {
      const cloudinaryResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(req.file.buffer);
      });

      product.image = cloudinaryResult.secure_url;
    }

    product.title = title;
    product.category = category;
    product.description = description;
    product.price = price;
    product.offerPrice = offerPrice;
    product.stock = stock;
    product.customizable = customizable;
    product.featured = featured;
    product.status = status;
    product.instagram=instagram

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


export const updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Status updated",
      data: product,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/* ---------------- DELETE ---------------- */

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
