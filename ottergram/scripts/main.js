const detail_image_selector = '[data-image-role="target"]';
const detail_title_selector = '[data-image-role="title"]';
const detail_frame_selector = '[data-image-role="frame"]';
const thumbnail_link_selector = '[data-image-role="trigger"]';
const hidden_detail_class = 'hidden-detail';
const tiny_effect_class = 'is-tiny';
const esc_key = 27;

function setDetails(imageUrl, titleText) {
  var detailImage = document.querySelector(detail_image_selector);
  detailImage.setAttribute('src', imageUrl);

  var detailTitle = document.querySelector(detail_title_selector);
  detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function getThumbnailsArray() {
  var thumbnails = document.querySelectorAll(thumbnail_link_selector);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function hideDetails() {
  document.body.classList.add(hidden_detail_class);
}

function showDetails() {
  const frame = document.querySelector(detail_frame_selector);
  document.body.classList.remove(hidden_detail_class);
  frame.classList.add(tiny_effect_class);
  setTimeout(function () {
    frame.classList.remove(tiny_effect_class);
  }, 50);
}

function addKeyPressHandler() {
document.body.addEventListener('keyup', function (event) {
  event.preventDefault();
  console.log(event.keyCode);
  if (event.keyCode === esc_key) {
    hideDetails();
  }
});
}

function initializeEvents() {
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

initializeEvents();
