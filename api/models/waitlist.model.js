const mongoose = require('mongoose');

const waitlistSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true
  },
  status: {
    type: String,
    enum: ['waiting', 'notified'],
    default: 'waiting'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},
{
  timestamps: true
});

waitlistSchema.index({ email: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Waitlist', waitlistSchema);