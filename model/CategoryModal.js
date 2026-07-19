// import mongoose from "mongoose";

// const CategorySchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },

//     image: {
//       type: String,
//       default: "",
//     },

//     status: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Category", CategorySchema);




import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    // Dynamic Options
    options: [
      {
        name: {
          type: String,
        },

        values: [
          {
            type: String,
          },
        ],
      },
    ],

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Category", CategorySchema);