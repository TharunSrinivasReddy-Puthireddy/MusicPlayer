console.log('Welcome to Spotify')

// Initialize the variables
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songInfo = document.getElementById


let songs = [
    { songName: "Ontari Vaadini", filePath: "Songs/1.mp3", coverPath: "Covers/1.jpg" },
    { songName: "Yemi Cheyamanduve", filePath: "Songs/2.mp3", coverPath: "Covers/2.jpg" },
    { songName: "Prema Prema", filePath: "Songs/3.mp3", coverPath: "Covers/3.jpg" },
    { songName: "Naa Cheli Rojave", filePath: "Songs/4.mp3", coverPath: "Covers/4.jpg" },
    { songName: "Vennello Hai", filePath: "Songs/5.mp3", coverPath: "Covers/5.jpg" },
    { songName: "Prema Entha", filePath: "Songs/6.mp3", coverPath: "Covers/6.jpg" },
    { songName: "Kikku Yekkele", filePath: "Songs/7.mp3", coverPath: "Covers/7.jpg" },
    { songName: "Andalalo", filePath: "Songs/8.mp3", coverPath: "Covers/8.jpg" },
    { songName: "Jagada", filePath: "Songs/9.mp3", coverPath: "Covers/9.jpg" },
    { songName: "Matarani", filePath: "Songs/10.mp3", coverPath: "Covers/10.jpg" },

]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// audioElement.play()

// Handle play/pause click

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1
        document.getElementsByClassName("songInfo")[0].innerHTML = `<img src="playing1.gif" alt="" style="opacity: 1;"> ${songs[songIndex].songName}`
        // document.getElementsByClassName("songInfo")[0].innerText = songs[songIndex].songName;
    }
    else {
        audioElement.pause()
        masterPlay.classList.add('fa-circle-play')
        masterPlay.classList.remove('fa-circle-pause')
        gif.style.opacity = 0
        makeAllPlays()
        document.getElementsByClassName("songInfo")[0].innerHTML = `<img src="playing1.gif" alt="" style="opacity: 0;"> ${songs[songIndex].songName}`
    }
})

// document.querySelectorAll(".songItem").addEventListener('click', () => {
//     if (audioElement.paused || audioElement.currentTime <= 0) {
//         audioElement.play()
//         masterPlay.classList.remove('fa-circle-play')
//         masterPlay.classList.add('fa-circle-pause')
//         gif.style.opacity = 1
//         document.getElementsByClassName("songInfo")[0].innerHTML = `<img src="playing1.gif" alt="" style="opacity: 1;"> ${songs[songIndex].songName}`
//         // document.getElementsByClassName("songInfo")[0].innerText = songs[songIndex].songName;
//     }
//     else {
//         audioElement.pause()
//         masterPlay.classList.add('fa-circle-play')
//         masterPlay.classList.remove('fa-circle-pause')
//         gif.style.opacity = 0
//         makeAllPlays()
//         document.getElementsByClassName("songInfo")[0].innerHTML = `<img src="playing1.gif" alt="" style="opacity: 0;"> ${songs[songIndex].songName}`
//     }
// })

// Listen to Events

audioElement.addEventListener('timeupdate', () => {
    // update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressBar.value = progress
})


// Play the next song automatically when the current song completes
audioElement.addEventListener('ended', () => {
    songIndex = (songIndex + 1) % songs.length; // Calculate the index of the next song
    audioElement.src = songs[songIndex].filePath; // Set the source of the Audio element to the next song
    audioElement.play(); // Play the next song
    document.getElementsByClassName("songInfo")[0].innerHTML = `<img src="playing1.gif" alt="" style="opacity: 1;"> ${songs[songIndex].songName}`;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
});



myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.add('fa-circle-play')
        element.classList.remove('fa-circle-pause')

    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play')
        e.target.classList.add('fa-circle-pause')
        audioElement.src = `Songs/${songIndex + 1}.mp3`
        document.getElementsByClassName("songInfo")[0].innerHTML = `<img src="playing1.gif" alt="" style="opacity: 1;"> ${songs[songIndex].songName}`
        audioElement.currentTime = 0
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play()
            masterPlay.classList.remove('fa-circle-play')
            masterPlay.classList.add('fa-circle-pause')
        }
        else {
            audioElement.pause()
            masterPlay.classList.add('fa-circle-play')
            masterPlay.classList.remove('fa-circle-pause')

        }

    })
});


const songItemBox = Array.from(document.getElementsByClassName('songItem'));

songItemBox.forEach((element) => {
  element.addEventListener('click', () => {
    const clickedIndex = songItemBox.indexOf(element);

    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.src = songs[clickedIndex].filePath;
      audioElement.play();
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
      gif.style.opacity = 1;
      document.getElementsByClassName("songInfo")[0].innerHTML = `<img src="playing1.gif" alt="" style="opacity: 1;"> ${songs[clickedIndex].songName}`;
    } else {
      audioElement.pause();
      masterPlay.classList.add('fa-circle-play');
      masterPlay.classList.remove('fa-circle-pause');
      gif.style.opacity = 0;
      makeAllPlays();
      document.getElementsByClassName("songInfo")[0].innerHTML = `<img src="playing1.gif" alt="" style="opacity: 0;"> ${songs[clickedIndex].songName}`;
    }
  });
});


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1

    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.add('fa-circle-pause')
    masterPlay.classList.remove('fa-circle-play')

    
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1

    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.add('fa-circle-pause')
    masterPlay.classList.remove('fa-circle-play')
})