"use strict";

const msnry = new Masonry(document.querySelector(".grid"), {
  columnWidth: ".grid-sizer",
  itemSelector: ".grid-item",
  gutter: ".gutter-sizer",
});
