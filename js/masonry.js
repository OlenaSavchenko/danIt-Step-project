"use strict";

const $grid = $(".grid").imagesLoaded(function () {
  $grid.masonry({
    columnWidth: ".grid-sizer",
    itemSelector: ".grid-item",
    gutter: ".gutter-sizer",
  });

  $grid.addClass("loaded");
});
