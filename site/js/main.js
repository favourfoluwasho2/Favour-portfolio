/* =========================================================================
   main.js — shared behaviour across every page
   Handles: mobile nav toggle, footer year, scroll-reveal animation.
   ========================================================================= */

(function () {
  "use strict";

  // ---- Footer year, refreshed on every page load ----
  var yearEls = document.querySelectorAll("#year");
  yearEls.forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- Mobile nav toggle ----
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("open");
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the mobile menu once a link is chosen
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- Scroll-reveal for elements marked .reveal ----
  var revealTargets = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealTargets.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: no IntersectionObserver support — just show everything
    revealTargets.forEach(function (el) {
      el.classList.add("in");
    });
  }
})();
