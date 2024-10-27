const xhrBtn = document.getElementById("XHR");
xhrBtn.addEventListener("click", searchUsingXHR);

const promiseBtn = document.getElementById("promise");
promiseBtn.addEventListener("click", searchUsingFetchPromises);

const asyncAwaitBtn = document.getElementById("async_await");
asyncAwaitBtn.addEventListener("click", searchUsingFetchAsyncAwait);

const searchInput = document.getElementById("searchInput");
const api_url = "https://api.unsplash.com/search/photos";
const access_Key = "mWd_Q0UbIpp0E_Wt5e9jkzWLXY3kJco6Y-IB0sZMMfg";

function searchUsingXHR() {
    const queryTerm = searchInput.value.trim();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", api_url + "?query=" + queryTerm);
    xhr.setRequestHeader("Authorization", "Client-ID " + access_Key);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log("success");
            const responseObj = JSON.parse(xhr.responseText);
            createImages(responseObj);
        }
    };
    xhr.send();
}

function searchUsingFetchPromises() {
    const queryTerm = searchInput.value.trim();
    fetch(api_url + "?query=" + queryTerm, {
        method: "GET",
        headers: {
            "Authorization": "Client-ID " + access_Key
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        createImages(data);
    })
    .catch((error) => console.error("Fetch Error:", error));
}

async function searchUsingFetchAsyncAwait() {
    const queryTerm = searchInput.value.trim();
    try {
        const response = await fetch(api_url + "?query=" + queryTerm, {
            method: "GET",
            headers: {
                "Authorization": "Client-ID " + access_Key
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseObj = await response.json();
        createImages(responseObj);
    } catch (error) {
        console.error("Fetch Async/Await Error:", error);
    }
}

function createImages(data) {
    const resultElem = document.getElementById("results");
    resultElem.innerHTML = ""; 
    for (let item of data.results) {
        const imgElem = document.createElement("img");
        imgElem.src = item.urls.small;
        imgElem.alt = item.alt_description || "Image";
        resultElem.appendChild(imgElem);
    }
}
