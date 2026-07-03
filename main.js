(function () {
  "use strict";

  /* ─── Datos de productos y recetas ─── */
  var RECIPES = {
    "corvina-entera": {
      title: "Ceviche de Corvina",
      desc: "El clásico tico que nunca falla. La corvina fresca con limón, culantro y chile congo es de otro mundo 🤤",
      img: "assets/img/seafood-ceviche.jpg",
      ingredients: ["Corvina fresca", "Limón criollo", "Culantro", "Cebolla morada", "Chile congo", "Sal al gusto"]
    },
    "corvina-filete": {
      title: "Corvina a la Plancha",
      desc: "Filete a la plancha con arroz blanco y patacones bien doraditos. Simple, delicioso, costarricense 🇨🇷",
      img: "assets/img/seafood-fish.jpg",
      ingredients: ["Filete de corvina", "Ajo", "Mantequilla", "Limón", "Arroz blanco", "Patacones"]
    },
    "tilapia-entera": {
      title: "Tilapia Frita con Ensalada",
      desc: "Tilapia frita crocante, acompañada de ensalada fresca y arroz con frijoles. ¡Eso sí es almuerzo!",
      img: "assets/img/seafood-fish.jpg",
      ingredients: ["Tilapia entera", "Ajo molido", "Comino", "Aceite vegetal", "Arroz", "Frijoles"]
    },
    "tilapia-filete": {
      title: "Tilapia al Ajillo",
      desc: "Filete bañado en salsa de ajo y mantequilla. Con arroz y plátanos maduros, un lujo sencillo 🧄",
      img: "assets/img/seafood-fish.jpg",
      ingredients: ["Filete de tilapia", "Ajo picado", "Mantequilla", "Perejil", "Limón", "Pimienta"]
    },
    "dorado": {
      title: "Dorado Empanizado",
      desc: "Empanizado con pan rallado y especias, frito hasta quedare doradito. Con ensalada de repollo 😋",
      img: "assets/img/seafood-fish.jpg",
      ingredients: ["Dorado en filete", "Pan rallado", "Huevo", "Ajo en polvo", "Pimentón", "Aceite"]
    },
    "atun": {
      title: "Tataki de Atún",
      desc: "Atún sellado por fuera, rosado por dentro. Con soya y ajonjolí. ¡Nivel restaurante desde tu cocina!",
      img: "assets/img/seafood-fish.jpg",
      ingredients: ["Atún fresco", "Salsa de soya", "Ajonjolí", "Jengibre", "Lima", "Aceite de sésamo"]
    },
    "camarones-medianos": {
      title: "Arroz con Camarones",
      desc: "Arroz cremoso con camarones medianos, culantro y chile dulce. El favorito de todos en casa 🍚",
      img: "assets/img/seafood-shrimp.jpg",
      ingredients: ["Camarones medianos", "Arroz", "Culantro", "Chile dulce", "Cebolla", "Ajo"]
    },
    "camarones-grandes": {
      title: "Camarones al Ajillo",
      desc: "Camarones grandes salteados en aceite de oliva con ajo y vino blanco. Se acaban en segundos 🧄🍷",
      img: "assets/img/seafood-shrimp.jpg",
      ingredients: ["Camarones grandes", "Ajo", "Aceite de oliva", "Vino blanco", "Perejil", "Limón"]
    },
    "pulpo": {
      title: "Pulpo a la Gallega",
      desc: "Pulpo cocido tierno, con aceite de oliva, pimentón y papas. Un viaje a Galicia sin salir de Heredia 🐙",
      img: "assets/img/seafood-octopus.jpg",
      ingredients: ["Pulpo fresco", "Papas", "Pimentón dulce", "Aceite de oliva", "Sal gruesa", "Laurel"]
    },
    "calamar": {
      title: "Calamares a la Romana",
      desc: "Aros de calamar empanizados y fritos, crujientes por fuera y tiernos por dentro. Con salsa tártara 🦑",
      img: "assets/img/seafood-octopus.jpg",
      ingredients: ["Calamar en aros", "Harina de trigo", "Huevo", "Pan rallado", "Sal", "Aceite para freír"]
    },
    "mejillones": {
      title: "Mejillones al Vapor",
      desc: "Al vapor con vino blanco, ajo y perejil. Abritos al momento, con el mar en cada bocado 🫙",
      img: "assets/img/seafood-shrimp.jpg",
      ingredients: ["Mejillones frescos", "Vino blanco", "Ajo", "Mantequilla", "Perejil", "Limón"]
    },
    "langostinos": {
      title: "Langostinos a la Plancha",
      desc: "A la plancha con mantequilla de hierbas y un toque de brandy. Pa' darse un gustazo especial 🦞✨",
      img: "assets/img/seafood-shrimp.jpg",
      ingredients: ["Langostinos", "Mantequilla", "Tomillo", "Ajo", "Brandy", "Limón"]
    },
    "bagre": {
      title: "Bagre Frito Tico",
      desc: "El clásico de las sodas ticas. Frito con achiote, acompañado de arroz, frijoles y patacones 🍽️",
      img: "assets/img/seafood-fish.jpg",
      ingredients: ["Bagre fresco", "Achiote", "Ajo", "Comino", "Sal", "Aceite para freír"]
    },
    "mixtos": {
      title: "Sopa de Mariscos",
      desc: "Sopa espesa y reconfortante con todos los mariscos. La mejor para un día lluvioso en Heredia ☔🍲",
      img: "assets/img/seafood-shrimp.jpg",
      ingredients: ["Mariscos mixtos", "Leche de coco", "Papa", "Culantro", "Ajo", "Cebolla"]
    }
  };

  /* ─── Estado global ─── */
  var cart = JSON.parse(localStorage.getItem("ebenezer_cart") || "[]");
  var user = JSON.parse(localStorage.getItem("ebenezer_user") || "null");
  var orders = JSON.parse(localStorage.getItem("ebenezer_orders") || "[]");
  var addresses = JSON.parse(localStorage.getItem("ebenezer_addresses") || "[]");
  var favorites = JSON.parse(localStorage.getItem("ebenezer_favorites") || "[]");
  var pendingProduct = null; // producto esperando confirmación de receta

  /* ─── Utilidades ─── */
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  function fmt(n) {
    return "₡" + Number(n).toLocaleString("es-CR");
  }

  function saveCart() {
    localStorage.setItem("ebenezer_cart", JSON.stringify(cart));
  }

  function openModal(id) {
    var m = document.getElementById(id);
    if (m) { m.classList.add("open"); document.body.style.overflow = "hidden"; }
  }

  function closeModal(id) {
    var m = document.getElementById(id);
    if (m) { m.classList.remove("open"); document.body.style.overflow = ""; }
  }

  /* ─── Splash ─── */
  function initSplash() {
    var splash = document.querySelector("[data-splash]");
    if (!splash) return;
    function hide() { splash.classList.add("is-out"); }
    if (document.readyState === "complete") { setTimeout(hide, 700); }
    else { window.addEventListener("load", function () { setTimeout(hide, 500); }); }
    setTimeout(hide, 3800);
  }

  /* ─── Nav ─── */
  function initNav() {
    var nav = document.getElementById("nav");
    var toggle = document.getElementById("nav-toggle");
    var mobile = document.getElementById("nav-mobile");
    if (!nav) return;

    window.addEventListener("scroll", function () {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    });

    if (toggle && mobile) {
      toggle.addEventListener("click", function () {
        mobile.classList.toggle("open");
      });
      mobile.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { mobile.classList.remove("open"); });
      });
    }

    // smooth scroll para anclas
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth"
      });
    });
  }

  /* ─── Count-up números ─── */
  function initCountUp() {
    var els = document.querySelectorAll("[data-count]");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10);
        var duration = 1400;
        var start = performance.now();
        function tick(now) {
          var p = Math.min((now - start) / duration, 1);
          var ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(ease * target);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ─── Reveals ─── */
  function initReveals() {
    var els = document.querySelectorAll(".reveal");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var delay = (i % 4) * 80;
        setTimeout(function () { el.classList.add("is-visible"); }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -2% 0px" });
    els.forEach(function (el) { io.observe(el); });

    // Safety net 6s
    setTimeout(function () {
      document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-visible");
        }
      });
    }, 6000);
  }

  /* ─── Filtro de categorías ─── */
  function initCatTabs() {
    var tabs = document.querySelectorAll(".cat-tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        var cat = tab.getAttribute("data-cat");
        document.querySelectorAll(".product-card").forEach(function (card) {
          if (cat === "all" || card.getAttribute("data-cat") === cat) {
            card.classList.remove("hidden");
          } else {
            card.classList.add("hidden");
          }
        });
      });
    });
  }

  /* ─── Carrito ─── */
  function getCartTotal() {
    return cart.reduce(function (sum, item) { return sum + item.price * item.qty; }, 0);
  }

  function updateCartBadge() {
    var badge = document.getElementById("cart-badge");
    if (!badge) return;
    var qty = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    badge.textContent = qty;
    badge.classList.remove("bump");
    void badge.offsetWidth;
    badge.classList.add("bump");
  }

  function addToCart(id, name, price) {
    var existing = cart.find(function (i) { return i.id === id; });
    if (existing) { existing.qty += 1; }
    else { cart.push({ id: id, name: name, price: price, qty: 1 }); }
    saveCart();
    updateCartBadge();
    // feedback visual en botón
    var btn = document.querySelector('[data-id="' + id + '"].btn-add');
    if (btn) {
      btn.classList.add("added");
      btn.innerHTML = '<i class="fas fa-check"></i> Agregado';
      setTimeout(function () {
        btn.classList.remove("added");
        btn.innerHTML = '<i class="fas fa-plus"></i> Agregar';
      }, 1500);
    }
  }

  function renderCart() {
    var container = document.getElementById("cart-items");
    var totalEl = document.getElementById("cart-total-price");
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = '<div class="cart-empty">🐟 Tu carrito está vacío.<br>¡Agregá algo rico!</div>';
      if (totalEl) totalEl.textContent = "₡0";
      return;
    }

    container.innerHTML = cart.map(function (item) {
      return [
        '<div class="cart-item">',
        '  <span class="cart-item-name">' + item.name + '</span>',
        '  <div class="cart-item-qty">',
        '    <button class="qty-btn" data-cart-action="minus" data-cart-id="' + item.id + '" aria-label="Quitar uno">−</button>',
        '    <span class="qty-val">' + item.qty + '</span>',
        '    <button class="qty-btn" data-cart-action="plus" data-cart-id="' + item.id + '" aria-label="Agregar uno">+</button>',
        '  </div>',
        '  <span class="cart-item-price">' + fmt(item.price * item.qty) + '</span>',
        '  <button class="cart-remove" data-cart-action="remove" data-cart-id="' + item.id + '" aria-label="Eliminar">',
        '    <i class="fas fa-trash"></i>',
        '  </button>',
        '</div>'
      ].join("");
    }).join("");

    if (totalEl) totalEl.textContent = fmt(getCartTotal());
  }

  function initCart() {
    updateCartBadge();

    // Botones de agregar en productos
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(".btn-add");
      if (!btn) return;
      var id = btn.getAttribute("data-id");
      var name = btn.getAttribute("data-name");
      var price = parseInt(btn.getAttribute("data-price"), 10);

      // Mostrar receta primero
      var recipe = RECIPES[id];
      if (recipe) {
        pendingProduct = { id: id, name: name, price: price };
        showRecipeModal(id, recipe);
      } else {
        addToCart(id, name, price);
      }
    });

    // Acciones dentro del carrito
    document.addEventListener("click", function (e) {
      var actionBtn = e.target.closest("[data-cart-action]");
      if (!actionBtn) return;
      var action = actionBtn.getAttribute("data-cart-action");
      var cartId = actionBtn.getAttribute("data-cart-id");
      var idx = cart.findIndex(function (i) { return i.id === cartId; });
      if (idx === -1) return;

      if (action === "plus") { cart[idx].qty += 1; }
      else if (action === "minus") {
        cart[idx].qty -= 1;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
      } else if (action === "remove") { cart.splice(idx, 1); }

      saveCart();
      updateCartBadge();
      renderCart();
      updateCheckoutSummary();
    });

    // Abrir / cerrar carrito
    var btnCart = document.getElementById("btn-cart");
    if (btnCart) btnCart.addEventListener("click", function () {
      renderCart();
      openModal("cart-modal");
    });
    document.getElementById("cart-close").addEventListener("click", function () { closeModal("cart-modal"); });
    document.getElementById("btn-continue").addEventListener("click", function () { closeModal("cart-modal"); });

    // Ir a checkout desde carrito
    document.getElementById("btn-checkout").addEventListener("click", function () {
      if (cart.length === 0) return;
      closeModal("cart-modal");
      updateCheckoutSummary();
      openModal("checkout-modal");
    });

    // Cerrar modales al clicar overlay
    document.querySelectorAll(".modal-overlay").forEach(function (overlay) {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closeModal(overlay.id);
      });
    });
  }

  /* ─── Modal de Receta ─── */
  function showRecipeModal(productId, recipe) {
    var imgEl = document.getElementById("recipe-img");
    var titleEl = document.getElementById("recipe-title");
    var descEl = document.getElementById("recipe-desc");
    var ingrEl = document.getElementById("recipe-ingredients");
    var addBtn = document.getElementById("recipe-add-btn");
    var skipBtn = document.getElementById("recipe-skip");
    if (!imgEl) return;

    imgEl.src = recipe.img;
    imgEl.alt = recipe.title;
    titleEl.textContent = recipe.title;
    descEl.textContent = recipe.desc;
    ingrEl.innerHTML = recipe.ingredients.map(function (i) {
      return "<li>" + i + "</li>";
    }).join("");

    // Botón agregar producto con receta en mente
    addBtn.onclick = function () {
      if (pendingProduct) addToCart(pendingProduct.id, pendingProduct.name, pendingProduct.price);
      pendingProduct = null;
      closeModal("recipe-modal");
    };
    skipBtn.onclick = function () {
      if (pendingProduct) addToCart(pendingProduct.id, pendingProduct.name, pendingProduct.price);
      pendingProduct = null;
      closeModal("recipe-modal");
    };

    document.getElementById("recipe-close").onclick = function () {
      pendingProduct = null;
      closeModal("recipe-modal");
    };

    openModal("recipe-modal");
  }

  /* ─── Checkout ─── */
  function updateCheckoutSummary() {
    var el = document.getElementById("checkout-summary");
    if (!el) return;
    var deliveryType = document.querySelector('input[name="delivery_type"]:checked');
    var zone = document.getElementById("delivery-zone");
    var deliveryCost = 0;
    if (deliveryType && deliveryType.value === "domicilio" && zone) {
      var opt = zone.options[zone.selectedIndex];
      deliveryCost = parseInt(opt.getAttribute("data-cost") || "0", 10);
    }
    var subtotal = getCartTotal();
    var total = subtotal + deliveryCost;

    var lines = cart.map(function (item) {
      return '<div class="summary-line"><span>' + item.name + ' x' + item.qty + '</span><span>' + fmt(item.price * item.qty) + '</span></div>';
    }).join("");
    if (deliveryCost > 0) {
      lines += '<div class="summary-line"><span>Costo de envío</span><span>' + fmt(deliveryCost) + '</span></div>';
    }
    lines += '<div class="summary-line total"><span>Total a pagar</span><span>' + fmt(total) + '</span></div>';
    el.innerHTML = lines;
  }

  function initCheckout() {
    var form = document.getElementById("checkout-form");
    var addrSection = document.getElementById("address-section");
    var zoneSelect = document.getElementById("delivery-zone");
    var successDiv = document.getElementById("checkout-success");

    document.querySelectorAll('input[name="delivery_type"]').forEach(function (radio) {
      radio.addEventListener("change", function () {
        if (addrSection) addrSection.style.display = this.value === "domicilio" ? "block" : "none";
        updateCheckoutSummary();
      });
    });

    if (zoneSelect) zoneSelect.addEventListener("change", updateCheckoutSummary);

    document.getElementById("checkout-close").addEventListener("click", function () { closeModal("checkout-modal"); });

    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var deliveryType = document.querySelector('input[name="delivery_type"]:checked').value;
      var payment = document.querySelector('input[name="payment"]:checked').value;
      var name = document.getElementById("checkout-name").value;
      var phone = document.getElementById("checkout-phone").value;
      var zone = "";
      var address = "";
      var deliveryCost = 0;

      if (deliveryType === "domicilio") {
        var zoneOpt = zoneSelect ? zoneSelect.options[zoneSelect.selectedIndex] : null;
        zone = zoneOpt ? zoneOpt.text : "";
        deliveryCost = zoneOpt ? parseInt(zoneOpt.getAttribute("data-cost") || "0", 10) : 0;
        address = document.getElementById("delivery-address").value;
        if (!zone || !address) { alert("Por favor completá la zona y dirección de entrega."); return; }
      }

      var total = getCartTotal() + deliveryCost;

      // Guardar en historial
      var order = {
        date: new Date().toLocaleDateString("es-CR"),
        items: cart.slice(),
        total: total,
        delivery: deliveryType,
        payment: payment,
        name: name,
        phone: phone
      };
      orders.push(order);
      localStorage.setItem("ebenezer_orders", JSON.stringify(orders));

      // Mensaje WhatsApp
      var itemsText = cart.map(function (i) { return i.name + " x" + i.qty; }).join(", ");
      var deliveryText = deliveryType === "domicilio"
        ? "Entrega a domicilio en " + zone + " — " + address
        : "Recoger en local";
      var paymentText = payment === "sinpe" ? "SINPE Móvil (5543-6622)" : "Efectivo";
      var msg = encodeURIComponent(
        "¡Hola Randall! Quiero hacer un pedido 🐟\n\n" +
        "👤 Nombre: " + name + "\n" +
        "📱 Teléfono: " + phone + "\n\n" +
        "🛒 Pedido:\n" + itemsText + "\n\n" +
        "📍 Entrega: " + deliveryText + "\n" +
        "💳 Pago: " + paymentText + "\n" +
        "💰 Total: " + fmt(total)
      );

      // Mostrar éxito
      form.style.display = "none";
      if (successDiv) {
        successDiv.style.display = "block";
        var phoneEl = document.getElementById("success-phone");
        var msgEl = document.getElementById("success-msg");
        var waBtn = document.getElementById("success-whatsapp");
        if (phoneEl) phoneEl.textContent = phone;
        if (msgEl) msgEl.textContent = "¡Tu pedido está listo! Total: " + fmt(total);
        if (waBtn) waBtn.href = "https://wa.me/50655436622?text=" + msg;
      }

      // Vaciar carrito
      cart = [];
      saveCart();
      updateCartBadge();
    });
  }

  /* ─── Cuenta de usuario ─── */
  function initAccount() {
    var btnAccount = document.getElementById("btn-account");
    var accountClose = document.getElementById("account-close");
    var authView = document.getElementById("auth-view");
    var profileView = document.getElementById("profile-view");

    if (btnAccount) btnAccount.addEventListener("click", function () {
      refreshAccountView();
      openModal("account-modal");
    });
    if (accountClose) accountClose.addEventListener("click", function () { closeModal("account-modal"); });

    // Tabs login / registro
    document.querySelectorAll(".auth-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        document.querySelectorAll(".auth-tab").forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var target = tab.getAttribute("data-tab");
        document.getElementById("login-form").style.display = target === "login" ? "" : "none";
        document.getElementById("register-form").style.display = target === "register" ? "" : "none";
      });
    });

    // Login
    var loginForm = document.getElementById("login-form");
    if (loginForm) loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = document.getElementById("login-email").value;
      var stored = localStorage.getItem("ebenezer_user_data_" + email);
      if (!stored) { alert("No encontramos esa cuenta. ¿Querés registrarte?"); return; }
      var data = JSON.parse(stored);
      var pwd = document.getElementById("login-password").value;
      if (data.password !== pwd) { alert("Contraseña incorrecta, intentá de nuevo."); return; }
      user = { email: email, name: data.name, phone: data.phone };
      localStorage.setItem("ebenezer_user", JSON.stringify(user));
      refreshAccountView();
    });

    // Registro
    var registerForm = document.getElementById("register-form");
    if (registerForm) registerForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("reg-name").value;
      var phone = document.getElementById("reg-phone").value;
      var email = document.getElementById("reg-email").value;
      var password = document.getElementById("reg-password").value;
      if (localStorage.getItem("ebenezer_user_data_" + email)) { alert("Ya existe una cuenta con ese correo."); return; }
      var data = { name: name, phone: phone, password: password };
      localStorage.setItem("ebenezer_user_data_" + email, JSON.stringify(data));
      user = { email: email, name: name, phone: phone };
      localStorage.setItem("ebenezer_user", JSON.stringify(user));
      refreshAccountView();
    });

    // Logout
    var logoutBtn = document.getElementById("btn-logout");
    if (logoutBtn) logoutBtn.addEventListener("click", function () {
      user = null;
      localStorage.removeItem("ebenezer_user");
      refreshAccountView();
    });

    // Tabs de perfil
    document.querySelectorAll(".profile-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        document.querySelectorAll(".profile-tab").forEach(function (t) { t.classList.remove("active"); });
        tab.classList.add("active");
        var target = tab.getAttribute("data-ptab");
        document.querySelectorAll(".profile-panel").forEach(function (p) { p.style.display = "none"; });
        var panel = document.getElementById("profile-" + target);
        if (panel) panel.style.display = "";
        if (target === "historial") renderHistorial();
        if (target === "favoritos") renderFavoritos();
        if (target === "direcciones") renderDirecciones();
      });
    });

    // Agregar dirección
    var addrForm = document.getElementById("address-form");
    if (addrForm) addrForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var val = document.getElementById("new-address").value.trim();
      if (!val) return;
      addresses.push(val);
      localStorage.setItem("ebenezer_addresses", JSON.stringify(addresses));
      document.getElementById("new-address").value = "";
      renderDirecciones();
    });
  }

  function refreshAccountView() {
    var authView = document.getElementById("auth-view");
    var profileView = document.getElementById("profile-view");
    if (!authView || !profileView) return;
    if (user) {
      authView.style.display = "none";
      profileView.style.display = "";
      renderHistorial();
    } else {
      authView.style.display = "";
      profileView.style.display = "none";
    }
  }

  function renderHistorial() {
    var el = document.getElementById("profile-historial");
    if (!el) return;
    if (orders.length === 0) {
      el.innerHTML = '<p class="empty-state">No tenés pedidos aún. ¡Hacé tu primer pedido! 🐟</p>';
      return;
    }
    el.innerHTML = orders.slice().reverse().map(function (o) {
      return '<div class="history-item"><span>' + o.date + ' — ' + o.name + '</span><span class="hist-total">' + fmt(o.total) + '</span></div>';
    }).join("");
  }

  function renderFavoritos() {
    var el = document.getElementById("profile-favoritos");
    if (!el) return;
    if (favorites.length === 0) {
      el.innerHTML = '<p class="empty-state">Aún no tenés favoritos. Dale ♥ a los productos que más te gustan.</p>';
      return;
    }
    el.innerHTML = favorites.map(function (f) {
      return '<div class="history-item"><span>♥ ' + f + '</span></div>';
    }).join("");
  }

  function renderDirecciones() {
    var el = document.getElementById("saved-addresses");
    if (!el) return;
    el.innerHTML = addresses.map(function (a, i) {
      return '<div class="saved-address"><span>📍 ' + a + '</span><button onclick="window.__removeAddress(' + i + ')">🗑</button></div>';
    }).join("");
  }

  window.__removeAddress = function (i) {
    addresses.splice(i, 1);
    localStorage.setItem("ebenezer_addresses", JSON.stringify(addresses));
    renderDirecciones();
  };

  /* ─── GSAP Animaciones ─── */
  function initGSAP() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // Hero content entrada
    gsap.from(".hero-kicker", { opacity: 0, y: 20, duration: 0.7, delay: 0.8 });
    gsap.from(".hero-title", { opacity: 0, y: 40, duration: 0.9, delay: 1.0 });
    gsap.from(".hero-sub", { opacity: 0, y: 30, duration: 0.7, delay: 1.2 });
    gsap.from(".hero-ctas", { opacity: 0, y: 20, duration: 0.7, delay: 1.4 });
    gsap.from(".hero-stats", { opacity: 0, y: 20, duration: 0.7, delay: 1.6 });

    // Parallax en hero
    gsap.to(".hero-img", {
      yPercent: 25,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
  }

  /* ─── Boot ─── */
  function boot() {
    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initCountUp, "initCountUp");
    safe(initReveals, "initReveals");
    safe(initCatTabs, "initCatTabs");
    safe(initCart, "initCart");
    safe(initCheckout, "initCheckout");
    safe(initAccount, "initAccount");
    safe(initGSAP, "initGSAP");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

})();
