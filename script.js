const API_KEY='api_key=ba215763d6fdc77f212907452ba34e9f';
const BASE_URL='https://api.themoviedb.org/3';
const API_URL=BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL='https://image.tmdb.org./t/p/w500';
const searchURL=BASE_URL+'/search/movie?'+API_KEY;

const main=document.getElementById('main');
const form=document.getElementById('form');
const search=document.getElementById('search');
const tags=document.getElementById('tags');

const genre = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
]
var genSelected=[];
setGenre();
function setGenre(){
    tags.innerHTML='';
    genre.forEach(genre=>{
        const t=document.createElement('div');
        t.innerHTML=`<button class="btn btn-4 hover-border-9">
                        <span>${genre.name}</span> </button>`;
        // const t=document.createElement('li');
        // t.classList.add('tag');
        t.id=genre.id;
        // t.textContent=genre.name;
        t.addEventListener('click',()=>{
            if(genSelected.length==0){
                genSelected.push(genre.id);
                document.getElementById(genre.id).classList.add("clicked-genre");
            }
            else{
                if(genSelected.includes(genre.id)){
                    genSelected.forEach((id,idx)=>{
                        if(id==genre.id){
                            genSelected.splice(idx,1);
                            document.getElementById(genre.id).classList.remove("clicked-genre");
                        }
                    })
                }
                else{
                    genSelected.push(genre.id);
                    document.getElementById(genre.id).classList.add("clicked-genre");                
                }
            }
            getMovies(API_URL+'&with_genres='+encodeURI(genSelected.join(',')));
        })
        tags.append(t);
    })
}

getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        // console.log(data);
        
        if(data.results.length==0){
            main.classList.add('error');
            main.innerHTML='No Results Found';
        }
        else{
            showMovies(data.results);
        }
    })
}

function showMovies(data){
    main.innerHTML = '';
    data.forEach((movie, index) => {
        const {title, poster_path, vote_average, overview, id}=movie;
        // console.log(overview);
        const movieEL = document.createElement('div');
        movieEL.classList.add('movie');
        // href="checkout.html?movie-name=${title}"
        // href="checkout.html?movie-id=${id}""
        movieEL.innerHTML = `<a onclick="showpopup(${index})" >
            <img src="${IMG_URL+poster_path}" alt="${title}" srcset="">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getcolor(vote_average)}">${vote_average}</span>
            </div>
            
            </a>
            <div class="overview">
            <h3>${title}</h3>
                <h3>Overview</h3>
                ${overview}
                <a href="checkout.html?movie-id=${id}">
                <button type="submit" id="book-ticket">Book ticket </button>
                </a>
            </div>
        `
        main.appendChild(movieEL);
    });
}

let flag=false;
let clicked;
function showpopup(index){
    if(!flag){
        const ele=document.getElementsByClassName('overview')[index];
        ele.classList.add("showpopup");
        clicked=index;
        flag=true;
    }
    else{
        let ele=document.getElementsByClassName('overview')[clicked];
        ele.classList.remove("showpopup");
        ele=document.getElementsByClassName('overview')[index];
        ele.classList.add("showpopup");
        clicked=index;
    }
    
}

function getcolor(vote){
    if(vote>=8){
        return 'green';
    }
    else if(vote>=5){
        return 'orange';
    }
    else{
        return 'red';
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchTerm=search.value;
    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm);
    }
    else{
        getMovies(API_URL)
    }
})
// function search(e){
//     console.log(e.val());
// }
// use debounce here for fetching the movies..