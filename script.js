const apiKey = 'XgCxzFl9l8FqZui2uoTWlCxQA4CHqKdIGrXGqRre';
const currentDate = new Date().toISOString().split("T")[0];
const baseURL = 'https://api.nasa.gov/planetary/apod?';

const dateContainer = document.getElementById('date-container');
const pictureContainer = document.getElementById('picture');
const videoContainer = document.getElementById('video'); // 2023-09-06
const textTitle = document.getElementById('text-title');
const textInfo = document.getElementById('text-info');

const searchBtn = document.getElementById('search');
const selectDate = document.getElementById('select-date');
const previousSearches = document.getElementById('previous-search');



async function getCurrentImageOftheDay(requireDate) {
    const endpoint = `${baseURL}date=${requireDate}&api_key=${apiKey}`
    try {
        const response = await fetch(endpoint);
        const result = await response.json();

        console.log(result);
        dateContainer.innerText = `picture on ${result.date}`;
        if (result.media_type === 'image') {
            pictureContainer.setAttribute('src', result.url);
        } else if (result.media_type === 'video') {
            videoContainer.setAttribute('src', result.url);
            pictureContainer.style.display = 'none';
            videoContainer.style.display = 'block';
        }
        textTitle.innerText = result.title;
        textInfo.innerText = result.explanation;
    }
    catch {
        console.log('error raised');
    }
}

function saveSearch(savingDate) {
    if (localStorage.getItem('obj') != null) {
        const myObj = JSON.parse(localStorage.getItem('obj'));
        myObj.history.push(savingDate);
        localStorage.setItem('obj', JSON.stringify(myObj));
        // console.log(myObj);
        
    } else {
        const obj = { history: [] };
        obj.history.push(savingDate);
        localStorage.setItem('obj', JSON.stringify(obj));
    }

    addSearchToHistory(true, savingDate);
}

function addSearchToHistory(value, savingDate) {
    if (value == true) {
        const ele = document.createElement('p');
        ele.innerText = savingDate;
        ele.setAttribute('class','previous-p-tags');
       // ele.onclick = getCurrentImageOftheDay(savingDate)
       ele.addEventListener('click',()=>{
        ele.style.color = 'purple';
        getCurrentImageOftheDay(savingDate);
       })
        previousSearches.appendChild(ele);
        // console.log('inside add search prevous');
    } else {
        if (localStorage.getItem('obj') == null) {
            return;
        }
        const myObj = JSON.parse(localStorage.getItem('obj'));
        const arr = myObj.history;
        for (let i=0; i<arr.length; i++) {
            const add = arr[i];
            const ele = document.createElement('p');
            ele.innerText = add;
            ele.setAttribute('class','previous-p-tags');
            //ele.onclick = getCurrentImageOftheDay(savingDate)
            ele.addEventListener('click', function(){
                ele.style.color = 'purple';
                getCurrentImageOftheDay(add);
                console.log(add);
            })
            previousSearches.appendChild(ele);
        }

    }
}

searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    // console.log(selectDate.value);
    //console.log(currentDate);
    getCurrentImageOftheDay(selectDate.value);
    saveSearch(selectDate.value);

});

getCurrentImageOftheDay(currentDate);
addSearchToHistory();