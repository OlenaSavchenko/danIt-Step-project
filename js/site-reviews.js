"use strict";
const servicesList = document.getElementById("services__list");
const reviewsSliderList = document.getElementById("reviews-slider__list");
const reviewsSliderItems = Array.from(reviewsSliderList.children);
const sliderPrevBtn = document.getElementById("reviews-slider__btn-prev");
const sliderNextBtn = document.getElementById("reviews-slider__btn-next");
const worksList = document.getElementById("works__list");
const worksImgList = document.getElementById("works__photos-list");
const worksLoadMoreBtn = document.getElementById("load-more__btn--works");
const galleryLoadMoreBtn = document.getElementById("load-more__btn--gallery");
// const galleryImagesBox = document.querySelector(".gallery");

let worksBtnClickCount = 2;
let galleryBtnClickCount = 2;

// ----------services section----------
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

// ----------reviews section----------
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
// ----------works example section----------
const handleWorksListClick = (event) => {
  const item = event.target.closest("li");
  const worksContent = Array.from(
    document.querySelectorAll(".works__overlay-subtitle")
  );
  worksContent.forEach((el) => {
    if (
      el.textContent.toLowerCase() === item.textContent.toLowerCase() ||
      item.textContent.toLowerCase() === "all"
    ) {
      el.closest("li").removeAttribute("hidden");
    } else {
      el.closest("li").setAttribute("hidden", "hidden");
    }
  });
};

const handleWorksLoadMoreBtn = () => {
  const fragment = document.createDocumentFragment();
  let k = 12;
  worksBtnClickCount === 1 ? (k += k) : k;
  worksBtnClickCount--;
  for (let i = 0; i < 12; i++) {
    const li = document.createElement("li");
    li.classList.add("works__photos-item");
    li.innerHTML = `<div class="works__photos-container"> <img class="works__photos-img img" src="./img/works-section/works-section${k++}.jpg" alt="our works"/> <div class="works__overlay"> <ul class="list works__overlay-list"><li class="works__overlay-item"><a class="works__overlay-link works__overlay-link--chain" href="#"></a></li><li><a class="works__overlay-link works__overlay-link--elipse" href="#"></a></li></ul><p class="works__overlay-subtitle">graphic design</p><p class="works__overlay-content">graphic design</p></div></div>`;
    fragment.append(li);
  }

  if (worksBtnClickCount === 0) {
    worksLoadMoreBtn.removeEventListener("click", handleWorksLoadMoreBtn);
    worksLoadMoreBtn.remove();
  }
  worksImgList.append(fragment);
};

//  ----------gallery----------
const handleGalleryLoadMoreBtn = () => {
  const fragment = document.createDocumentFragment();
  let k = 10;
  galleryBtnClickCount === 1 ? (k += k) : k;
  galleryBtnClickCount--;

  for (let i = 0; i < 10; i++) {
    const div = document.createElement("div");
    div.classList.add("gallery__img-box");
    div.innerHTML = `<img
    class="gallery__img"
    src="./img/gallery-section/store.jpg"
    alt="store"
  />
  <div class="gallery__overlay">
    <ul class="list gallery__overlay-list">
      <li class="gallery__overlay-item">
        <a
          class="
            gallery__overlay-link gallery__overlay-link--resize
          "
          href="#"
        >
        </a>
      </li>
      <li>
        <a
          class="
            gallery__overlay-link gallery__overlay-link--search
          "
          href="#"
        ></a>
      </li>
    </ul>
  </div>
</div>`;

    fragment.append(div);
  }

  if (galleryBtnClickCount === 0) {
    galleryLoadMoreBtn.removeEventListener("click", handleWorksLoadMoreBtn);
    galleryLoadMoreBtn.remove();
  }

  galleryLoadMoreBtn.before(fragment);
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
worksList.addEventListener("click", handleWorksListClick);
worksLoadMoreBtn.addEventListener("click", handleWorksLoadMoreBtn);
galleryLoadMoreBtn.addEventListener("click", handleGalleryLoadMoreBtn);
