import mongoose, {Document} from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 100,
    },
    email: {
        type: String,
        required: true,
        max: 100,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});

interface IUser extends Document{
    email: string;
    password: string;
    name: string;
  }

userSchema.pre<IUser>("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, (err: mongoose.Error, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  });

export default mongoose.model('User', userSchema);
