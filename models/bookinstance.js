var mongoose = require('mongoose');
var moment = require('moment');


var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema (
  {
    book: {type: Schema.ObjectId, ref: 'Book', require: true}, // make reference to associated Book
    imprint: {type: String, required: true},
    status: {type: String, required: true, enum: ['Available', 'Maintenance', 'Loaned', 'Reseved'], default: 'Maintenance'},
    due_back: {type: Date, default: Date.now}
});


// Virtual for Bookinstance`s URLS

BookInstanceSchema
.virtual('url')
.get(function(){
  return '/catalog/bookinstance/' + this._id;
});

BookInstanceSchema
.virtual('due_back_formatted')
.get(function(){
  return moment(this.due_back).format('MMMM Do, YYYY');
});


// Export model Bookinstance

module.exports = mongoose.model('BookInstance', BookInstanceSchema);
