"use strict";

const services = {
  list: document.getElementById("services__list"),
  items: Array.from(document.querySelectorAll(".services__item")),
  content: document.querySelectorAll(".services__conten-box"),
};

const slider = {
  list: document.getElementById("reviews-slider__list"),
  items: Array.from(document.querySelectorAll(".reviews-slider__item")),
  content: document.querySelectorAll(".reviews-card"),
  prevBtn: document.getElementById("reviews-slider__btn-prev"),
  nextBtn: document.getElementById("reviews-slider__btn-next"),
  activeClass: "reviews-slider__item--active",
};

const works = {
  list: document.getElementById("works__list"),
  imgList: document.getElementById("works__photos-list"),
  title: Array.from(document.querySelectorAll(".works__overlay-subtitle")),
  loadMoreBtn: document.getElementById("load-more__btn--works"),
  titlesArr: ["graphic design", "web design", "landing pages", "wordpress"],
  timerId: 0,
};

const gallery = {
  loadMoreBtn: document.getElementById("load-more__btn--gallery"),
  container: document.querySelector(".grid"),
  timerId: 0,
};

gallery.container.style.height = "942px";
let btnClickCount = [0, 0];

// ----------services section----------
const handleServicesListClick = (e) => {
  let item = e.target.closest("li");
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
  sortWorkListContent(item);
};

const handleWorksLoadMoreBtn = (e) => {
  e.preventDefault();
  let k = 12;
  btnClickCount[0] === 1 ? (k += k) : k;
  const loader = createLoader();
  works.loadMoreBtn.before(loader);
  // -----timer-----
  works.timerId = setTimeout(() => {
    loader.remove();
    btnClickCount[0]++;
    const fragment = createWorksImg(k);

    deleteLoadMoreBtn(
      btnClickCount[0],
      works.loadMoreBtn,
      handleWorksLoadMoreBtn,
      works.timerId
    );

    works.imgList.append(fragment);
  }, 2000);
};

const sortWorkListContent = (item) => {
  works.title.forEach((el) => {
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

const createWorksImg = (k) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 12; i++) {
    const randomContent =
      works.titlesArr[Math.floor(Math.random() * works.titlesArr.length)];

    const li = document.createElement("li");
    li.classList.add("works__photos-item");
    li.innerHTML = `<div class="works__photos-container"> 
    <img class="works__photos-img img" src="./img/works-section/works-section${k++}.jpg" alt="our works"/> 
    <div class="works__overlay"> 
    <ul class="list works__overlay-list">
    <li class="works__overlay-item"> 
    <a class="works__overlay-link works__overlay-link--chain" href="#"></a></li>
    <li><a class="works__overlay-link works__overlay-link--elipse" href="#"></a></li>
    </ul>
    <p class="works__overlay-subtitle">${randomContent}</p>
    <p class="works__overlay-content">${randomContent}</p>
    </div></div>`;
    fragment.append(li);
  }
  return fragment;
};
//  ----------gallery section----------
const handleGalleryLoadMoreBtn = (e) => {
  e.preventDefault();
  let k = 10;
  btnClickCount[1] === 1 ? (k += k) : k;
  const loader = createLoader();
  gallery.loadMoreBtn.before(loader);

  gallery.timerId = setTimeout(() => {
    loader.remove();
    btnClickCount[1]++;
    const fragment = createGalleryImg();

    deleteLoadMoreBtn(
      btnClickCount[1],
      gallery.loadMoreBtn,
      handleGalleryLoadMoreBtn,
      gallery.timerId
    );

    gallery.loadMoreBtn.before(fragment);
  }, 2000);
};

const createGalleryImg = () => {
  const fragment = document.createDocumentFragment();
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
  return fragment;
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
