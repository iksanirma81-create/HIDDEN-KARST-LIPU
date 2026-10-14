/* GUA LAUMEHE — Digital Cave Experience · logika interaksi
   Semua konten dibaca dari window.LAUMEHE (js/data.js). */
(function () {
  "use strict";
  var D = window.LAUMEHE;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var LOCS = D.locations, CHAPS = D.chapters;
  var locById = {}, chapById = {};
  LOCS.forEach(function (l, i) { l.index = i; locById[l.id] = l; });
  CHAPS.forEach(function (c, i) { c.index = i; chapById[c.id] = c; });

  var state = { loc: 0, chap: 0, visited: {}, zoom: 1, x: 0, y: 0, mapOk: false };
  try {
    var saved = JSON.parse(sessionStorage.getItem("laumehe-visited") || "{}");
    if (saved && typeof saved === "object") state.visited = saved;
  } catch (e) {}

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------- Placeholder berlabel (jika foto belum diunggah) ---------- */
  function placeholder(label, n) {
    var hue = 150 + (parseInt(n, 10) || 0) * 9;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">' +
      '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="hsl(' + hue + ',45%,16%)"/><stop offset="1" stop-color="hsl(' + (hue + 20) + ',40%,6%)"/></linearGradient></defs>' +
      '<rect width="800" height="600" fill="url(#g)"/>' +
      '<path d="M0 600V420q90-110 180-60t160-90q90-120 180-40t140-60q70 20 140 40V600z" fill="rgba(0,0,0,.35)"/>' +
      '<g fill="rgba(255,255,255,.14)"><path d="M120 0l20 90 20-90zM300 0l14 60 14-60zM560 0l22 110 22-110z"/></g>' +
      '<rect x="230" y="236" width="340" height="128" rx="18" fill="rgba(0,0,0,.55)" stroke="rgba(45,212,191,.7)"/>' +
      '<text x="400" y="288" text-anchor="middle" font-family="sans-serif" font-weight="800" font-size="24" letter-spacing="4" fill="#2dd4bf">PLACEHOLDER</text>' +
      '<text x="400" y="320" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#fff">' + esc(label) + '</text>' +
      '<text x="400" y="346" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#9aa7a3">Foto asli belum diunggah</text></svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function imgTag(src, label, n, alt, eager) {
    return '<img src="' + esc(src) + '" alt="' + esc(alt || label) + '" data-label="' + esc(label) + '" data-n="' + esc(n || 0) + '"' +
      (eager ? "" : ' loading="lazy"') + ' decoding="async">';
  }
  // Fallback untuk semua <img> yang gagal dimuat
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (t && t.tagName === "IMG" && t.dataset && t.dataset.label && !t.dataset.fb) {
      t.dataset.fb = "1";
      t.src = placeholder(t.dataset.label, t.dataset.n);
    }
  }, true);

  /* ---------- Progres ---------- */
  function markVisited(id) {
    state.visited[id] = 1;
    try { sessionStorage.setItem("laumehe-visited", JSON.stringify(state.visited)); } catch (e) {}
  }
  function visitedCount() { return Object.keys(state.visited).length; }

  var floatEl = $("#floatProg"), floatTimer;
  function updateFloat(text) {
    var pct = Math.round(visitedCount() / LOCS.length * 100);
    floatEl.innerHTML = "<span>" + esc(text) + "</span><i><b style='width:" + pct + "%'></b></i><span>" + visitedCount() + "/" + LOCS.length + "</span>";
    floatEl.classList.add("show");
    clearTimeout(floatTimer);
    floatTimer = setTimeout(function () { floatEl.classList.remove("show"); }, 3500);
  }

  /* ---------- Navbar ---------- */
  var toggle = $("#navToggle"), menu = $("#navMenu");
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  });
  $$("a", menu).forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
  var spy = $$("[data-spy]");
  if ("IntersectionObserver" in window) {
    var spyObs = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          spy.forEach(function (a) { a.classList.toggle("active", a.dataset.spy === e.target.id); });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["beranda", "storytelling", "mapping", "virtual", "rules", "info"].forEach(function (id) {
      var el = document.getElementById(id); if (el) spyObs.observe(el);
    });
  }
  function goTo(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- Hero ---------- */
  (function hero() {
    var bg = $("#heroBg"), probe = new Image();
    probe.onload = function () { bg.style.backgroundImage = "url('" + D.assets.hero + "')"; };
    probe.onerror = function () { $("#heroNote").hidden = false; };
    probe.src = D.assets.hero;

    var track = $("#cardsTrack");
    track.innerHTML = LOCS.map(function (l) {
      return '<button class="pcard" data-loc="' + l.id + '" aria-label="' + esc(l.name) + '">' +
        imgTag(l.photo, l.name, l.no, l.name, true) +
        '<div><b>' + l.no + '</b><span>' + esc(l.name) + '</span></div></button>';
    }).join("");
    track.addEventListener("click", function (e) {
      var b = e.target.closest(".pcard"); if (b) openVirtual(b.dataset.loc);
    });
    function slide(dir) {
      var w = ($(".pcard", track) || { offsetWidth: 180 }).offsetWidth + 14;
      track.scrollBy({ left: dir * w * 2, behavior: "smooth" });
    }
    $("#cardsPrev").addEventListener("click", function () { slide(-1); });
    $("#cardsNext").addEventListener("click", function () { slide(1); });
  })();

  /* ---------- Storytelling ---------- */
  function renderStory() {
    $("#timeline").innerHTML = CHAPS.map(function (c) {
      return '<li data-chap="' + c.id + '"><button><b>' + c.no + '</b>' + esc(c.title) + '</button></li>';
    }).join("");

    $("#chapters").innerHTML = CHAPS.map(function (c, i) {
      var loc = locById[c.locationId];
      return '<article class="chapter reveal" id="' + c.id + '" data-chap="' + c.id + '">' +
        '<div class="chapter__photo">' + imgTag(c.photo, "Bab " + c.no + " — " + c.title, c.no, c.title) +
        '<span class="chapter__num">' + c.no + '</span></div>' +
        '<div class="chapter__body">' +
        '<span class="badge">Draf konten</span>' +
        '<h3>' + esc(c.title) + '</h3>' +
        '<p class="chapter__sum">' + esc(c.summary) + '</p>' +
        '<div class="chapter__more"><div>' + c.body.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("") + '</div></div>' +
        '<div class="chapter__actions">' +
        '<button class="btn btn--primary btn--sm" data-act="read" aria-expanded="false">Baca Cerita</button>' +
        '<button class="btn btn--ghost btn--sm" data-act="map" data-loc="' + loc.id + '">Lihat di Peta</button>' +
        '<div class="chapter__pager">' +
        '<button data-act="prev" aria-label="Bab sebelumnya"' + (i === 0 ? " disabled" : "") + '>‹</button>' +
        '<button data-act="next" aria-label="Bab berikutnya"' + (i === CHAPS.length - 1 ? " disabled" : "") + '>›</button>' +
        '</div></div></div></article>';
    }).join("");

    $("#timeline").addEventListener("click", function (e) {
      var li = e.target.closest("li"); if (li) openStory(li.dataset.chap, true);
    });
    $("#chapters").addEventListener("click", function (e) {
      var b = e.target.closest("button[data-act]"); if (!b) return;
      var art = b.closest(".chapter"), c = chapById[art.dataset.chap], act = b.dataset.act;
      if (act === "read") toggleRead(art);
      else if (act === "map") showOnMap(b.dataset.loc);
      else if (act === "prev") openStory(CHAPS[c.index - 1].id, false);
      else if (act === "next") openStory(CHAPS[c.index + 1].id, false);
    });

    var els = $$(".chapter");
    if ("IntersectionObserver" in window) {
      var revObs = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add("in"); });
      }, { threshold: 0.15 });
      els.forEach(function (el) { revObs.observe(el); });
      var actObs = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) setActiveChapter(e.target.dataset.chap); });
      }, { rootMargin: "-40% 0px -50% 0px" });
      els.forEach(function (el) { actObs.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("in"); });
    }
    setActiveChapter(CHAPS[0].id, true);
  }
  function toggleRead(art, force) {
    var more = $(".chapter__more", art), btn = $('[data-act="read"]', art);
    var open = typeof force === "boolean" ? force : !more.classList.contains("open");
    more.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.textContent = open ? "Tutup Cerita" : "Baca Cerita";
  }
  function setActiveChapter(id, silent) {
    var c = chapById[id]; if (!c) return;
    state.chap = c.index;
    $$("#timeline li").forEach(function (li) { li.classList.toggle("active", li.dataset.chap === id); });
    if (!silent) updateFloat("Bab " + c.no + " · " + c.title);
  }
  function openStory(id, expand) {
    var art = document.getElementById(id); if (!art) return;
    art.classList.add("in");
    if (expand !== false) toggleRead(art, true);
    setActiveChapter(id);
    art.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  /* ---------- Digital Mapping ---------- */
  var vp = $("#mapViewport"), canvas = $("#mapCanvas"), mapImg = $("#mapImg"), markersEl = $("#markers"), statusEl = $("#mapStatus");

  function renderMap() {
    markersEl.innerHTML = LOCS.map(function (l) {
      return '<button class="marker" data-loc="' + l.id + '" style="left:' + l.mapPos.x + '%;top:' + l.mapPos.y + '%" aria-label="' + l.no + ' ' + esc(l.name) + '">' + l.no + '</button>';
    }).join("");
    $("#legend").innerHTML = LOCS.map(function (l) {
      return '<li><button data-loc="' + l.id + '"><i>' + l.no + '</i>' + esc(l.name) + '</button></li>';
    }).join("");

    mapImg.addEventListener("load", function () { state.mapOk = true; resetView(); });
    mapImg.addEventListener("error", function () {
      mapImg.removeAttribute("src");
      canvas.insertBefore(Object.assign(document.createElement("div"), { className: "map-fallback" }), markersEl);
      mapImg.style.display = "none";
      statusEl.textContent = "Peta asli belum diunggah — marker memakai posisi sementara. Letakkan peta di " + D.assets.map;
      resetView();
    });
    mapImg.src = D.assets.map;

    function pick(e) {
      var b = e.target.closest("[data-loc]"); if (b) selectLocation(b.dataset.loc, { focus: false });
    }
    markersEl.addEventListener("click", pick);
    $("#legend").addEventListener("click", function (e) {
      var b = e.target.closest("[data-loc]"); if (b) selectLocation(b.dataset.loc, { focus: true });
    });
    $("#infoPanel").addEventListener("click", function (e) {
      var b = e.target.closest("[data-act]"); if (!b) return;
      var id = LOCS[state.loc].id;
      if (b.dataset.act === "story") openStory(LOCS[state.loc].chapterId, true);
      if (b.dataset.act === "virtual") openVirtual(id);
    });

    bindPanZoom();
    $("#zoomIn").addEventListener("click", function () { zoomAt(1.3); });
    $("#zoomOut").addEventListener("click", function () { zoomAt(1 / 1.3); });
    $("#zoomReset").addEventListener("click", resetView);
    $("#mapFull").addEventListener("click", function () { fullscreen($(".mapbox")); });
    window.addEventListener("resize", function () { resetView(); });
    document.addEventListener("fullscreenchange", function () { setTimeout(resetView, 80); });
  }

  function size() { return { vw: vp.clientWidth, vh: vp.clientHeight, cw: canvas.offsetWidth, ch: canvas.offsetHeight }; }
  function clampView() {
    var s = size(), z = state.zoom, w = s.cw * z, h = s.ch * z;
    state.x = w <= s.vw ? (s.vw - w) / 2 : Math.min(0, Math.max(s.vw - w, state.x));
    state.y = h <= s.vh ? (s.vh - h) / 2 : Math.min(0, Math.max(s.vh - h, state.y));
  }
  function applyView() {
    clampView();
    canvas.style.transform = "translate(" + state.x + "px," + state.y + "px) scale(" + state.zoom + ")";
    canvas.style.setProperty("--inv", (1 / state.zoom).toFixed(3));
  }
  function resetView() {
    var s = size();
    // tinggi viewport mengikuti rasio gambar pada layar biasa
    if (document.fullscreenElement) vp.style.height = "";
    else { vp.style.height = ""; s = size(); vp.style.height = s.ch ? s.ch + "px" : ""; }
    state.zoom = 1; state.x = 0; state.y = 0; applyView();
  }
  function zoomAt(f, cx, cy) {
    var s = size(), nz = Math.min(5, Math.max(1, state.zoom * f));
    cx = cx == null ? s.vw / 2 : cx; cy = cy == null ? s.vh / 2 : cy;
    var px = (cx - state.x) / state.zoom, py = (cy - state.y) / state.zoom;
    state.zoom = nz; state.x = cx - px * nz; state.y = cy - py * nz; applyView();
  }
  function focusMarker(l) {
    var s = size(), z = 2.2;
    var px = l.mapPos.x / 100 * s.cw, py = l.mapPos.y / 100 * s.ch;
    state.zoom = z; state.x = s.vw / 2 - px * z; state.y = s.vh / 2 - py * z; applyView();
  }
  function bindPanZoom() {
    var ptrs = {}, last = null, pinch = 0, moved = false;
    vp.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".marker")) return;
      vp.setPointerCapture(e.pointerId);
      ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
      last = { x: e.clientX, y: e.clientY }; vp.classList.add("drag");
    });
    vp.addEventListener("pointermove", function (e) {
      if (!ptrs[e.pointerId]) return;
      ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(ptrs);
      if (ids.length === 2) {
        var a = ptrs[ids[0]], b = ptrs[ids[1]], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (pinch) {
          var r = vp.getBoundingClientRect();
          zoomAt(d / pinch, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
        }
        pinch = d;
      } else if (last) {
        state.x += e.clientX - last.x; state.y += e.clientY - last.y;
        last = { x: e.clientX, y: e.clientY }; applyView();
      }
    });
    function end(e) { delete ptrs[e.pointerId]; pinch = 0; last = null; vp.classList.remove("drag"); }
    vp.addEventListener("pointerup", end);
    vp.addEventListener("pointercancel", end);
    vp.addEventListener("wheel", function (e) {
      e.preventDefault();
      var r = vp.getBoundingClientRect();
      zoomAt(e.deltaY < 0 ? 1.15 : 1 / 1.15, e.clientX - r.left, e.clientY - r.top);
    }, { passive: false });
    vp.addEventListener("keydown", function (e) {
      if (e.key === "+" || e.key === "=") zoomAt(1.3);
      else if (e.key === "-") zoomAt(1 / 1.3);
      else if (e.key === "ArrowLeft") { state.x += 40; applyView(); }
      else if (e.key === "ArrowRight") { state.x -= 40; applyView(); }
      else if (e.key === "ArrowUp") { state.y += 40; applyView(); }
      else if (e.key === "ArrowDown") { state.y -= 40; applyView(); }
    });
  }
  function fullscreen(el) {
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    var f = el.requestFullscreen || el.webkitRequestFullscreen;
    if (f) f.call(el);
  }

  function renderPanel() {
    var l = LOCS[state.loc];
    $("#infoPanel").innerHTML =
      '<div class="panel__photo">' + imgTag(l.photo, l.name, l.no, l.name) + '</div>' +
      '<div class="panel__body"><span class="panel__no">LOKASI ' + l.no + ' / 0' + LOCS.length + '</span>' +
      '<h3>' + esc(l.name) + '</h3><p>' + esc(l.desc) + '</p>' +
      '<div class="edu"><b>Info edukatif:</b> ' + esc(l.edu) + '</div>' +
      '<div class="panel__btns">' +
      '<button class="btn btn--primary btn--sm" data-act="story">Buka Cerita</button>' +
      '<button class="btn btn--ghost btn--sm" data-act="virtual">Buka Virtual Experience</button></div></div>';
  }

  /* ---------- Virtual Experience ---------- */
  var panoViewer = null, panoLoading = null;
  function loadPannellum(cb, fail) {
    if (window.pannellum) return cb();
    if (panoLoading) { panoLoading.push([cb, fail]); return; }
    panoLoading = [[cb, fail]];
    var css = document.createElement("link");
    css.rel = "stylesheet"; css.href = "https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.css";
    document.head.appendChild(css);
    var s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/pannellum/2.5.6/pannellum.js";
    s.onload = function () { var q = panoLoading; panoLoading = null; q.forEach(function (p) { p[0](); }); };
    s.onerror = function () { var q = panoLoading; panoLoading = null; q.forEach(function (p) { p[1](); }); };
    document.head.appendChild(s);
  }
  function renderVirtual() {
    var l = LOCS[state.loc], media = $("#vrMedia"), badge = $("#vrBadge");
    if (panoViewer) { try { panoViewer.destroy(); } catch (e) {} panoViewer = null; }
    function photo() {
      media.innerHTML = imgTag(l.photo, l.name, l.no, l.name, true);
      badge.className = "vr__badge"; badge.textContent = "Pratinjau foto — bukan 360° / 3D";
    }
    if (l.pano) {
      media.innerHTML = '<div id="panoBox"></div>';
      badge.className = "vr__badge pano"; badge.textContent = "Panorama 360° — seret untuk melihat";
      loadPannellum(function () {
        try {
          panoViewer = window.pannellum.viewer("panoBox", { type: "equirectangular", panorama: l.pano, autoLoad: true, showControls: true });
        } catch (e) { photo(); }
      }, photo);
    } else { photo(); }
    $("#vrNo").textContent = "LOKASI " + l.no + " / 0" + LOCS.length;
    $("#vrTitle").textContent = l.name;
    $("#vrCaption").textContent = l.caption;
    $("#vrNarr").textContent = l.narration;
    $("#progText").textContent = (state.loc + 1) + " / " + LOCS.length;
    $("#progBar").style.width = (visitedCount() / LOCS.length * 100) + "%";
    $("#progDots").innerHTML = LOCS.map(function (x, i) {
      var cls = i === state.loc ? "cur" : (state.visited[x.id] ? "seen" : "");
      return '<button class="' + cls + '" data-loc="' + x.id + '" aria-label="' + esc(x.name) + '"></button>';
    }).join("");
    $("#vrPrev").disabled = state.loc === 0;
    $("#vrNext").disabled = state.loc === LOCS.length - 1;
    $$("#vrThumbs .thumb").forEach(function (t, i) { t.classList.toggle("cur", i === state.loc); });
  }
  function bindVirtual() {
    $("#vrThumbs").innerHTML = LOCS.map(function (l) {
      return '<button class="thumb" data-loc="' + l.id + '" aria-label="' + esc(l.name) + '">' + imgTag(l.photo, l.name, l.no, l.name) + '<b>' + l.no + ' ' + esc(l.name) + '</b></button>';
    }).join("");
    $("#vrThumbs").addEventListener("click", function (e) { var b = e.target.closest("[data-loc]"); if (b) selectLocation(b.dataset.loc); });
    $("#progDots").addEventListener("click", function (e) { var b = e.target.closest("[data-loc]"); if (b) selectLocation(b.dataset.loc); });
    $("#vrPrev").addEventListener("click", function () { if (state.loc > 0) selectLocation(LOCS[state.loc - 1].id); });
    $("#vrNext").addEventListener("click", function () { if (state.loc < LOCS.length - 1) selectLocation(LOCS[state.loc + 1].id); });
    $("#vrStory").addEventListener("click", function () { openStory(LOCS[state.loc].chapterId, true); });
    $("#vrMap").addEventListener("click", function () { showOnMap(LOCS[state.loc].id); });
    $("#vrFull").addEventListener("click", function () { fullscreen($("#vrStage")); });
  }

  /* ---------- Sinkronisasi lokasi (satu sumber kebenaran) ---------- */
  function selectLocation(id, opt) {
    var l = locById[id]; if (!l) return;
    opt = opt || {};
    state.loc = l.index;
    markVisited(id);
    $$(".marker").forEach(function (m) { m.classList.toggle("active", m.dataset.loc === id); m.classList.remove("pulse"); });
    $$("#legend button").forEach(function (b) { b.classList.toggle("active", b.dataset.loc === id); });
    renderPanel();
    renderVirtual();
    if (opt.focus) focusMarker(l);
    var ch = chapById[l.chapterId];
    if (ch) setActiveChapter(ch.id, true);
    updateFloat("Lokasi " + l.no + " · " + l.name);
  }
  function showOnMap(id) {
    selectLocation(id, { focus: false });
    goTo("mapping");
    setTimeout(function () {
      var m = $('.marker[data-loc="' + id + '"]');
      if (m) { m.classList.add("pulse"); setTimeout(function () { m.classList.remove("pulse"); }, 3000); }
    }, 500);
  }
  function openVirtual(id) { selectLocation(id); goTo("virtual"); }

  /* ---------- Tata tertib, jam, tentang, galeri ---------- */
  function renderStatic() {
    $("#rulesGrid").innerHTML = D.rules.map(function (r, i) {
      return '<div class="rule reveal"><div class="rule__ic">' + r.icon + '<sup>' + (i + 1) + '</sup></div><p>' + esc(r.text) + '</p></div>';
    }).join("");
    $("#rulesMsg").textContent = D.rulesMessage;
    $("#rulesDisc").textContent = D.rulesDisclaimer;

    $("#hrTime").textContent = D.hours.time;
    $("#hrDays").textContent = D.hours.days;
    $("#hrAddr").textContent = D.site.addressShort;
    $("#hrRemind").textContent = D.hours.reminder;
    $("#hrDisc").textContent = D.hours.disclaimer;
    $("#hrMaps").href = D.site.mapsUrl || ("https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(D.site.mapsFallbackQuery));

    $("#abTitle").textContent = D.about.title;
    $("#abText").innerHTML = D.about.paragraphs.map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
    $("#pillars").innerHTML = D.about.pillars.map(function (p) {
      return '<div class="pillar"><span>' + p.icon + '</span><h4>' + esc(p.title) + '</h4><p>' + esc(p.text) + '</p></div>';
    }).join("");

    $("#gallery").innerHTML = LOCS.map(function (l, i) {
      return '<button class="gitem" data-i="' + i + '">' + imgTag(l.photo, l.name, l.no, l.name) + '<span><b>' + l.no + '</b>' + esc(l.caption) + '</span></button>';
    }).join("");
    $("#ftAddr").textContent = D.site.addressShort;
    $("#year").textContent = new Date().getFullYear();

    if ("IntersectionObserver" in window) {
      var o = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); o.unobserve(e.target); } });
      }, { threshold: 0.1 });
      $$(".rule").forEach(function (el) { o.observe(el); });
    } else { $$(".rule").forEach(function (el) { el.classList.add("in"); }); }
  }

  /* ---------- Lightbox ---------- */
  var lb = $("#lightbox"), lbI = 0;
  function lbShow(i) {
    lbI = (i + LOCS.length) % LOCS.length;
    var l = LOCS[lbI], im = $("#lbImg");
    im.dataset.fb = ""; im.dataset.label = l.name; im.dataset.n = l.no;
    im.src = l.photo; im.alt = l.name;
    $("#lbCap").textContent = l.no + " — " + l.name + ": " + l.caption;
  }
  function lbOpen(i) { lb.hidden = false; document.body.style.overflow = "hidden"; lbShow(i); $("#lbClose").focus(); }
  function lbClose() { lb.hidden = true; document.body.style.overflow = ""; }
  function bindLightbox() {
    $("#gallery").addEventListener("click", function (e) { var b = e.target.closest(".gitem"); if (b) lbOpen(+b.dataset.i); });
    $("#lbClose").addEventListener("click", lbClose);
    $("#lbPrev").addEventListener("click", function () { lbShow(lbI - 1); });
    $("#lbNext").addEventListener("click", function () { lbShow(lbI + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lbClose(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") lbClose();
      if (e.key === "ArrowLeft") lbShow(lbI - 1);
      if (e.key === "ArrowRight") lbShow(lbI + 1);
    });
  }

  /* ---------- Init ---------- */
  renderStory();
  renderMap();
  renderStatic();
  bindVirtual();
  bindLightbox();
  // Tampilan awal tanpa memicu notifikasi progres
  (function init() {
    var l = LOCS[0];
    $$(".marker").forEach(function (m) { m.classList.toggle("active", m.dataset.loc === l.id); });
    $$("#legend button").forEach(function (b) { b.classList.toggle("active", b.dataset.loc === l.id); });
    renderPanel();
    renderVirtual();
  })();
})();
