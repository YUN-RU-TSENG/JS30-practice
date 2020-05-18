// Get your shorts on - this is an array workout!
// ## Array Cardio Day 1

// Some data we can work with

const inventors = [
  { first: "Albert", last: "Einstein", year: 1879, passed: 1955 },
  { first: "Isaac", last: "Newton", year: 1643, passed: 1727 },
  { first: "Galileo", last: "Galilei", year: 1564, passed: 1642 },
  { first: "Marie", last: "Curie", year: 1867, passed: 1934 },
  { first: "Johannes", last: "Kepler", year: 1571, passed: 1630 },
  { first: "Nicolaus", last: "Copernicus", year: 1473, passed: 1543 },
  { first: "Max", last: "Planck", year: 1858, passed: 1947 },
  { first: "Katherine", last: "Blodgett", year: 1898, passed: 1979 },
  { first: "Ada", last: "Lovelace", year: 1815, passed: 1852 },
  { first: "Sarah E.", last: "Goode", year: 1855, passed: 1905 },
  { first: "Lise", last: "Meitner", year: 1878, passed: 1968 },
  { first: "Hanna", last: "Hammarström", year: 1829, passed: 1909 },
];

const people = [
  "Beck, Glenn",
  "Becker, Carl",
  "Beckett, Samuel",
  "Beddoes, Mick",
  "Beecher, Henry",
  "Beethoven, Ludwig",
  "Begin, Menachem",
  "Belloc, Hilaire",
  "Bellow, Saul",
  "Benchley, Robert",
  "Benenson, Peter",
  "Ben-Gurion, David",
  "Benjamin, Walter",
  "Benn, Tony",
  "Bennington, Chester",
  "Benson, Leana",
  "Bent, Silas",
  "Bentsen, Lloyd",
  "Berger, Ric",
  "Bergman, Ingmar",
  "Berio, Luciano",
  "Berle, Milton",
  "Berlin, Irving",
  "Berne, Eric",
  "Bernhard, Sandra",
  "Berra, Yogi",
  "Berry, Halle",
  "Berry, Wendell",
  "Bethea, Erin",
  "Bevan, Aneurin",
  "Bevel, Ken",
  "Biden, Joseph",
  "Bierce, Ambrose",
  "Biko, Steve",
  "Billings, Josh",
  "Biondo, Frank",
  "Birrell, Augustine",
  "Black, Elk",
  "Blair, Robert",
  "Blair, Tony",
  "Blake, William",
];

// Array.prototype.filter()
// 1. Filter the list of inventors for those who were born in the 1500's

var bornIn1500 = inventors.filter(
  (inventors) => 1600 > inventors.year && inventors.year > 1500
);
console.table(
  "Filter the list of inventors for those who were born in the 1500's"
);
console.table(bornIn1500);

// Array.prototype.map()
// 2. Give us an array of the inventors' first and last names

var inventorsName = inventors.map(
  (inventors) => inventors.last + " " + inventors.first
);
console.table("Give us an array of the inventors' first and last names");
console.table(inventorsName);

// Array.prototype.sort()
// 3. Sort the inventors by birthdate, oldest to youngest

var inventorsAgeCompare = inventors
  .slice()
  .sort((first, second) => first.year - second.year);
console.table("Sort the inventors by birthdate, oldest to youngest");
console.table(inventorsAgeCompare);

// Array.prototype.reduce()
// 4. How many years did all the inventors live?

var inventorsAllLiveYears = inventors.reduce(
  (total, current) => total + (current.passed - current.year),
  0
);

console.table("How many years did all the inventors live?");
console.table(inventorsAllLiveYears);

// 5. Sort the inventors by years lived

var sortLived = inventors
  .slice()
  .sort(
    (first, second) => first.passed - first.year - (second.passed - second.year)
  )
  .map((inventors) => inventors.last + " " + inventors.first)
  .join(",\n\r");
console.table("Sort the inventors by years lived");
console.table(sortLived);

// 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
// https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

// var listOfBoulevardsInParies = document.querySelectorAll('')

// const listOfBoulevardsInParies = document.querySelectorAll('.mw-category-group li')
// let listOfBoulevardsInPariesOfDe = Array.from(listOfBoulevardsInParies).filter((el) => el.textContent.includes('de'))

// 7. sort Exercise
// Sort the people alphabetically by last name

var alphabeticallyOfinventors = inventors
  .slice()
  .sort(
    (first, second) =>
      first.last.charAt(0).charCodeAt() - second.last.charAt(0).charCodeAt()
  )
  .map((inventors) => inventors.last + " " + inventors.first);
console.table("Sort the people alphabetically by last name");
console.table(alphabeticallyOfinventors);

// 8. Reduce Exercise
// Sum up the instances of each of these
const data = [
  "car",
  "car",
  "truck",
  "truck",
  "bike",
  "walk",
  "car",
  "van",
  "bike",
  "walk",
  "car",
  "van",
  "car",
  "truck",
];

const dataFinal = data.reduce((obj, currentValue) => {
  if (!obj[currentValue]) obj[currentValue] = 0;
  obj[currentValue] += 1;
  return obj;
}, {});

console.table("Sum up the instances of each of these.");
console.table(dataFinal);
