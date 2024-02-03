import book from "../models/CreatBook.js";
import mongoose from "mongoose";

const creatData = async (req, res) => {
  const {
    Title,
    Rating,
    Date,
    By,
    Image,
    PDF,
    Liked,
    Categories,
    Review,
    Language,
  } = req.body;
  const newHentai = new book({
    Title,
    Rating,
    Date,
    By,
    Image,
    PDF,
    Liked,
    Categories,
    Review,
    Language,
  });
  try {
    await newHentai.save();
    res.status(201).json("Sucess");
  } catch (err) {
    res.status(400);
    throw new Error("is not Defined");
  }
};
const updateData = async (req, res) => {
  try {
    const data = await book.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
//Fetch Data
const fetchData = async (req, res) => {
  try {
    const RandomBooks = await book.aggregate([{ $sample: { size: 8 } }]);
    const Rating = await book.find({}).sort({ rating: -1 }).limit(8);
    const data = { RandomBooks, Rating };
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
const fetchAllData = async (req, res) => {
  const { sort, filter, search } = req.body;
  const { books } = req.params;
  const Details =
    books !== "books"
      ? {
          $or: [
            { Categories: books },
            { Date: books },
            { By: books },
            { Language: books },
          ],
        }
      : {
          $or: [
            { Categories: filter },
            { Date: filter },
            { By: filter },
            { Language: filter },
          ],
        };
  try {
    if (books === "books") {
      if (search) {
        const searchData = await book.aggregate([
          {
            $search: {
              index: "Book",
              text: {
                query: search,
                path: {
                  wildcard: "*",
                },
                fuzzy: {},
              },
            },
          },
        ]);
        res.json(searchData);
      } else if (filter) {
        if (sort == "") {
          const AllData = await book.find(Details);
          res.json(AllData);
        } else if (sort == "name") {
          const sortData = await book.find(Details).sort({ [sort]: 1 });
          res.json(sortData);
        } else {
          const sortData = await book.find(Details).sort({ [sort]: -1 });
          res.json(sortData);
        }
      } else {
        if (sort == "") {
          const AllData = await book.find({});
          res.json(AllData);
        } else if (sort == "name") {
          const sortData = await book.find({}).sort({ [sort]: 1 });
          res.json(sortData);
        } else {
          const sortData = await book.find({}).sort({ [sort]: -1 });
          res.json(sortData);
        }
      }
    } else {
      if (search) {
        const searchData = await book.aggregate([
          {
            $search: {
              index: "Book",
              text: {
                query: search,
                path: {
                  wildcard: "*",
                },
                fuzzy: {},
              },
            },
          },
        ]);
        res.json(searchData);
      } else if (filter) {
        if (sort == "") {
          const AllData = await book.find(Details);
          res.json(AllData);
        } else if (sort == "name") {
          const sortData = await book.find(Details).sort({ [sort]: 1 });
          res.json(sortData);
        } else {
          const sortData = await book.find(Details).sort({ [sort]: -1 });
          res.json(sortData);
        }
      } else {
        if (sort == "") {
          const AllData = await book.find(Details);
          res.json(AllData);
        } else if (sort == "name") {
          const sortData = await book.find(Details).sort({ [sort]: 1 });
          res.json(sortData);
        } else {
          const sortData = await book.find(Details).sort({ [sort]: -1 });
          res.json(sortData);
        }
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
//Search auto-Complete
const autoComplete = async (req, res) => {
  try {
    const data = await book.aggregate([
      {
        $search: {
          index: "autocomplete",
          autocomplete: {
            query: req.body.search ? req.body.search : "",
            path: "By",
            fuzzy: {},
          },
        },
      },
      { $limit: 3 },
      { $project: { By: 1 } },
    ]);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
//fetch all data
const fetchALlDetails = async (req, res) => {
  try {
    const Details = await book.find({});
    res.json(Details);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
//fetch single data
const fetchSingleData = async (req, res) => {
  try {
    const Details = await book.findById(req.params.id);
    res.json(Details);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
export {
  creatData,
  updateData,
  fetchData,
  fetchAllData,
  fetchALlDetails,
  fetchSingleData,
  autoComplete,
};
