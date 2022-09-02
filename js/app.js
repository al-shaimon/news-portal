// categories
const loadCategories = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
  const data = await response.json();
  return data;
};

const setCategories = async () => {
  const data = await loadCategories();
  // console.log(data);
  for (const key in data.data) {
    console.log(data);
  }
};

setCategories();
// loadCategories();
