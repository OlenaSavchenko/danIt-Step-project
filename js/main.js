"use strict";

const services = {
  list: document.getElementById("services__list"),
  items: [...document.querySelectorAll(".services__item")],
  content: document.querySelectorAll(".services__conten-box"),
};

const slider = {
  list: document.getElementById("reviews-slider__list"),
  items: [...document.querySelectorAll(".reviews-slider__item")],
  content: document.querySelectorAll(".reviews-card"),
  prevBtn: document.getElementById("reviews-slider__btn-prev"),
  nextBtn: document.getElementById("reviews-slider__btn-next"),
  activeClass: "reviews-slider__item--active",
};

const works = {
  list: document.getElementById("works__list"),
  imgList: document.getElementById("works__photos-list"),
  loadMoreBtn: document.getElementById("load-more__btn--works"),
  titlesArr: ["graphic design", "web design", "landing pages", "wordpress"],
  timerId: null,
};

const gallery = {
  loadMoreBtn: document.getElementById("load-more__btn--gallery"),
  container: document.querySelector(".grid"),
  timerId: null,
};

const btnClickCount = [0, 0];

// ----------services section----------
const handleServicesListClick = (e) => {
  let item = e.target.closest("li");
  if (item) {
    setActiveClass(services.items, item, "services__item--active");
    showContent(
      services.content,
      item.dataset.servicesTitle,
      "servicesContent"
    );
  }
};

// ----------reviews section----------
const handleSliderClick = (e) => {
  let item = e.target.closest("li");
  if (item) {
    setActiveClass(slider.items, item, slider.activeClass);
    showContent(slider.content, item.dataset.sliderUser, "reviewsUser");
  }
};
// reviews-slider set one listener
const handleSliderPrevBtnClick = () => {
  let index = findActiveItemIndex(slider.items, slider.activeClass);
  let activeItem;
  index === 0
    ? (activeItem = slider.items[slider.items.length - 1])
    : (activeItem = slider.items[index - 1]);

  setActiveClass(slider.items, activeItem, slider.activeClass);
  showContent(slider.content, activeItem.dataset.sliderUser, "reviewsUser");
};

const handleSliderNextBtnClick = () => {
  let index = findActiveItemIndex(slider.items, slider.activeClass);
  let activeItem;
  index === slider.items.length - 1
    ? (activeItem = slider.items[0])
    : (activeItem = slider.items[index + 1]);

  setActiveClass(slider.items, activeItem, slider.activeClass);
  showContent(slider.content, activeItem.dataset.sliderUser, "reviewsUser");
};

const findActiveItemIndex = (arr, activeClass) => {
  const item = arr.find((item) => item.classList.contains(activeClass));
  const index = arr.indexOf(item);
  return index;
};
// ----------works example section----------
const handleWorksListClick = (e) => {
  const item = e.target.closest("li");
  if (item) {
    setActiveClass([...works.list.children], item, "selected");
    sortWorksListContent(item);
  }
};

const handleWorksLoadMoreBtn = (e) => {
  e.preventDefault();

  let imgSrcNum = 12;

  btnClickCount[0] === 1 ? (imgSrcNum += imgSrcNum) : imgSrcNum;

  const item = document.querySelector(".selected");

  const loader = createLoader();
  works.loadMoreBtn.before(loader);

  works.timerId = setTimeout(() => {
    loader.remove();
    btnClickCount[0]++;
    const fragment = createWorksImg(imgSrcNum);
    works.imgList.append(fragment);
    if (item) {
      sortWorksListContent(item);
    }
    deleteLoadMoreBtn(
      btnClickCount[0],
      works.loadMoreBtn,
      handleWorksLoadMoreBtn,
      works.timerId
    );
  }, 2000);
};

