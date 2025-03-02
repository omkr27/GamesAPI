let express = require("express");
let app = express();
app.use(express.json());

let users = [];
let books = [];
let reviews = [];

function validateUser(user) {
  if (!user.name || typeof user.name !== "string") {
    return "name is required and should be a string.";
  }
  if (!user.email || typeof user.email !== "string") {
    return "email is required and should be a string.";
  }

  return null;
}

app.post("/api/users", (req, res) => {
  let error = validateUser(req.body);
  if (error) return res.status(400).send(error);

  let user = { id: users.length + 1, ...req.body };
  users.push(user);
  return res.status(201).json(user);
});

function validateBook(book) {
  if (!book.title || typeof book.title !== "string") {
    return "title is required and should be a string.";
  }
  if (!book.author || typeof book.author !== "string") {
    return "author is required and should be a string.";
  }

  return null;
}

app.post("/api/books", (req, res) => {
  let error = validateBook(req.body);
  if (error) return res.status(400).send(error);

  let book = { id: books.length + 1, ...req.body };
  books.push(book);
  return res.status(201).json(book);
});

function validateReview(review) {
  if (!review.content || typeof review.content != "string") {
    return "content is required and should be a string.";
  }
  if (!review.userId || typeof review.userId !== "number") {
    return "userId is required and should be a number.";
  }

  return null;
}

app.post("/api/reviews", (req, res) => {
  let error = validateReview(req.body);
  if (error) return res.status(400).send(error);

  let review = { id: reviews.length + 1, ...req.body };
  reviews.push(review);
  return res.status(201).json(review);
});

module.exports = {
  app,
  validateUser,
  validateBook,
  validateReview,
};
