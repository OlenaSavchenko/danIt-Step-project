"use strict";

const reviewsSliderArr = Array.from(
  document.getElementById("reviews-slider__list").children
);
const reviewsCards = document.querySelectorAll(".reviews-card");
const servicesTitlesArr = Array.from(
  document.getElementById("services__list").children
);
const servicesCards = document.querySelectorAll(".services__conten-box");

const handleItemClick = (
  clickElemsArr,
  hiddenContent,
  activeClass,
  clickDatasetAttr,
  hiddenDatasetAttr
) => {
  clickElemsArr.forEach(
    (elem) =>
      (elem.onclick = () => {
        setActiveClass(clickElemsArr, elem, activeClass);
        showContent(
          hiddenContent,
          elem.dataset[clickDatasetAttr],
          hiddenDatasetAttr
        );
      })
  );
};

const setActiveClass = (items, elem, activeClass) => {
  items.forEach((item) => {
    item === elem
      ? item.classList.add(activeClass)
      : item.classList.remove(activeClass);
  });
};

const showContent = (items, elem, attr) => {
  items.forEach((item) => {
    item.dataset[attr] === elem
      ? item.removeAttribute("hidden")
      : item.setAttribute("hidden", "hidden");
  });
};

handleItemClick(
  reviewsSliderArr,
  reviewsCards,
  "reviews-slider__item--active",
  "sliderUser",
  "reviewsUser"
);

handleItemClick(
  servicesTitlesArr,
  servicesCards,
  "services__item--active",
  "servicesTitle",
  "servicesContent"
);
