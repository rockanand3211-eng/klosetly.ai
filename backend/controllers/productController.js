import Product from '../models/Product.js';

/**
 * @desc    Get all products with search and category filters
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;
    const query = {};

    // 1. Text Search Filter (Case-insensitive regex matching title, category, or theme)
    if (search && search.trim() !== '') {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { category: searchRegex },
        { theme: searchRegex },
      ];
    }

    // 2. Category Filter Token Mapping
    if (category && category !== 'All') {
      let categoryFilter = {};

      switch (category) {
        case 'Shirts':
          categoryFilter = { title: { $regex: 'shirt', $options: 'i' } };
          break;
        case 'Pants':
          categoryFilter = { title: { $regex: 'pants', $options: 'i' } };
          break;
        case 'Tops':
          categoryFilter = { title: { $regex: 'hoodie', $options: 'i' } };
          break;
        case "Men's Wear":
          categoryFilter = {
            $or: [
              { category: { $regex: 'formalwear', $options: 'i' } },
              { category: { $regex: 'evening wear', $options: 'i' } },
              { title: { $regex: 'suit', $options: 'i' } },
            ],
          };
          break;
        case "Women's Wear":
          categoryFilter = {
            $or: [
              { category: { $regex: 'summer', $options: 'i' } },
              { theme: { $regex: 'athleisure', $options: 'i' } },
            ],
          };
          break;
        default:
          // Fallback direct match
          categoryFilter = { category: { $regex: category, $options: 'i' } };
      }

      // Combine search and category filters
      if (query.$or) {
        query.$and = [{ $or: query.$or }, categoryFilter];
        delete query.$or;
      } else {
        Object.assign(query, categoryFilter);
      }
    }

    const products = await Product.find(query);

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Public
 */
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Public
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Public
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
