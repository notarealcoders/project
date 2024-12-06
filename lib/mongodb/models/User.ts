import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  emailVerified: Date,
  sessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CodeSession'
  }]
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;