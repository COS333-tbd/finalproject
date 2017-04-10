// MongoDB Posts schema

var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  upvotes: {type: Number, default: 0},
  flags: {type: Number, default: 0},
  mood: String,
  date: Date,
  comments: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' } ],
  userUpvotes: [ {type: String } ],
  userFlags: [ {type: String } ]
});

// Upvote post
PostSchema.methods.upvote = function(userid, cb) {
  if (this.userUpvotes.indexOf(userid) == -1) this.userUpvotes.push(userid);
  else this.userUpvotes.pop(userid);
  this.upvotes = this.userUpvotes.length;
  this.save(cb);
};

// Flag post
PostSchema.methods.downvote = function(userid, cb) {
  if (this.userFlags.indexOf(userid) == -1) this.userFlags.push(userid);
  else this.userFlags.pop(userid);
  this.flags = this.userFlags.length;
  this.save(cb);
}

mongoose.model('Post', PostSchema);
