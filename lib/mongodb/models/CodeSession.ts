import mongoose from 'mongoose';

const codeSessionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    required: true,
    default: 'javascript',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  collaborators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  isPublic: {
    type: Boolean,
    default: true,
  },
  versions: [{
    code: String,
    timestamp: Date,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  }],
}, {
  timestamps: true,
});

const CodeSession = mongoose.models.CodeSession || mongoose.model('CodeSession', codeSessionSchema);
export default CodeSession;