import {serverId as serverData} from './server';
window.addEventListener('DOMContentLoaded', () => {
  const searchingField = document.querySelector('.search__field');
  const searchContnt = document.querySelector('.search__content');
  const authorsList = getQuntityPostsByAuthor('name');
  const titleList = getQuntityPostsByAuthor('title');

  const posts = document.querySelectorAll('.article');

  const search = document.querySelectorAll('.searchBy');

  searchingField.addEventListener('input', () => {
    const items = document.querySelectorAll('.search__item');
    const searchBy = search[0].checked ? authorsList : titleList;
    items.forEach((elem) => {
      searchContnt.removeChild(elem);
    });

    if (!searchingField.value) {
      posts.forEach((post) => {
        post.style.display = 'block';
      });
      sessionStorage.clear();
      return;
    }

    for (let i = 0; i < searchBy.length; i += 2) {
      if (~searchBy[i].search(searchingField.value)) {
        const searchItem = document.createElement('div');
        searchItem.classList.add('search__item');
        searchItem.innerHTML = `<span class="search__photo" style="background: url(${searchBy[i + 1]}) 0% 0% / contain"></span><p style="min-width:100%">${searchBy[i]}</p>`;
        searchItem.addEventListener('click', () => {
          searchContnt.innerHTML = '';
          searchContnt.appendChild(searchingField);
          searchingField.value = searchItem.textContent;
          sortPosts(searchItem.textContent);
          sessionStorage.clear();
          sessionStorage.setItem(searchItem.textContent, true);
        });
        searchContnt.appendChild(searchItem);
      }
    }

    highlightBorder(searchContnt.children.length);
  });

  function highlightBorder(length) {
    length === 1 ? searchContnt.style.border = '1px solid #F06786' : (searchContnt.style.border = '1px solid #4D4949', searchingField.style.borderBottom = '1px solid #E6E6E6');
  }

  function sortPosts(name) {
    posts.forEach((post) => {
      ~post.innerText.search(name) ? post.style.display = 'block' : post.style.display = 'none';
    });
  }

  window.addEventListener('load', () => {
    sessionStorage.key(0) ? (sortPosts(sessionStorage.key(0)), searchingField.value = sessionStorage.key(0)) : null;
  });

  function getQuntityPostsByAuthor(value) {
    const nameArray = [];

    serverData[1].articles.forEach((post) => {
      nameArray.push(post[value], post.photo);
    });

    for (let i = 3; i < serverData.length; i++) {
      serverData[i].id === 'render' ? null : nameArray.push(serverData[i][value], serverData[i].photo);
    }

    return nameArray;
  }
});
