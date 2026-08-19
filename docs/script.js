// De enige twee dingen op deze site die JavaScript nodig hebben: de
// thema-schakelaar en het uitklappen van de navigatie op een smal scherm.
// Verder is alles gegenereerde HTML - de actieve pagina in de zijbalk krijgt
// zijn aria-current bij het bouwen, niet hier.
//
// Zonder JavaScript werkt de site gewoon: het thema volgt dan
// prefers-color-scheme en de navigatie staat open (zie stijl.css, html:not(.js)).

(function () {
  "use strict";

  var wortel = document.documentElement;
  var SLEUTEL = "omnissiah-docs-thema";

  function isDonker() {
    if (wortel.classList.contains("dark")) return true;
    if (wortel.classList.contains("licht")) return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  var themaKnop = document.getElementById("thema-knop");
  if (themaKnop) {
    themaKnop.addEventListener("click", function () {
      var naarDonker = !isDonker();
      wortel.classList.toggle("dark", naarDonker);
      wortel.classList.toggle("licht", !naarDonker);
      try {
        localStorage.setItem(SLEUTEL, naarDonker ? "donker" : "licht");
      } catch {
        /* localStorage geblokkeerd: de keuze geldt dan voor deze pagina. */
      }
    });
  }

  var navKnop = document.getElementById("nav-knop");
  var zijbalk = document.getElementById("zijbalk");
  if (navKnop && zijbalk) {
    navKnop.addEventListener("click", function () {
      var open = zijbalk.classList.toggle("open");
      navKnop.setAttribute("aria-expanded", open ? "true" : "false");
      navKnop.setAttribute(
        "aria-label",
        open ? "Hide navigation" : "Show navigation",
      );
    });
  }
})();
