const searchSong = async() => {
    const searchText = document.getElementById('search-input').value;
    const url =`https://api.lyrics.ovh/suggest/${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displaySong(data.data);
}

const displaySong = songs => {
    // console.log(songs);
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = '"search-result col-md-8 mx-auto py-4';
        songDiv.innerHTML = `
        <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick='getLyric("${song.artist.name}", "${song.title}")' class="btn btn-success">Get Lyrics</button>
        </div>
        </div>
        `;
        songContainer.appendChild(songDiv);
    })
}

//// git data from api with async mehtod 
const getLyric = async (artist, title) =>{
    try{
        const url = ` https://ap.lyrics.ovh/v1/${artist}/${title}`;
        const res = await fetch(url);
        const data = await res.json();
        displayLyric(data.lyrics);  
    }
    catch(error){
        console.log(error);
    }
}

// const getLyric = (artist, title) =>{
//     const url = ` https://api.lyrics.ovh/v1/${artist}/${title}`;
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayLyric(data.lyrics))
//     .catch(error => displayError(`something want to wrong please try to catch`))
// }


const displayLyric = lyric => {
    const lyricDiv = document.getElementById('song-lyric');
    lyricDiv.innerText = lyric;
}

const displayError = error => {
    const apiError = document.getElementById('error-message');
    apiError.innerText = error;
}

























