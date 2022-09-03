// categories
const loadCategories = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
  const data = await response.json();
  return data;
};

const setCategories = async () => {
  const data = await loadCategories();
  // console.log(data);

  const menu = document.getElementById('news-categories');

  for (const key in data.data) {
    console.log(data);
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="col">${data.data.news_category[0].category_name}</div>
    <div class="col">${data.data.news_category[1].category_name}</div>
    <div class="col">${data.data.news_category[2].category_name}</div>
    <div class="col">${data.data.news_category[3].category_name}</div>
    <div class="col">${data.data.news_category[4].category_name}</div>
    <div class="col">${data.data.news_category[5].category_name}</div>
    <div class="col">${data.data.news_category[6].category_name}</div>
    <div class="col">${data.data.news_category[7].category_name}</div>
    `;
    menu.appendChild(div);
  }
};

setCategories();
// loadCategories();
