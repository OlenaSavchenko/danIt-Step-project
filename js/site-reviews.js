"use strict";
const servicesList = document.getElementById("services__list");
const reviewsSliderList = document.getElementById("reviews-slider__list");
const reviewsSliderItems = Array.from(reviewsSliderList.children);
const sliderPrevBtn = document.getElementById("reviews-slider__btn-prev");
const sliderNextBtn = document.getElementById("reviews-slider__btn-next");

const handleServicesListClick = (event) => {
  let item = event.target.closest("li");
  setActiveClass(
    Array.from(servicesList.children),
    item,
    "services__item--active"
  );
  showContent(
    document.querySelectorAll(".services__conten-box"),
    item.dataset.servicesTitle,
    "servicesContent"
  );
};

const handleSliderClick = (event) => {
  let item = event.target.closest("li");
  if (!item || !reviewsSliderList.contains(item)) return;
  setActiveClass(reviewsSliderItems, item, "reviews-slider__item--active");
  showContent(
    document.querySelectorAll(".reviews-card"),
    item.dataset.sliderUser,
    "reviewsUser"
  );
};

const handleSliderPrevBtnClick = () => {
  let index = findActiveItemIndex();
  let activeItem;
  index === 0
    ? (activeItem = reviewsSliderItems[reviewsSliderItems.length - 1])
    : (activeItem = reviewsSliderItems[index - 1]);

  setActiveClass(
    reviewsSliderItems,
    activeItem,
    "reviews-slider__item--active"
  );
  showContent(
    document.querySelectorAll(".reviews-card"),
    activeItem.dataset.sliderUser,
    "reviewsUser"
  );
};

const handleSliderNextBtnClick = () => {
  let index = findActiveItemIndex();
  let activeItem;
  index === reviewsSliderItems.length - 1
    ? (activeItem = reviewsSliderItems[0])
    : (activeItem = reviewsSliderItems[index + 1]);

  setActiveClass(
    reviewsSliderItems,
    activeItem,
    "reviews-slider__item--active"
  );
  showContent(
    document.querySelectorAll(".reviews-card"),
    activeItem.dataset.sliderUser,
    "reviewsUser"
  );
};

const findActiveItemIndex = () => {
  const item = reviewsSliderItems.find((item) =>
    item.classList.contains("reviews-slider__item--active")
  );
  const index = reviewsSliderItems.indexOf(item);

  return index;
};

const setActiveClass = (itemsArr, activeElem, activeClass) => {
  itemsArr.forEach((item) => {
    item === activeElem
      ? item.classList.add(activeClass)
      : item.classList.remove(activeClass);
  });
};

const showContent = (hiddenElemsArr, activeElemAttr, attr) => {
  hiddenElemsArr.forEach((item) => {
    item.dataset[attr] === activeElemAttr
      ? item.removeAttribute("hidden")
      : item.setAttribute("hidden", "hidden");
  });
};

servicesList.addEventListener("click", handleServicesListClick);
reviewsSliderList.addEventListener("click", handleSliderClick);
sliderPrevBtn.addEventListener("click", handleSliderPrevBtnClick);
sliderNextBtn.addEventListener("click", handleSliderNextBtnClick);
