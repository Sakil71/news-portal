
// Load categories data
const loadData = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch(error => console.log(error))
}
// Set category
const displayCategory = (catagory) => {
    const allCatagoryName = document.getElementById('catagory-container');
    catagory.forEach(catagory => {
        const caonatinerDiv = document.createElement('div')
        caonatinerDiv.classList.add('style-hover');
        caonatinerDiv.innerHTML = `
            <a onclick="CatagoryDetails(${catagory.category_id})"  class="fs-6 text-decoration-none text-secondary fw-semibold" href="#">${catagory.category_name}</a>
        `
        allCatagoryName.appendChild(caonatinerDiv)
    });
}

// Category details
const CatagoryDetails = (id) => {
    toggleSpinner(true);
    fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
        .then(res => res.json())
        .then(data => displayCatagoryNews(data.data))
        .catch(error => console.log(error))
}
// Main Newsfeed
const displayCatagoryNews = (catagoryNews) => {
    const addNewsContainer = document.getElementById('news');
    addNewsContainer.innerHTML = '';
    catagoryNews.forEach(info => {
        const div = document.createElement('div');
        div.classList.add('col-md-12',);
        div.innerHTML = `
        <section>
            <div class="card mb-5">
            <div class="row g-0 shadow-lg">
                <div class="col-md-4">
                    <img src="${info.image_url}" class="img-fluid h-100  rounded p-3" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                         <h5 class="card-title fw-bold">${info.title}</h5>
                         <p class="card-text opacity-50">${info.details.slice(0, 250)}...</p>
                     </div>
                <div class="container d-flex justify-content-between p-3 flex-flex-wrap">
                    <div class="d-flex align-items-center ">
                        <img class="rounded-circle " style="height: 60px; width: 60px; " src="${info.author.img}" alt="">
                        <div class="ps-3 mt-3">
                            <h6  class="ps-2 fw-bold" >${info.author.name}</h6>
                            <p  class="ps-2 opacity-50" >${info.author.published_date}</p>
                        </div>
                    </div>
                    <div class="pt-3 fw-bold">
                        <p> <i class="fa-regular fa-eye"></i> ${info.total_view ? info.total_view : 'No viwes'}M</p>
                    </div>
                    <div class="pt-3">
                        <p>
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </p>
                    </div>
                    <div class="pt-3 text-info">
                        <span onclick="loadedNewsDetails('${info._id}')" data-bs-toggle="modal" data-bs-target="#loadedNewsDetails"  ><i class="fa-solid fa-arrow-right"></i></span>
                </div>
                </div>
                </div>
            </div>
            </div>
        </section>

        `
        addNewsContainer.appendChild(div)

    });
    
    toggleSpinner(false)
    
    // News count
    const countNews = document.getElementById('count-news');
    const allNews = document.querySelectorAll('#news section');
    const newsLength = allNews.length;
    if(newsLength === 0){
        countNews.innerText = newsLength;
        const noNews = document.getElementById('news');
        noNews.innerHTML = ` <h4 class="text-center text-danger fw-bold">No news available here </h4> `;
        return;
    }
    else{
    countNews.innerText = newsLength;
    }

}

// For Modal
const loadedNewsDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/news/${id}`)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data))
        .catch(error => console.log(error))
}


const displayNewsDetails = (newsDetails) => {
    console.log(newsDetails)
    newsDetails.forEach(news_info => {
        console.log(news_info)
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = `

                <h4>News title : ${news_info.title}</h4>

                <img src="${news_info.image_url ? news_info.image_url : 'no bannar found'}" class="img-img-fluid w-100 pb-3" alt="">

                <h6 class="fw-bold">Author details :</h6>

                <img src="${news_info.author.img ? news_info.author.img : 'No author image found'}" class="img-img-fluid rounded-circle"  style="height: 60px; width: 60px; alt= "">

                <p>Name : ${news_info.author.name ? news_info.author.name : 'No author name found'}</p>

                <p>Publish date : ${news_info.author.published_date ? news_info.author.published_date : 'No date  found'}</p>

                <p>Total views : ${news_info.total_view ? news_info.total_view : 'No views'}M</p>

                <p><strong>Description :</strong> ${news_info.details ? news_info.details : 'No details available'}M</p>

        `
    })
}

// Spinner
const toggleSpinner = (isLoading) => {
    const lodar = document.getElementById('spiner');
    if (isLoading) {
        lodar.classList.remove('d-none')
    }
    else {
        lodar.classList.add('d-none');
    }
}


loadData();
