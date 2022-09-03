const categories = async() => {
  const res = await fetch("https://openapi.programming-hero.com/api/news/categories");
  const data = await res.json();
 return data.data;
}
const displayData = async()=>{
  const datas = await categories()
  
  datas.news_category.forEach(singleCatagoris => {
    
    const {category_name, category_id} = singleCatagoris;
    const menus = document.getElementById("menu-all");
    const li = document.createElement("li");
    // li.style.backgroundColor = "gray"
    li.innerHTML = `<a onclick="displayAllData('${category_id}')">${category_name}</a>`;
    menus.appendChild(li)
  });
}
function progress(data){
  const progres = document.getElementById("progress")
  if (data === true) {
    progres.classList.remove("hidden")
  }else{
    progres.classList.add("hidden")
  }
}

const displayAllData = async(id)=>{
  progress(true)
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`
  const res = await fetch(url)
  const data = await res.json();
  showAllNews(data.data);
  modalData(data.data)
}

const showAllNews = (datas)=>{
  // sort >>>
   datas.sort(function(a, b){return b.total_view-a.total_view})
  //  sort end  <<<
  const foundNumber = document.getElementById('found-total-news');
  const lengths = datas.length;
  foundNumber.innerText = lengths;
  const notFound = document.getElementById("not-found");
  notFound.textContent = "";
  if (lengths === 0) {
    progress(false)
    notFound.innerHTML = `<h1 class="text-4xl font-bold ">Not Found</h1> `
  }
  
  const showDetails = document.getElementById("card")
  showDetails.textContent= "";
  datas.forEach(data => {
    progress(false)
    const {author, details, image_url, rating, title,total_view } = data;
    const {number, badge} = rating;
    const {name, published_date, img} = author;
    const div =document.createElement("div")
   const det = details.slice(0,150)

    div.innerHTML = `
    <div class="card m-4 lg:card-side bg-base-100 shadow-xl">
    <figure><img style="width:500px" class="h-72 w-72" src=${image_url ? image_url : 'N/A'} alt="Album"></figure>
        <div class="card-body">
        <h2 class="card-title font-bold">${title.length < 70 ? title : title.slice(0,70) + "..."}</h2>
          <p>${details.length < 500 ? details : details.slice(0,500) + "..."}</p>
          <div class="card-actions justify-between space-x-0">
           
          <div class="flex items-center space-x-3">
  <div class="avatar">
    <div class="mask mask-squircle w-12 h-12">
      <img src="${img}"/>
    </div>
  </div>
  <div>
    <div class="font-bold">${name ? name : 'N/A'}</div>
    <div class="text-sm opacity-50">${published_date}</div>
  </div>
</div>
            <h2 class="font-bold text-2xl">${total_view ? total_view +"M" : 'N/A'}</h2>  
           <h2 class="card-titel text-2xl">${number ? number : "N/A"}<i class="fa-solid fa-star"></i>   ${badge}</h2>
            <a href="#my-modal-2" onclick="modalDetails('${image_url}','${name}','${title}','${published_date}','${total_view}','${det}')" class="btn btn-primary">Show Details</a>
          </div>
        </div>
        </div>
    `;
    showDetails.appendChild(div)
  }); 
}
const modalDetails = (image_url, name, details, date, total_view, det)=> {
 const models = document.getElementById("my-modal-2");
 models.innerHTML = `
 <div class="modal-box">
          <h3 class="font-bold text-lg">Author: ${name ? name : 'N/A'}</h3>
          <img src="${image_url}" />
          <p class="font-bold mb-2">${details ? details : 'N/A'}</p>
          <p>${det + "..."}</p>
          <div class="modal-action">
          <div class="mr-8">
        <div class="font-bold">${name ? name : 'N/A'}</div>
        <div class="text-sm opacity-50">${date}</div>
       </div>
          <p class="font-bold ">Total view : ${total_view ? total_view + 'M' : 'N/A'}</p>
           <a href="#" class="btn">Close</a>
          </div>
        </div>
 `;
}
// categories()
modalDetails()
displayData();
