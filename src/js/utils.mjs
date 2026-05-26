// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// retrieve data from localStorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// save data to localStorage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

// function to get param from URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
  const value = urlParams.get(param);

  return value;
}

// export function renderListWithTemplate(
//   templateFn,
//   parentElement,
//   list,
//   position = 'afterbegin',
//   clear = false,
// ) {
//   if (clear) {
//     parentElement.innerHTML = '';
//   }

//   if (list && Array.isArray(list)) {
//     const htmlStrings = list.map(templateFn);
//     parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
//   }
// }

export function renderListWithTemplate(templateFn, parentElement, list, position = 'afterbegin', clear = false) {
  if (clear) parentElement.innerHTML = '';
  const listItems = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, listItems.join(''));

}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.insertAdjacentHTML("afterbegin", template);
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  if (!res.ok) {
    throw new Error(`Failed to load template at ${path}`);
  }
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  try {
    const headerTemplate = await loadTemplate("/partials/header.html");
    const footerTemplate = await loadTemplate("/partials/footer.html");

    const headerElement = document.querySelector("#main-header");
    const footerElement = document.querySelector("#main-footer");

    if (headerElement) {
      renderWithTemplate(headerTemplate, headerElement);
    }
    if (footerElement) {
      renderWithTemplate(footerTemplate, footerElement);
    }
  } catch (error) {
    console.error(error);
  }
}

// display an alert message at the top of the main element
export function alertMessage(message, scroll = true) {
  // remove any existing alert
  const existing = document.querySelector('.site-alert');
  if (existing) existing.remove();

  const main = document.querySelector('main') || document.body;
  const wrapper = document.createElement('div');
  wrapper.className = 'site-alert';

  if (typeof message === 'object') {
    // try to present structured error information
    try {
      wrapper.innerHTML = `<div class="alert alert--error"><strong>Error:</strong> ${JSON.stringify(message)}</div>`;
    } catch (e) {
      wrapper.innerHTML = `<div class="alert alert--error"><strong>Error:</strong> An unknown error occurred.</div>`;
    }
  } else {
    wrapper.innerHTML = `<div class="alert alert--error">${message}</div>`;
  }

  main.insertAdjacentElement('afterbegin', wrapper);
  if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
  return wrapper;
}
