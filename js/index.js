const loadData = async (text) => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await res.json();
    displayPosts(data.posts);
}

const loadData2 = async (text) => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await res.json();
    displayPosts2(data);
}

const displayPosts = posts => {
    posts.forEach(post => {
        const cardContainer = document.getElementById('card');
        const postCard = document.createElement('div');
        postCard.classList = `hero-content flex-col lg:flex-row`;
        postCard.innerHTML = `
        <div class="bg-base-200 mt-6 p-8 flex gap-4">
            <div class="indicator">
                <span id="indicator" class="indicator-item ">
                    <span class="status-indicator" style="background-color: ${post.isActive ? 'green' : 'red'};"></span>
                </span>
                <img src="${post.image}" class="rounded-lg shadow-2xl" style="width:100px;height:100px;" />
            </div>
            <div>
                <p class="pb-4">#${post.category} Author:${post.author.name} </p>
                <h1 class="text-3xl font-bold">${post.title}</h1>
                <p class="py-4">${post.description}</p>
                <hr>
                <div class="mt-6 flex justify-between">
                    <div class="flex gap-4">
                        <i class="fa-regular fa-message"></i>
                        <p>${post.comment_count}</p>
                        <i class="fa-regular fa-eye"></i>
                        <p>${post.view_count}</p> <!-- Dynamic view count -->
                        <i class="fa-regular fa-clock"></i>
                        <p>${post.posted_time} min</p>
                    </div>
                    <div>
                        <i onclick="handleLogo('${post.title}', ${post.view_count})" class="fa-regular fa-envelope-open bg-green-600"></i>
                    </div>
                </div>
            </div>
        </div>
        `
        cardContainer.appendChild(postCard);

    });

    const titleContainer = document.getElementById('title');
    if (titleContainer) {
        const title = document.createElement('div');
        title.classList = `bg-base-200 p-8 pt-8 my-7`;
        title.innerHTML = `
        <div class="flex justify-around">
        <h4 class="font-bold text-2xl">Title</h4>
        <i id="markAsRead" class="fa-solid fa-check-double">Mark as read (0)</i>
    </div>
        </div>
        <div class="flex justify-around">
            
        </div>
        `;
        titleContainer.appendChild(title);
    }
}

const displayPosts2 = posts => {
    posts.forEach(post => {
        const latestContainer = document.getElementById('latest-container');
        const latestCard = document.createElement('div');
        latestCard.classList = `p-5`;
        latestCard.innerHTML = `
        <img src="${post.cover_image}" alt="" >
        <div class="flex gap-3 my-3">
            <i class="fa-regular fa-calendar-days"></i>
            <p class="text-gray-600 font-light">${post?.author?.posted_date || 'No date found'}</p>
        </div>
        <h4 class="text-[18px] font-semibold">${post.title}</h4>
        <p class="text-gray-600 font-light">${post.description}</p>
        <div class="flex gap-3 mt-3">
            <img src="${post.profile_image}" alt="" style="width:44px;height:44px;">
            <p>${post.author.name} <br><span class="text-xs font-thin">${post?.author?.designation || 'No designation found'}</span></p>
        </div>
        `
        latestContainer.appendChild(latestCard);

    });
}

const handleSearch = () => {
    const searchField = document.getElementById('category-search').value;
}

let count = 0;

const updateCountInTitle = (title, viewCount) => {
    const titleContainer = document.getElementById('title');

    
    const markAsReadElement = titleContainer.querySelector('#markAsRead');
    markAsReadElement.textContent = `Mark as read (${count})`;

  
    const newTitle = document.createElement('div');
    newTitle.classList.add('new-title', 'flex', 'justify-between', 'items-center');
    newTitle.innerHTML = `
        <h4 class="font-bold text-2xl">${title}</h4>
        <div class="flex gap-2">
            <i class="fa-regular fa-eye">${viewCount}</i>
        </div>
    `;

    
    titleContainer.appendChild(newTitle);
}

const handleLogo = (title, viewCount) => {
    count++;
    updateCountInTitle(title, viewCount);
}



loadData();
loadData2();
