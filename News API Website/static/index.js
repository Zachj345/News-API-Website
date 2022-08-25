let index = 1;


function getResults(page) {
    
    const apiKey = 'e02c1949039b4ac5aaf9314b00675b47'
    
    let parentDiv = document.querySelector('.parent');
    let parent = document.querySelector('.parent').children;
    
    let title = document.querySelector('.title');

    let footer = document.querySelector('.footer');
    footer.classList.remove('hide')

    let search = document.getElementById('search').value;
    console.log(search)
 
    let parameters = {'apiKey': apiKey,
     'q': search,
      'sortBy': 'popularity',
       'page': page,
        'pageSize': 50}

      

    let url = `https://newsapi.org/v2/everything?` +
   `q=${parameters.q}&` +
    `sortBy=${parameters.sortBy}&` +
    `page=${parameters.page}&` +
    `apiKey=${parameters.apiKey}`


    fetch(url, {method:'GET'}).then(res => res.json()).then(data => {

        
          for (i=0;i<parent.length;i++){
            parent[i].remove();
            if (parent[i]){
              parent[i].classList.add('hide')
            }
         }


         prevBtn = document.getElementById('prev-btn');
          if (index <= 1) {
          prevBtn.classList.add('hide')
        } else {
          prevBtn.classList.remove('hide')
        }
        
        
       title.innerHTML = `Welcome to Top Stories involving "${search}".`

        for (i=0;i<data.articles.length;i++){

            parentDiv.innerHTML += `<div class="card mb-3 articles" id="articles">
            <a
              id="url"
              href="${data.articles[i]['url']}"
              style="text-decoration: none; color: black"
            >
              <div class="row g-0 article-links">
                <div class="col-md-4">
                  <img
                    src="${data.articles[i]['urlToImage']}"
                    class="img-fluid rounded-start"
                    id="story-img"
                    alt="img not available"
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title" id="title">${data.articles[i]['title']}</h5>
                    <p class="card-text" id="description">
                      ${data.articles[i]['description']}
                    </p>
                    <p class="card-text" id="date">${data.articles[i]['publishedAt'].slice(0,10)}</p>
                    <p class="card-text">
                      <small class="text-muted" id="author"
                        >by ${data.articles[i]['author']}</small
                      >
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>`
        };
        


    }).catch((e) => alert(e))
    return false;
};





function prev(){
  nextBtn = document.getElementById('next-btn');
  prevBtn = document.getElementById('prev-btn');
  if (index === 1 || index < 1) {
    prevBtn.classList.add('hide')
  }
  else{
    nextBtn.classList.remove('hide')
    prevBtn.classList.remove('hide')
    getResults(index-1)
    index -= 1

  }

}

function next(){
  nextBtn = document.getElementById('next-btn');
  prevBtn = document.getElementById('next-btn');
  if (index > 3){
    nextBtn.classList.add('hide')
  }
  else{
    prevBtn.classList.remove('hide')
    nextBtn.classList.remove('hide')
  }
  getResults(index+1)
  index += 1

};

window.onload = () => {
  index = 1
}
