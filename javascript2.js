// initialising variable 
let songIndex=0;
let audioElement=new Audio('./songs/1.mp3');
let masterplay=document.getElementById("masterplay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let songItem=Array.from(document.getElementsByClassName("songItem"));
console.log("javascript is running")
let songs=[
{songName:"Justin",filePath:"./songs/1.mp3",coverpath:"./covers/1.jpg"},
{songName:"Baby",filePath:"./songs/2.mp3",coverpath:"./covers/2.jpg"},
{songName:"Azul",filePath:"./songs/3.mp3",coverpath:"./covers/3.jpg"},
{songName:"Dopamine",filePath:"./songs/4.mp3",coverpath:"./covers/4.jpg"},
{songName:"Alone",filePath:"./songs/5.mp3",coverpath:"./covers/5.jpg"},
{songName:"high Rated Gabru",filePath:"./songs/6.mp3",coverpath:"./covers/6.jpg"},
{songName:"Ishare tere",filePath:"./songs/7.mp3",coverpath:"./covers/7.jpg"},
{songName:"Shamat",filePath:"./songs/8.mp3",coverpath:"./covers/8.jpg"},
{songName:"Lahore",filePath:"./songs/9.mp3",coverpath:"./covers/9.jpg"},
{songName:"Bandu 2.0",filePath:"./songs/10.mp3",coverpath:"./covers/10.jpg"}
];

songItem.forEach((element,i)=>{
   
   element.getElementsByTagName("img")[0].src=songs[i].coverpath; 
   element.getElementsByClassName("songname")[0].innerText=songs[i].songName;
});
// Listen to events
audioElement.addEventListener('timeupdate',()=>{
    // update seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
});

myProgressBar.addEventListener("change",()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songitemplay")).forEach((element) => {

        const temp = document.createElement("span");

        temp.innerHTML = FontAwesome.icon({
            prefix: "far",
            iconName: "circle-play"
        }).html.join("");

        const newIcon = temp.firstElementChild;
        newIcon.classList.add("songitemplay");

        element.replaceWith(newIcon);
    });
}

let index = 0;

function changeIcon(element, iconName, className) {

    const temp = document.createElement("span");

    temp.innerHTML = FontAwesome.icon({
        prefix: "far",
        iconName: iconName
    }).html.join("");

    const newIcon = temp.firstElementChild;

    newIcon.classList.add(className);

    if (element.id) {
        newIcon.id = element.id;
    }

    element.replaceWith(newIcon);

    return newIcon;
}

document.addEventListener("click", (e) => {

    // =========================
    // UPPER SONG ICON
    // =========================

    const clickedSong = e.target.closest(".songitemplay");

    if (clickedSong) {

        const icons = Array.from(
            document.getElementsByClassName("songitemplay")
        );

        index = icons.indexOf(clickedSong);

        // Agar song already chal raha hai
        if (!audioElement.paused && 
            audioElement.src.includes(`songs/${index + 1}.mp3`)) {

            audioElement.pause();
             gif.style.opacity=0;

            makeAllPlays();

            changeIcon(
                document.querySelector("#masterplay"),
                "circle-play",
                "masterplay"
            );

            return;
        }

        // Naya song play
        audioElement.src = `songs/${index + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;

        // Sab song icons play
        makeAllPlays();

        // Current song pause
        const newIcons =
            document.getElementsByClassName("songitemplay");

        changeIcon(
            newIcons[index],
            "circle-pause",
            "songitemplay"
        );

        // Master bhi pause
        changeIcon(
            document.querySelector("#masterplay"),
            "circle-pause",
            "masterplay"
        );

        return;
    }



    // =========================
    // MASTER PLAY
    // =========================

    const clickedMaster = e.target.closest("#masterplay");

    if (clickedMaster) {

        // MASTER OFF → ON
        if (audioElement.paused) {

            // Agar audio source nahi hai
            if (!audioElement.src) {
                audioElement.src = `songs/${index + 1}.mp3`;
            }

            audioElement.play();
            gif.style.opacity=1;

            // Master pause
            changeIcon(
                clickedMaster,
                "circle-pause",
                "masterplay"
            );

            // Sabko play icon
            makeAllPlays();
        

            // Current song pause
            const icons =
                document.getElementsByClassName("songitemplay");

            changeIcon(
                icons[index],
                "circle-pause",
                "songitemplay"
            );
            gif.style.opacity=1;

        }

        // MASTER ON → OFF
        else {

            audioElement.pause();
             gif.style.opacity=0;

            // Master play
            changeIcon(
                clickedMaster,
                "circle-play",
                "masterplay"
            );

            // Song bhi play icon
            makeAllPlays();
        }
    }
});

const previous = document.getElementById("previous");
const next = document.getElementById("next");

previous.addEventListener("click", () => {

    index--;

    if (index < 0) {
        index = songIcons.length - 1;
    }

    audioElement.src = `songs/${index + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();

    makeAllPlays();

    let icons = document.getElementsByClassName("songitemplay");

    changeIcon(icons[index], "circle-pause", "songitemplay");

    changeIcon(
        document.querySelector("#masterplay"),
        "circle-pause",
        "masterplay"
    );
});

next.addEventListener("click", () => {

    index++;

    if (index >= songIcons.length) {
        index = 0;
    }

    audioElement.src = `songs/${index + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();

    makeAllPlays();

    let icons = document.getElementsByClassName("songitemplay");

    changeIcon(icons[index], "circle-pause", "songitemplay");

    changeIcon(
        document.querySelector("#masterplay"),
        "circle-pause",
        "masterplay"
    );
});


document.getElementById("next").addEventListener("click",()=>{
    console.log("clicked");
})


document.addEventListener("click", (e) => {

    const nextBtn = e.target.closest("#next");
    const previousBtn = e.target.closest("#previous");

    if (nextBtn) {



        if (songs.length === 0) return;
 index++;

        if (index >= songs.length) {
            index = 0;
        }
          

        audioElement.src = songs[index].filePath;
        audioElement.currentTime = 0;
        audioElement.play();


        document.getElementById("masterSongName").innerText =
            songs[index].songName;
    }


    if (previousBtn) {

        if (songs.length === 0) return;

        index--;

        if (index < 0) {
            index = songs.length - 1;
        }

        audioElement.src = songs[index].filePath;
        audioElement.currentTime = 0;
        audioElement.play();

        document.getElementById("masterSongName").innerText =
            songs[index].songName;
    }

});
