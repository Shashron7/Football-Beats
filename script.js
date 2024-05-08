import config from './config.js';

const api_key=config.apiKey; 


console.log("Welcome to Football Beats by Shashwat Singh");
//This is to initialise the variables




let audioelement= new Audio(''); //not assigning any video at the starting 
let index=0; //will help to select the songs out of the given list using an index number
let masterPlay=document.getElementById('masterPlay');
let myprogressbar=document.getElementById('myprogress');
let gif=document.getElementById('gif');
gif.style.opacity=0;
let left=document.getElementById('left');
let right=document.getElementById('right');


let displaysongname=document.getElementById("whichsong");

//play pause click
masterPlay.addEventListener('click',()=>{   //adding click events to the pause play button
    if(audioelement.paused || audioelement.currentTime<=0){ //if paused
        if(index==0) //no song has been selected
        {
           
            alert("Please select a song"); //alerting the user to select a song

        }
        
        audioelement.play(); //play the audio
        songbutton=document.getElementById(`${index}`);//this now stores the current song that is playing
        songbutton.classList.remove('fa-circle-play'); //makes the play to pause a
        songbutton.classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1; //this is to show the gif
    }
    else{
        audioelement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0; //remove the gif
        makeallplay();

    }
})
 

audioelement.addEventListener('timeupdate',()=>{ //this is to update the timebar with each passing second
    console.log('timeupdate');
    //update the seekbar
    let progress=((audioelement.currentTime/audioelement.duration)*100)//calculating in percentage
    myprogressbar.value=progress;//updating the value as the progress
})

myprogressbar.addEventListener('change',()=>{
    audioelement.currentTime=(myprogressbar.value*audioelement.duration)/100; //updating the current value
    console.log("The time was changed to ", audioelement.currentTime);
}
)

const makeallplay=()=>{ //this will make all play and one pause(the selected one)
    Array.from(document.getElementsByClassName('playsong')).forEach((element)=>{ //we will get all the objects that have playsong class and now we can make them as play
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    }

    )
}


Array.from(document.getElementsByClassName('playsong')).forEach((element)=>{ //making the selected one play and everyone else stop
    element.addEventListener('click', (e)=>{
        console.log(e.target); //returns the object of the event
        index=parseInt(e.target.id); //we get the id of the songs we will play from the id of the buttons---parseInt converts string to integer
        let sname='s'+index; //all the ids are named as s+index so that's why
        let gannam=document.getElementById(sname); //means 'gane kaa naam' or the song name
        if (gannam && displaysongname) {  //to display the song name near the play button
            displaysongname.textContent = gannam.textContent;
          }
        makeallplay();
        e.target.classList.remove('fa-circle-play'); //target is the one you clicked
        e.target.classList.add('fa-circle-pause');
        audioelement.src = `songs/${index}.mp3`; //its important to use backquotes here for string interpolation
        audioelement.currentTime=0;
        audioelement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play'); //play to pause
        masterPlay.classList.add('fa-circle-pause');
        
    })
})

//working of the left and right buttons to traverse the song list

//left button
left.addEventListener('click',()=>{ 
    if(index==1 || audioelement.currentTime>2) //if the index=1 then we cant go left or if we have played the current audio for more than 2 seconds
    {
        audioelement.currentTime=0 //start from the beginning
    }
    else{
        index=index-1; //move one song left
        audioelement.src = `songs/${index}.mp3`; //its important to use backquotes here for string interpolation
        audioelement.currentTime=0;
        audioelement.play();
        let sname='s'+index; //all the ids are named as s+index so that's why
        let gannam=document.getElementById(sname);
        if (gannam && displaysongname) {
            displaysongname.textContent = gannam.textContent;
        }
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        
    }
    
})
//right button
right.addEventListener('click',()=>{
    if(index==7) //change this as per the number of songs present
    {
        audioelement.currentTime=audioelement.duration; //take it to the end
    }
    else{
        index=index+1;
        audioelement.src = `songs/${index}.mp3`; //its important to use backquotes here for string interpolation
        audioelement.currentTime=0;
        audioelement.play();
        let sname='s'+index; //all the ids are named as s+index so that's why
        let gannam=document.getElementById(sname); //gane ka naam
        if (gannam && displaysongname) {
            displaysongname.textContent = gannam.textContent; //dsplay the
        }
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        
    }
    
})
if(audioelement.currentTime==audioelement.duration) //after one song ends I want to play the next one
{
    if(index!=7)
    {
        index=index+1;
        audioelement.src = `songs/${index}.mp3`; //its important to use backquotes here for string interpolation
        audioelement.currentTime=0;
        audioelement.play();
        let sname='s'+index; //all the ids are named as s+index so that's why --string concatenation
        let gannam=document.getElementById(sname);
        if (gannam && displaysongname) {
            displaysongname.textContent = gannam.textContent;
        }
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
                
    }
}
fetch(`https://newsdata.io/api/1/news?apikey=${api_key}`)
.then(res=>{ //we are retrieving json data 
    console.log(res); //logging the json data on the console and seeing how it is sent
    return res.json(); //converting the json to normal js
})
.then(data=>{
    console.log(data);
    data.results.slice(0,5).forEach(newsItem => {  //we only want the first 5 news items to be shown
            const markup = `<li><a href=${newsItem.link}>${newsItem.title}</a></li>`;
            document.querySelector('ul').insertAdjacentHTML('beforeend', markup);
        });
})
.catch(error=> console.log(error));