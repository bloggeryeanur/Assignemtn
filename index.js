const nCatagroi = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json()

    showCatagori(data.data.news_category)
}


// Show catagori 
const showCatagori = categories => {

const menue = document.getElementById('menu-items');
categories.forEach(categorie => {
    const li = document.createElement('li');
    li.innerHTML = `
        <button onclick="newsLoadID('${categorie.category_id}')">${categorie.category_name}</button>
    `;
    menue.appendChild(li);
});

}

//category id
const newsLoadID = async category_id => {
// loding start
toggalLoader(true)
const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
const res = await fetch(url);
const data = await res.json();
showNewsIdFunc(data.data);


const getCountIs = document.getElementById('getCountIs');
getCountIs.innerText = (typeof data.data !== 'undefined' && data.data.length === 0) ? "0" : data.data.length;
console.log()
}

//Show news 
const showNewsIdFunc = showNews => {
const showIdNews = document.getElementById('show-id-news');
showIdNews.textContent = '';

for (const getSingelNews of showNews) {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="grid grid-cols-1 bg-white mb-5 rounded-lg">
            <div class="md:flex sm:flex-wrap p-5">
                <div class="md:w-2/6 sm:w-full mr-8">
                    <img src="${getSingelNews.image_url}" class="max-w-sm rounded-lg shadow-2xl" />
                </div>
                <div class="md:grow sm:w-12">
                    <h1 class="text-lg font-bold news-title">${getSingelNews.title}</h1>
                    <p class="py-6 text-sm text-[#949494]">${getSingelNews.details.length > 500 ? getSingelNews.details.slice(0, 500) + '...' : getSingelNews.details}</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <div>
                                <img class="w-10 rounded-full" src="${getSingelNews.author.img}" alt="">
                            </div>
                            <div class="ml-2">
                                <h4 class="font-medium text-[#2B2C34]">${getSingelNews.author.name ? getSingelNews.author.name : 'No Author'}</h4>
                                <p>${getSingelNews.author.published_date ? getSingelNews.author.published_date : 'No Date'}</p>
                            </div>
                        </div>
                        <div class="flex">
                            <div>
                                <i class="fa-regular fa-eye"></i>
                            </div>
                            <div class="ml-1">
                                <p class="font-medium text-[#515151]">${getSingelNews.total_view > 0 ? getSingelNews.total_view : 'No View'}</p>
                            </div>
                        </div>
                        <div class="mx-5 text-[#515151] flex">
                            <div>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                            <div class="ml-1">
                            <p class="font-medium text-[#5D5FEF]">(${getSingelNews.rating.number})</p>
                            </div>
                        </div>
                        <div>
                            <label for="my-modal-6" onclick="modelData('${getSingelNews._id}')" href=""><i class="fa-solid fa-arrow-right-long text-[#5D5FEF] cursor-pointer"></i></label>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    `;
    showIdNews.appendChild(div);
}
// stop loading
toggalLoader(false)
}

// modal open in load api
const modelData = async news_id => {
try {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url)
    const data = await res.json();
    modelShow(data.data[0])
}
catch (error) {
    console.log(error)
}
}

// modal data show api
const modelShow = news_id => {
const modelDetails = document.getElementById('modial-details');

modelDetails.innerHTML = `
    <p>ID: ${news_id._id} </p>
    <h3 class="font-bold text-lg" title="${news_id.title}">Title: ${news_id.title ? news_id.title.slice(0, 20) + '...' : news_id.title}</h3>
    <p class="py-4">${news_id.details ? news_id.details.slice(0, 92) + '...' : news_id.details}</p>

        <div class="flex items-center justify-between">
        <div class="flex items-center">
            <div>
                <img class="w-10 rounded-full" src="${news_id.author.img}" alt="">
            </div>
            <div class="ml-2">
                <h4 class="font-medium text-[#fff]">${news_id.author.name ? news_id.author.name : 'No Author'}</h4>
                <p>${news_id.author.published_date ? news_id.author.published_date : 'No Date'}</p>
            </div>
        </div>
        <div class="flex">
            <div>
                <i class="fa-regular fa-eye"></i>
            </div>
            <div class="ml-1">
                <p class="font-medium text-[#fff]">${news_id.total_view > 0 ? news_id.total_view : 'No View'}</p>
            </div>
        </div>
    </div>
    <div class="modal-action">
        <label for="my-modal-6" class="btn"><i class="fa-regular fa-circle-xmark text-2xl"></i></label>
    </div>
`;
console.log(news_id)
}

// Lodaer
const toggalLoader = (isLoding) => {
const loader = document.getElementById('loader');
if (isLoding) {
    loader.classList.remove('hidden');
}
else {
    loader.classList.add('hidden');
}
}

nCatagroi();
newsLoadID('01');

