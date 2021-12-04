const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
      required: [true, "Comment should not be empty"],
    },
  },
  { timestamps: true }
);

const productScema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      maxlength: [200, "Product name should be including 200 characters"],
    },
    exchangeWith: {
      type: String,
      required: [true, "Product name is required"],
      maxlength: [200, "Product name should be including 200 characters"],
    },
    exchangePrice: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      required: [true, "Please select category for this product"],
    },
    shippingDate: {
      type: Date,
      required: [true, "Shipping date is required"],
    },
    description: {
      type: String,
      maxlength: 2000,
      required: [true, "Description is required"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    addressOne: {
      type: String,
      required: [true, "Address one is required"],
    },
    addressTwo: {
      type: String,
      required: [true, "Address two is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    numOffers: {
      type: Number,
      required: true,
      default: 0,
    },
    custommerOffers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Offer",
      },
    ],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

module.exports = model("Product", productScema);
