/**
 * Created by heke on 2016/6/22.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
////we're connected!
    var bookSchema = mongoose.Schema({
        name: String
    });
    bookSchema.methods.speak = function () {
        var greeting = this.name
            ? "Book name is " + this.name
            : "I don't have a name";
        console.log(greeting);
    }
    var Book = mongoose.model('book', bookSchema);
    var alice = new Book({name: 'Alice'});
    //console.log(alice.name);
    alice.speak();
/*    alice.save(function (err, alice) {
        if (err) {
            return console.error(err);
        }

        alice.speak();
    })*/
    Book.find({name:/^Pra/},function (err, books) {
        if (err) {
            return console.error(err);
        }

        console.log(books);
    })
})