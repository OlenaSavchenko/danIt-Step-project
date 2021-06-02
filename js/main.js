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
  if (!item) return;
  setActiveClass(services.items, item, "services__item--active");
  showContent(services.content, item.dataset.servicesTitle, "servicesContent");
};

// ----------reviews section----------
const handleSliderClick = (e) => {
  let item = e.target.closest("li");
  if (!item) return;
  setActiveClass(slider.items, item, slider.activeClass);
  showContent(slider.content, item.dataset.sliderUser, "reviewsUser");
};

const handleSliderPrevBtnClick = () => {
  let index = findActiveItemIndex();
  let activeItem;
  index === 0
    ? (activeItem = slider.items[slider.items.length - 1])
    : (activeItem = slider.items[index - 1]);

  setActiveClass(slider.items, activeItem, slider.activeClass);
  showContent(slider.content, activeItem.dataset.sliderUser, "reviewsUser");
};

const handleSliderNextBtnClick = () => {
  let index = findActiveItemIndex();
  let activeItem;
  index === slider.items.length - 1
    ? (activeItem = slider.items[0])
    : (activeItem = slider.items[index + 1]);

  setActiveClass(slider.items, activeItem, slider.activeClass);
  showContent(slider.content, activeItem.dataset.sliderUser, "reviewsUser");
};

const findActiveItemIndex = () => {
  const item = slider.items.find((item) =>
    item.classList.contains(slider.activeClass)
  );
  const index = slider.items.indexOf(item);
  return index;
};
// ----------works example section----------
const handleWorksListClick = (e) => {
  const item = e.target.closest("li");
  if (!item) return;
  setActiveClass([...works.list.children], item, "selected");
  sortWorksListContent(item);
};

const handleWorksLoadMoreBtn = (e) => {
  e.preventDefault();
  let imgIndex = 12;
  btnClickCount[0] === 1 ? (imgIndex += imgIndex) : imgIndex;
  const loader = createLoader();
  const item = document.querySelector(".selected");
  works.loadMoreBtn.before(loader);

  works.timerId = setTimeout(() => {
    loader.remove();
    btnClickCount[0]++;
    const fragment = createWorksImg(imgIndex);
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

const createWorksImg = (imgIndex) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 12; i++) {
    let content;
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
    li.innerHTML = `<div class="works__photos-container"> 
    <img class="works__photos-img img" src="./img/works-section/works-section${imgIndex++}.jpg" alt="our works"/> 
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
  e.preventDefault();
  const loader = createLoader();
  gallery.loadMoreBtn.before(loader);

  gallery.timerId = setTimeout(() => {
    loader.remove();
    showGalleryImg();
    btnClickCount[1]++;
    deleteLoadMoreBtn(
      btnClickCount[1],
      gallery.loadMoreBtn,
      handleGalleryLoadMoreBtn,
      gallery.timerId
    );
  }, 2000);
};

const showGalleryImg = () => {
  const imgArr = [...document.querySelectorAll(".hidden-img")];
  imgArr.forEach((img, i) => {
    if (i <= 5) {
      img.className = "gallery__img-box fade";
    }
  });

  startMasonry();
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

//  ----------listeners----------
services.list.addEventListener("click", handleServicesListClick);
slider.list.addEventListener("click", handleSliderClick);
slider.prevBtn.addEventListener("click", handleSliderPrevBtnClick);
slider.nextBtn.addEventListener("click", handleSliderNextBtnClick);
works.list.addEventListener("click", handleWorksListClick);
works.loadMoreBtn.addEventListener("click", handleWorksLoadMoreBtn);
gallery.loadMoreBtn.addEventListener("click", handleGalleryLoadMoreBtn);
window.addEventListener("load", startMasonry);
