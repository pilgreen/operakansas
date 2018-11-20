/**
 * Opera Kansas javascript file
 */

var hamburger = document.querySelector(".hamburger");
var content = document.querySelector("#content");

hamburger.addEventListener("click", function() {
  document.body.classList.toggle("nav-out");
});

content.addEventListener("click", function() {
  document.body.classList.remove("nav-out");
});

/**
 * Install the service worker
 */

if ('serviceWorker' in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("/service-worker.js");
  })
}

// Test with webhook
