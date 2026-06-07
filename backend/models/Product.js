import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: {
        values: [
          'Casual / Summer',
          'Streetwear / Blazer',
          'Evening Wear',
          'Streetwear',
          'Outerwear / Winter',
          'Outerwear / Autumn',
          'Athleisure',
          'Formalwear',
          'Formal Wear',
          'Casual / Autumn',
          'Resort Wear',
          'Techwear',
        ],
        message: '{VALUE} is not a valid category',
      },
    },
    desc: {
      type: String,
      required: [true, 'Product description is required'],
    },
    match: {
      type: String,
      default: '95% Match',
    },
    theme: {
      type: String,
      required: [true, 'Product theme / styles tag is required'],
    },
    price: {
      type: String,
      required: [true, 'Product price is required'],
      validate: {
        validator: function (v) {
          // Validates explicit Indian Rupee format (e.g. ₹2,499 or ₹12,499)
          return /^₹\d{1,3}(,\d{2,3})*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid Indian Rupee price format (e.g., ₹2,499)`,
      },
    },
    img: {
      type: String,
      required: [true, 'Product image URL is required'],
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for text searching
ProductSchema.index({ title: 'text', category: 'text', theme: 'text' });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;
