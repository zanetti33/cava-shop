// ============================================================
//  EDIT YOUR SHOP HERE
// ============================================================
const SHOP_NAME = "Cava Market";
const CURRENCY = "€";

// Products: barcode number (EAN-13, must match the printed sheet), name, image.
// image = an emoji OR a path/URL to a picture, e.g. "img/prosecco.jpg"
// Each product can be scanned only once.
const ITEMS = [
  { code: "8002026110017", name: "Laurel Wreath",      image: "🌿" },
  { code: "8002026110024", name: "Bottle of Prosecco", image: "🍾" },
  { code: "8002026110031", name: "Printed Thesis",     image: "📚" },
  { code: "8002026110048", name: "Espresso Supply",    image: "☕" },
  { code: "8002026110055", name: "Diploma",            image: "📜" },
  { code: "8002026110062", name: "Spritz",             image: "🍹" },
  { code: "8002026110079", name: "Red Confetti",       image: "🍬" },
  { code: "8002026110086", name: "Hours of Sleep",     image: "😴" },
  { code: "8002026110093", name: "Exam Retake",        image: "🔁" },
  { code: "8002026110109", name: "Job Offer",          image: "💼" },
  { code: "8002026110116", name: "Party Hat",          image: "🎉" },
];

// Prices by SCAN ORDER, not by product: the 1st item scanned (whichever it is)
// costs PRICES[0], the 2nd costs PRICES[1], and so on.
// Running totals: after 9 scans = €88.50, after 10 = €103.40, after 11 = €113.30
const PRICES = [
  7.90,   // 1st scan  -> total   7.90
  12.50,  // 2nd scan  -> total  20.40
  4.20,   // 3rd scan  -> total  24.60
  15.00,  // 4th scan  -> total  39.60
  9.90,   // 5th scan  -> total  49.50
  11.40,  // 6th scan  -> total  60.90
  6.30,   // 7th scan  -> total  67.20
  13.70,  // 8th scan  -> total  80.90
  7.60,   // 9th scan  -> total  88.50
  14.90,  // 10th scan -> total 103.40
  9.90,   // 11th scan -> total 113.30
];
