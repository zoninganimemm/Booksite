import mongoose from "mongoose";

const creatBook = new mongoose.Schema(
  {
    Title: {
      type: String,
      require: true,
    },
    Rating: {
      type: Number,
      require: true,
    },
    Date: {
      type: String,
      require: true,
    },
    By: {
      type: String,
      require: true,
    },
    Image: {
      type: String,
      require: true,
    },
    PDF: {
      type: String,
      require: true,
    },
    Liked: {
      type: Number,
      require: true,
    },
    Categories: {
      type: Array,
      require: true,
    },
    Language: {
      type: String,
      require: true,
    },
    Review: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const book = mongoose.model("book", creatBook);

export default book;
