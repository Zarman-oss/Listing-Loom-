import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: true,
    },
    userName: {
      type: String,
      required: [true, 'Username is required'],
    },
    image: {
      type: String,
    },
    bookMarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Property',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
