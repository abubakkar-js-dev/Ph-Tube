const allVideosBtn = document.getElementById('btn-all-videos');
// 1. Fetch, Load and show categories on html

// create loadCategories function
const  loadCategories = (load) =>{
    //fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories/')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(err => console.log(err));

}

// create displayCategories function

const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById('categories');
    categories.forEach(item => {

        // creat a button
        const button = document.createElement('button');
        button.innerText = item.category;
        button.classList.add('btn');
        button.setAttribute('id',`btn-${item.category_id}`);
        button.classList.add('btn-category')
        console.log(button);
        button.addEventListener('click',()=>{
            loadCategoryVideos(item.category_id);
        });
        // append the button to category container
        categoryContainer.appendChild(button);

    });
}

// remove btn collor function

const removeActiveBtnColor = () =>{
    allVideosBtn.classList.remove('bg-red-400','text-white')
    const buttons = document.getElementsByClassName('btn-category');
    for(let btn of buttons){
        btn.classList.remove('bg-red-400','text-white');
    }
}

const loadCategoryVideos = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data =>   {
        // remove the active color of btn
        removeActiveBtnColor();
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add('bg-red-400','text-white');
        displayVideos(data.category);
    })
    .catch(err => console.log(err));
}


// create load videos function
const loadvideos = () => {
    // fetch videos
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(err => console.log(err))
}

const cardDemo = {
    "category_id": "1003",
    "video_id": "aaae",
    "thumbnail": "https://i.ibb.co/Yc4p5gD/inside-amy.jpg",
    "title": "Inside Amy Schumer",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/YD2mqH7/amy.jpg",
            "profile_name": "Amy Schumer",
            "verified": ""
        }
    ],
    "others": {
        "views": "3.6K",
        "posted_date": "15147"
    },
    "description": "'Inside Amy Schumer' is a comedy show by the popular comedian Amy Schumer, blending sharp satire and unfiltered humor to tackle everyday issues and societal norms. With 3.6K views, the show promises a blend of hilarious sketches, thought-provoking stand-up, and candid interviews. It's a must-watch for fans of bold, edgy comedy."
}

const setTimeString =(time) => {
    const hours = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const miniute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    

    return `${hours} hours ${miniute} min ${remainingSecond} sec ago`
}


const displayVideos = (videos) =>{

    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";
    
    if(videos.length == 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
            <div class="flex flex-col justify-center gap-5 items-center mt-[100px]">
                <img class="w-[200px]" src="../assets/Icon.png"/>
                <h2 class="text-center text-2xl font-bold">Oops!! Sorry, There is no <br/> content here</h2>
            </div>
        `;
    }else{
        videoContainer.classList.add('grid');
    }

    videos.forEach((video) =>{
        // console.log(video);
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
         <figure class="h-[260px] relative">
        <img
          src=${video.thumbnail}
          class="h-full w-full object-cover"
          alt="Shoes"/>
         ${video.others.posted_date.length == 0 ? `<span class="absolute bg-black text-white text-xs rounded-md p-2 bottom-3 right-3">a few min ago</span>` :
            ` <span class="absolute bg-black text-white text-xs rounded-md p-2 bottom-3 right-3">${setTimeString(video.others.posted_date)}</span>`
         }
      </figure>
      <div class="px-0 py-2 flex gap-3">
        <div>
            <img class="w-10 h-10 rounded-full object-cover" src= "${video.authors[0].profile_picture}"/>
        </div>
        <div>
            <h2 class="text-base font-bold">${video.title}</h2>
            <div class="flex gap-2 items-center">
            <p class="text-base text-gray-800">${video.authors[0].profile_name}</p>
            ${video.authors[0].verified ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>` : ''}
            </div>
            <p class="text-sm text-gray-500">${video.others.views} views</p>
        </div>
      </div>
        `;
        videoContainer.appendChild(card);
    })
}


loadCategories();
loadvideos();

// reload when all video want to display


allVideosBtn.addEventListener('click',() =>{
    window.location.reload();
})