"use strict";

const container = document.querySelector(".grid");
let msnry;

imagesLoaded(container, function () {
  msnry = new Masonry(container, {
    columnWidth: ".grid-sizer",
    itemSelector: ".grid-item",
    gutter: ".gutter-sizer",
    presentPosition: true,
    singleMode: false,
  });
});
