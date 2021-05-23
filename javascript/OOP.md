## Call, Apply and Bind Methods:
Used to set this keyword to the provided value. The call() takes arguments separately while apply() takes arguments as an array. Bind method creates a new function
with an explicitly bound this; call and apply are one-time use methods.
```javascript
var person = {
  fullName: function(city, country) {
    return this.firstName + " " + this.lastName + "," + city + "," + country;
  }
}
var person1 = {
  firstName:"John",
  lastName: "Doe"
}
person.fullName.call(person1, "Oslo", "Norway");

// Another example
const book = {
  title: 'Brave New World',
  author: 'Aldous Huxley',
}

function summary(genre, year) {
  console.log(
    `${this.title} was written by ${this.author}. It is a ${genre} novel written in ${year}.`,
  )
}

const book1 = summary.apply(book, ['dystopian', 1932]);
const book2 = summary.call(book, 'dystopian', 1932);
const book3 = summary.bind(book, 'dystopian', 1932);
```
