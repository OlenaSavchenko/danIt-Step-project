"use strict";

const box = document.querySelector(".grid");
const msnry = new Masonry(box, {
  columnWidth: ".grid-sizer",
  itemSelector: ".grid-item",
  percentPosition: true,
  horizontalOrder: true,
});
