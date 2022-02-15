/*
Guanqiao Huang's JS Assessment
*/

const playList = {
    _list: [],

    get list() {
        return this._list;
    },

    addMedia(title, artist, imageUrl, fileUrl) {
        let media = {
            title: title,
            artist: artist,
            imageUrl: imageUrl,
            fileUrl: fileUrl
        };
        this._list.push(media);
    }
};

const getElement = id => {
    //console.log(`getElement:${id}`);
    return document.getElementById(id);
}

//Text: Playing 1 of 3
let listIndex = getElement("list-index");

//Current Media Image
let mediaImage = getElement("media-image");

//Current Media Name
let mediaName = getElement("media-name");

//Current Media Artist
let mediaArtist = getElement("media-artist");

//Play Button
let play = getElement("play");

//Previous Button
let previous = getElement('previous');

//Next Button
let next = getElement('next');

//Volume Bar
let volumeBar = getElement('volume-bar');

//Time Bar
let timeBar = getElement('time-bar');

//Current Time
let curTime = getElement('current-time');

//End Time
let endTime = getElement('end-time');

//Index of current media
let mediaIndex = 0;
let currentAudio = document.createElement('audio');
let curPlaying = false;

function preLoading() {
    playList.addMedia("ukulele", "Benjamin Tissot", "./img/ukulele.jpg", "https://www.bensound.com/bensound-music/bensound-ukulele.mp3");
    playList.addMedia("better-days", "Benjamin Tissot", "./img/betterdays.jpg", "https://www.bensound.com/bensound-music/bensound-betterdays.mp3");
    playList.addMedia("sunny", "Benjamin Tissot", "./img/sunny.jpg", "https://www.bensound.com/bensound-music/bensound-sunny.mp3");
    //testLoading();
};

function testLoading() {
    console.log(playList.list);
};

preLoading();

function loadMedia(index) {
    let media = playList.list[index];
    //Change the text in the list-index
    listIndex.textContent = `PLAYING ${index + 1} OF ${playList.list.length}`;

    //everytime load a new media, reset the time bar value to zero
    resetTimeBar();

    //loading the media source
    currentAudio.src = media.fileUrl;

    mediaImage.style.backgroundImage = "url(" + media.imageUrl + ")";
    mediaName.textContent = media.title;
    mediaArtist.textContent = media.artist;
    //console.log(currentAudio.src, mediaName.textContent, mediaArtist.textContent);
    setTimebar();

}

loadMedia(mediaIndex);


function controlPlay() {
    currentAudio.play();
    curPlaying = true;
    play.textContent = "Pause";
}

function controlPause() {
    currentAudio.pause();
    curPlaying = false;
    play.textContent = "Play";
}

function controlNext() {
    if (mediaIndex < playList.list.length - 1) {
        mediaIndex++; //next index
    }
    else {
        mediaIndex = 0; //reset the index
    }
    loadMedia(mediaIndex);
}

function controlPrevious() {
    if (mediaIndex > 0) {
        mediaIndex--; //next index
    }
    else {
        mediaIndex = playList.list.length - 1; //reset the index
    }
    loadMedia(mediaIndex);

}

function controlVolume() {
    currentAudio.volume = volumeBar.value / 100;
}

function controlTime() {
    currentAudio.currentTime = currentAudio.duration * (timeBar.value / 100);
}

function setTimebar() {
    setTimeout(() => {
        endTime.textContent = timeCalulator(currentAudio.duration);
        console.log(`setTimebar: ${curTime.textContent}, ${endTime.textContent}`);
    }, 1000);

    currentAudio.ontimeupdate = function () {
        curTime.textContent = timeCalulator(currentAudio.currentTime);
        timeBar.value = currentAudio.currentTime / currentAudio.duration * 100;
        console.log(`ontimeupdate: ${curTime.textContent}`);
    }

}

function resetTimeBar() {
    timeBar.value = 0;
    curTime.textContent = '00:00';
}

function timeCalulator(seconds) {
    let minutes = Math.floor(seconds / 60);
    let restSeconds = Math.floor(seconds % 60);
    let timeString;
    if (minutes < 10) {
        if (restSeconds < 10) {
            timeString = `0${minutes}:0${restSeconds}`;
        } else {
            timeString = `0${minutes}:${restSeconds}`;
        }
    } else {
        if (restSeconds < 10) {
            timeString = `${minutes}:0${restSeconds}`;
        } else {
            timeString = `${minutes}:${restSeconds}`;
        }
    }
    //console.log(minutes, restSeconds);
    //console.log(timeString);
    return timeString;
}

play.addEventListener('click', function () {
    if (curPlaying == false) {
        controlPlay();
    } else {
        controlPause();
    }

});

next.addEventListener('click', function () {
    controlNext();
    controlPlay();

});

previous.addEventListener('click', function () {
    controlPrevious();
    controlPlay();

});

volumeBar.addEventListener('click', function () {
    controlVolume();
});

timeBar.addEventListener('click', function () {
    controlTime();
    setTimebar();
});




