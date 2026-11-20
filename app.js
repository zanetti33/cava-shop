(function () {
  const $ = (id) => document.getElementById(id);
  const byCode = Object.fromEntries(ITEMS.map((i) => [i.code, i]));
  const fmt = (n) => CURRENCY + n.toFixed(2);
  // cart = [{ code, price }] in scan order; price comes from PRICES by position
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem("cart2") || "[]"); } catch (e) {}
  if (!Array.isArray(cart)) cart = [];
  const priceAt = (i) => (i < PRICES.length ? PRICES[i] : PRICES[PRICES.length - 1]);
  let scanner = null, scanning = false, lastCode = null, lastTime = 0;

  document.title = SHOP_NAME;
  $("shopName").textContent = SHOP_NAME;

  const imgHTML = (src) =>
    /[./]/.test(src) ? `<img src="${src}" alt="">` : src;

  function save() { try { localStorage.setItem("cart2", JSON.stringify(cart)); } catch (e) {} }

  function renderCart() {
    const total = cart.reduce((s, c) => s + c.price, 0);
    $("cartCount").textContent = cart.length + (cart.length === 1 ? " item" : " items");
    $("cartTotal").textContent = fmt(total);
    $("cartSum").textContent = fmt(total);
    const list = $("cartList");
    list.innerHTML = "";
    if (!cart.length) { list.innerHTML = '<li class="empty">Your cart is empty</li>'; return; }
    cart.forEach((c) => {
      const it = byCode[c.code];
      if (!it) return;
      const li = document.createElement("li");
      li.innerHTML = `<span class="ci-img">${imgHTML(it.image)}</span>
        <span class="ci-name">${it.name}</span>
        <span class="ci-price">${fmt(c.price)}</span>`;
      list.appendChild(li);
    });
  }

  function bump() { const b = $("cartBtn"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }

  function toast(msg) {
    const t = $("toast"); t.textContent = msg; t.classList.remove("hidden");
    clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.add("hidden"), 3500);
  }

  function show(id) { $(id).classList.remove("hidden"); }
  function hide(id) { $(id).classList.add("hidden"); }

  function handleCode(raw) {
    const code = String(raw).trim();
    const now = Date.now();
    if (code === lastCode && now - lastTime < 2500) return; // debounce repeat reads
    lastCode = code; lastTime = now;
    stopScan();
    if (navigator.vibrate) navigator.vibrate(120);
    const it = byCode[code];
    if (!it) { $("unknownCode").textContent = code; show("unknownModal"); return; }
    if (cart.some((c) => c.code === code)) {
      $("dImage").innerHTML = imgHTML(it.image);
      $("dName").textContent = it.name;
      show("dupModal");
      return;
    }
    const price = priceAt(cart.length);
    cart.push({ code, price }); save(); renderCart(); bump();
    $("pImage").innerHTML = imgHTML(it.image);
    $("pName").textContent = it.name;
    $("pPrice").textContent = fmt(price);
    show("productModal");
  }

  async function startScan() {
    if (scanning) return;
    hide("home"); show("scanner");
    $("scanHint").textContent = "Starting camera…";
    if (!window.Html5Qrcode) { $("scanHint").textContent = "Scanner failed to load. Check your connection."; return; }
    const F = Html5QrcodeSupportedFormats;
    scanner = scanner || new Html5Qrcode("reader", {
      formatsToSupport: [F.EAN_13, F.EAN_8, F.UPC_A, F.UPC_E, F.CODE_128, F.CODE_39, F.QR_CODE],
      experimentalFeatures: { useBarCodeDetectorIfSupported: true },
      verbose: false,
    });
    try {
      scanning = true;
      await scanner.start(
        { facingMode: "environment" },
        { fps: 12, qrbox: (w, h) => ({ width: Math.floor(w * 0.85), height: Math.floor(Math.min(h, w) * 0.45) }) },
        (text) => handleCode(text),
        () => {}
      );
      $("scanHint").textContent = "Hold the barcode inside the box";
    } catch (err) {
      scanning = false;
      $("scanHint").textContent = "";
      hide("scanner"); show("home");
      toast("Camera unavailable: " + (err && err.message ? err.message : err) + ". Allow camera access and try again.");
    }
  }

  async function stopScan() {
    if (scanner && scanning) {
      scanning = false;
      try { await scanner.stop(); } catch (e) {}
    }
    hide("scanner"); show("home");
  }

  $("scanBtn").onclick = startScan;
  $("stopBtn").onclick = stopScan;
  $("scanAgainBtn").onclick = () => { hide("productModal"); startScan(); };
  $("closeProductBtn").onclick = () => hide("productModal");
  $("dupOk").onclick = () => { hide("dupModal"); startScan(); };
  $("unknownOk").onclick = () => { hide("unknownModal"); startScan(); };
  $("cartBtn").onclick = () => show("cartModal");
  $("closeCart").onclick = () => hide("cartModal");
  $("clearCart").onclick = () => { cart = []; save(); renderCart(); };
  $("manualBtn").onclick = () => { $("manualInput").value = ""; show("manualModal"); $("manualInput").focus(); };
  $("manualCancel").onclick = () => hide("manualModal");
  $("manualOk").onclick = () => { const v = $("manualInput").value; hide("manualModal"); lastCode = null; if (v) handleCode(v); };
  $("manualInput").onkeydown = (e) => { if (e.key === "Enter") $("manualOk").click(); };
  document.querySelectorAll(".modal").forEach((m) => m.addEventListener("click", (e) => { if (e.target === m) m.classList.add("hidden"); }));

  renderCart();
})();
