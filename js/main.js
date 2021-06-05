"use strict";

const services = {
  list: document.getElementById("services__list"),
  items: [...document.querySelectorAll(".services__item")],
  content: document.querySelectorAll(".services__conten-box"),
};

const slider = {
  container: document.getElementById("reviews-slider"),
  items: [...document.querySelectorAll(".reviews-slider__item")],
  content: document.querySelectorAll(".reviews-card"),
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
  // get index of chosen in html slide
  let index = findActiveItemIndex(slider.items, slider.activeClass);
  let activeItem;

  // handle prev button click
  if (e.target.id === "reviews-slider__btn-prev") {
    index === 0
      ? (activeItem = slider.items[slider.items.length - 1])
      : (activeItem = slider.items[index - 1]);
  }
  // handle next button click
  else if (e.target.id === "reviews-slider__btn-next") {
    index === slider.items.length - 1
      ? (activeItem = slider.items[0])
      : (activeItem = slider.items[index + 1]);
  }
  // handle current slide click
  else if (e.target.closest("li")) {
    activeItem = e.target.closest("li");
  } else {
    return;
  }
  // set active class for previous/current/next item in slider
  setActiveClass(slider.items, activeItem, slider.activeClass);
  // show previous/current/next slide
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
  // set srcNumber of img (choose srcNumber from 12 to 24)
  let imgSrcNum = 12;

  // change srcNumber of img after first load more button click (choose srcNumber from 25 to 36)
  btnClickCount[0] === 1 ? (imgSrcNum += imgSrcNum) : imgSrcNum;

  // get chosen by user category ("graphic design", "web design", "landing pages", "wordpress")
  const item = document.querySelector(".selected");

  // create loader and add it to html
  const loader = createLoader();
  works.loadMoreBtn.before(loader);

  works.timerId = setTimeout(() => {
    // remove loader
    loader.remove();

    // count number of load more button clicks
    btnClickCount[0]++;
    // create 12 images and add them to html
    const fragment = createWorksImg(imgSrcNum);
    works.imgList.append(fragment);
    // show in html images of only one of the 4th categories ("graphic design", "web design", "landing pages", "wordpress") if images are sorted
    if (item) {
      sortWorksListContent(item);
    }
    // delete load more button, clear setTimeout, remove listener after 2nd load more button click
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
    //choose random category for content paragraph ("graphic design", "web design", "landing pages", "wordpress")
    const randomContent =
      works.titlesArr[Math.floor(Math.random() * works.titlesArr.length)];

    const li = document.createElement("li");
    li.classList.add("works__photos-item");
    li.insertAdjacentHTML(
      "afterbegin",
      `<div class="works__photos-container"> 
    <img class="works__photos-img img" src="./img/works-section/works-section${imgSrcNum++}.jpg" alt="our works"/> 
    <div class="works__overlay"> 
    <ul class="list works__overlay-list">
    <li class="works__overlay-item"> 
    <a class="works__overlay-link works__overlay-link--chain" href="#"></a></li>
    <li><a class="works__overlay-link works__overlay-link--elipse" href="#"></a></li>
    </ul>
    <p class="works__overlay-subtitle">creative design</p>
    <p class="works__overlay-content">${randomContent}</p>
    </div></div>`
    );
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
  // set srcNumber of img (choose srcNumber from 1 to 6)
  let imgSrcNum = 1;
  // change srcNumber of img after first load more button click (choose srcNumber from 7 to 12)
  btnClickCount[1] === 1 ? (imgSrcNum = 7) : imgSrcNum;
  // create loader and add it to html
  const loader = createLoader();
  gallery.loadMoreBtn.before(loader);
  gallery.timerId = setTimeout(() => {
    // remove loader
    loader.remove();
    // create 6 images and add them to html
    const galleryImg = createGalleryImg(imgSrcNum);
    gallery.container.append(galleryImg);
    // placing images by masonry library
    startMasonry();
    // count number of load more button clicks
    btnClickCount[1]++;
    // delete load more button, clear setTimeout, remove listener after 2nd load more button click
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
    item.insertAdjacentHTML(
      "afterbegin",
      ` <div class="gallery__img-box fade-img">
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
  </div>`
    );
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
slider.container.addEventListener("click", handleSliderClick);
works.list.addEventListener("click", handleWorksListClick);
works.loadMoreBtn.addEventListener("click", handleWorksLoadMoreBtn);
gallery.loadMoreBtn.addEventListener("click", handleGalleryLoadMoreBtn);
window.addEventListener("load", startMasonry);
