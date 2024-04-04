import mongoose from 'mongoose';
import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email already exists'],
      required: [true, 'Email is required '],
    },
    username: {
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

export default mongoose.models.User || mongoose.model('User', UserSchema);