const createWorksImg = (imgSrcNum) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 12; i++) {
    let content;
    // random ?
    switch (i) {
      case 0:
      case 1:
      case 2:
        content = works.titlesArr[0];
        break;

      case 3:
      case 4:
      case 5:
        content = works.titlesArr[1];
        break;

      case 6:
      case 7:
      case 8:
        content = works.titlesArr[2];
        break;

      case 9:
      case 10:
      case 11:
        content = works.titlesArr[3];
        break;
    }
    const li = document.createElement("li");
    li.classList.add("works__photos-item");
    // insertAdj
    li.innerHTML = `<div class="works__photos-container"> 
    <img class="works__photos-img img" src="./img/works-section/works-section${imgSrcNum++}.jpg" alt="our works"/> 
    <div class="works__overlay"> 
    <ul class="list works__overlay-list">
    <li class="works__overlay-item"> 
    <a class="works__overlay-link works__overlay-link--chain" href="#"></a></li>
    <li><a class="works__overlay-link works__overlay-link--elipse" href="#"></a></li>
    </ul>
    <p class="works__overlay-subtitle">creative design</p>
    <p class="works__overlay-content">${content}</p>
    </div></div>`;
    fragment.append(li);
  }
  return fragment;
};

const sortWorksListContent = (item) => {
  const worksrItemsArr = [
    ...document.querySelectorAll(".works__overlay-content"),
  ];
  worksrItemsArr.forEach((el) => {
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

//  ----------gallery section----------

const handleGalleryLoadMoreBtn = (e) => {
  let imgSrcNum = 1;
  btnClickCount[1] === 1 ? (imgSrcNum = 7) : imgSrcNum;
  e.preventDefault();
  const loader = createLoader();
  gallery.loadMoreBtn.before(loader);
  gallery.timerId = setTimeout(() => {
    loader.remove();
    const galleryImg = createGalleryImg(imgSrcNum);
    gallery.container.append(galleryImg);
    startMasonry();
    btnClickCount[1]++;
    deleteLoadMoreBtn(
      btnClickCount[1],
      gallery.loadMoreBtn,
      handleGalleryLoadMoreBtn,
      gallery.timerId
    );
  }, 2000);
};

const createGalleryImg = (imgSrcNum) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i <= 5; i++) {
    const item = document.createElement("div");
    item.classList.add("grid-item");
    // insertAdj
    item.innerHTML = ` <div class="gallery__img-box fade-img">
  <img
    class="gallery__img"
    src="./img/gallery-section/gallery-img${imgSrcNum++}.jpg"
    alt="bridge"
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
    fragment.append(item);
  }
  return fragment;
};

const startMasonry = () => {
  imagesLoaded(document.querySelector(".grid"), function () {
    new Masonry(document.querySelector(".grid"), {
      columnWidth: ".grid-sizer",
      itemSelector: ".grid-item",
      gutter: 20,
      singleMode: false,
    });
  });
};

//  ----------common js----------
const setActiveClass = (itemsArr, activeElem, activeClass) => {
  itemsArr.forEach((item) => {
    item === activeElem
      ? item.classList.add(activeClass)
      : item.classList.remove(activeClass);
  });
};

const showContent = (hiddenElemsArr, activeElemAttr, attr) => {
  hiddenElemsArr.forEach((item) => {
    if (item.dataset[attr] === activeElemAttr) {
      item.classList.add("fade");
      item.classList.remove("hidden");
    } else {
      item.classList.add("hidden");
      item.classList.remove("fade");
    }
  });
};

const createLoader = () => {
  const box = document.createElement("div");
  box.classList.add("loader-wrapper");
  box.innerHTML = ` <div class="loader">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>`;
  return box;
};

const deleteLoadMoreBtn = (count, btn, listener, timer) => {
  if (count === 2) {
    btn.removeEventListener("click", listener);
    btn.remove();
    clearTimeout(timer);
  }
};

//  ----------listeners----------
services.list.addEventListener("click", handleServicesListClick);
slider.list.addEventListener("click", handleSliderClick);
slider.prevBtn.addEventListener("click", handleSliderPrevBtnClick);
slider.nextBtn.addEventListener("click", handleSliderNextBtnClick);
works.list.addEventListener("click", handleWorksListClick);
works.loadMoreBtn.addEventListener("click", handleWorksLoadMoreBtn);
gallery.loadMoreBtn.addEventListener("click", handleGalleryLoadMoreBtn);
window.addEventListener("load", startMasonry);
