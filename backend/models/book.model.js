import mongoose from 'mongoose';


const BookSchema = mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      author: {
        type: String,
        required: true,
        trim: true,
      },
      publishYear: {
        type: Number,
        required: true,
        min: 0,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
        validate: {
          validator: function (value) {
            return value > 0;
          },
          message: 'Price must be positive',
        },
      },
      genre: {
        type: String,
      },
    },
    {
      timestamps: true,
    }
  );


const Book = mongoose.model('Book', BookSchema);
export default Book;