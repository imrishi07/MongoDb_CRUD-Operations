const mongoose = require("mongoose");
const mongodb_Url = "mongodb://127.0.0.1:27017/fruitsDB";

mongoose.set("strictQuery", false);

mongoose
  .connect(mongodb_Url)
  .then(() => console.log("Connected sucessfull!!!"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
      minLength: 3,
      maxLength: 10,
    },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 6, max: 12 },
    admin: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

const createUsers = async () => {
  try {
    const createUser = new User({
      name: "Ra",
      email: "ram@gmail.com",
      password: "1234",
    });

    // const createUser2 = new User({
    //   name: "Kumar",
    //   email: "kumar@gmail.com",
    //   password: "1234",
    // });

    // const createUser3 = new User({
    //   name: "Anand",
    //   email: "anand@gmail.com",
    //   password: "1234",
    // });

    const userData = await User.insertMany([createUser]);
    console.log(userData);
  } catch (err) {
    console.log(err);
  }
};

createUsers();  //Create function Call

const readDocument = async () => {
  try {
    docResult = await User.find({})
      .select({
        name: 1,
        _id: 0,
        password: 1,
      })
      .sort({ password: 1 });
    console.log(docResult);
  } catch (err) {
    console.log(err);
  }
};

readDocument();  //Read function Call

const updateDocument = async (_id) => {
  try {
    const doc = await User.findByIdAndUpdate(
      { _id },
      {
        $set: { name: "Rama" },
      },
      { new: true }
    );
    console.log(doc);
  } catch (err) {
    console.log(err);
  }
};

updateDocument("63e26dd3297a63864f0e0b2d"); //Update function Call

const deleteDocument = async (_id) => {
  try {
    const doc = await User.findByIdAndDelete({ _id });
    console.log(doc);
  } catch (err) {
    console.log(err);
  }
};

deleteDocument("63e456f12c55bef8518eecf1"); //Delete function Call
