// ============================================================
//  EDIT YOUR SHOP HERE
// ============================================================
const SHOP_NAME = "Cava Market";
const CURRENCY = "€";

// Products: barcode number (EAN-13, must match the printed sheet), name, image.
// image = an emoji OR a path/URL to a picture, e.g. "img/prosecco.jpg"
// Each product can be scanned only once.
const ITEMS = [
  { code: "8002026110017", name: "Coglioni pelati al chilo", image: "img/01.webp" },
  { code: "8002026110024", name: "Farina di Gran d’oro", image: "img/02.webp" },
  { code: "8002026110031", name: "Acqua", image: "img/03.webp" },
  { code: "8002026110048", name: "Dio Can di Canditi", image: "img/04.webp" },
  { code: "8002026110055", name: "Babbino morso a metà", image: "img/05.webp" },
  { code: "8002026110062", name: "Piccolo Cristo in croce", image: "img/06.webp" },
  { code: "8002026110079", name: "Raffaella Carrà", image: "img/07.webp" },
  { code: "8002026110086", name: "Finocchio", image: "img/08.webp" },
  { code: "8002026110093", name: "Cucciolone", image: "img/09.webp" },
  { code: "8002026110109", name: "Zaffer’Ano", image: "img/10.webp" },
  { code: "8002026110116", name: "Carne al Caffè", image: "img/11.webp" },
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
  6.77,   // 7th scan  -> total  67.67
  13.23,  // 8th scan  -> total  80.90
  7.60,   // 9th scan  -> total  88.50
  14.90,  // 10th scan -> total 103.40
  9.90,   // 11th scan -> total 113.30
];
