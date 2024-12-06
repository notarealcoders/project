import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  language: {
    type: String,
    required: true,
    default: 'javascript',
  },
  code: {
    type: String,
    default: '// Start coding here',
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // Automatically delete rooms after 24 hours
  },
}, {
  timestamps: true,
});

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);
export default Room;