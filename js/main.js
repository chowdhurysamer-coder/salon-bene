/* Salon Bené — interactions */
(function () {
  "use strict";

  /* ── Loader ─────────────────────────────────────────── */
  var loader = document.getElementById("loader");
  window.addEventListener("load", function () {
    setTimeout(function () { loader.classList.add("is-done"); }, 900);
  });
  // Failsafe: never trap the visitor behind the curtain
  setTimeout(function () { loader.classList.add("is-done"); }, 3500);

  /* ── Header state ───────────────────────────────────── */
  var header = document.getElementById("header");
  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ── Mobile menu ────────────────────────────────────── */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  toggle.addEventListener("click", function () {
    var open = links.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      links.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });

  /* ── Scroll reveal ──────────────────────────────────── */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ── Hero parallax ──────────────────────────────────── */
  var heroMedia = document.getElementById("heroMedia");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (heroMedia && !reduceMotion) {
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          heroMedia.style.transform = "translateY(" + y * 0.28 + "px)";
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* ── Service list: floating image peek ──────────────── */
  var peek = document.getElementById("servicePeek");
  var peekImg = document.getElementById("servicePeekImg");
  var services = document.querySelectorAll(".service");
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (peek && fine && !reduceMotion) {
    var px = 0, py = 0, cx = 0, cy = 0, raf = null;
    var glide = function () {
      cx += (px - cx) * 0.12;
      cy += (py - cy) * 0.12;
      peek.style.transform = "translate(" + cx + "px," + cy + "px)";
      raf = requestAnimationFrame(glide);
    };
    services.forEach(function (card) {
      card.addEventListener("mouseenter", function () {
        var src = card.getAttribute("data-img");
        if (src && peekImg.getAttribute("src") !== src) peekImg.setAttribute("src", src);
        peek.classList.add("is-on");
        if (!raf) raf = requestAnimationFrame(glide);
      });
      card.addEventListener("mousemove", function (e) {
        px = Math.min(e.clientX + 36, window.innerWidth - 260);
        py = Math.min(e.clientY - 140, window.innerHeight - 320);
      });
      card.addEventListener("mouseleave", function () {
        peek.classList.remove("is-on");
      });
    });
    // stop the loop when nothing is shown for a while
    setInterval(function () {
      if (!peek.classList.contains("is-on") && raf) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    }, 2000);
    peek.style.top = "0";
    peek.style.left = "0";
  }

  /* ── Reviews carousel ───────────────────────────────── */
  var reviews = document.querySelectorAll(".review");
  var dots = document.querySelectorAll(".reviews__dot");
  var current = 0;
  var timer = null;

  function showReview(i) {
    reviews[current].classList.remove("is-active");
    dots[current].classList.remove("is-active");
    current = (i + reviews.length) % reviews.length;
    reviews[current].classList.add("is-active");
    dots[current].classList.add("is-active");
  }
  function startRotation() {
    if (timer) clearInterval(timer);
    timer = setInterval(function () { showReview(current + 1); }, 6500);
  }
  dots.forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      showReview(i);
      startRotation();
    });
  });
  if (reviews.length && !reduceMotion) startRotation();

  /* ── Hours: “open now” note ─────────────────────────── */
  var openNote = document.getElementById("openNow");
  if (openNote) {
    // Open Wed(3)–Sat(6), 10:00–17:30, local salon time
    var now = new Date();
    var day = now.getDay();
    var mins = now.getHours() * 60 + now.getMinutes();
    var isOpenDay = day >= 3 && day <= 6;
    var isOpenNow = isOpenDay && mins >= 600 && mins < 1050;
    if (isOpenNow) {
      openNote.textContent = "We’re in the salon right now — call ahead and come by.";
    } else if (isOpenDay && mins < 600) {
      openNote.textContent = "Doors open at 10 this morning.";
    } else {
      openNote.textContent = "We’ll see you Wednesday through Saturday.";
    }
  }

  /* ── Footer year ────────────────────────────────────── */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
