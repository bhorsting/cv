function setTitles(arrayOfTitles) {
    titles = arrayOfTitles;
    textRotate = arrayOfTitles.length-1;
}

const work_left = document.getElementById('work_left');
const work_right = document.getElementById('work_right');

const expl = ['E-Ink picture frame: Black and white. Charged by solar cell.',
    'Baby projector inside old Philips loudspeaker.',
    '3D preview rendering at Greetz.',
    'Custom MIDI patcher running using Chrome and WebMIDI.',
    'Purr Binta: A project and website collaborating with West African bag tailors.'];

const explDiv = document.getElementById('expl');
const workvideo = document.getElementById('workvideo');
let videoIndex = 1;
function showVideo(index){
    if (index < 2) {
        index = 1;
        work_left.style.opacity = 0.5;
    } else {
        work_left.style.opacity = 1;
    }
    if (index > expl.length) {
        index = expl.length - 1;
        work_right.style.opacity = 0.5;
    }  else {
        work_right.style.opacity = 1;
    }
    videoIndex = index;
    explDiv.innerText = expl[index-1];
    workvideo.src = `assets/scherm${index+1}.mp4`;
    workvideo.play();
}

showVideo(1);

function showActiveLink(name){
    for (let link of Array.from(linksDiv.children)) {
        if (link.innerText === name) {
            link.classList.add('selected');
        } else {
            link.classList.remove('selected');
        }
    }
}

function showContainer(val){
    if(val){
        container.style.visibility = 'visible';
        document.body.scrollTo(0,0);
    } else {
        container.style.visibility = 'hidden';
    }
}

function goAbout() {
    showActiveLink('about');
    showContainer(false);
    stopAnimation = true;
    setTitles(["About", "Bas Horsting"]);
    targetY = -2.1;
    campos = 3000;
    colorToRotate = 60;
    pathTracingUniforms.t_PerlinNoise = { type: "t", value: PerlinNoiseTexture };
    showCV();
    hideWork();
}

function goWork() {
    showActiveLink('work');
    showContainer(false);
    stopAnimation = false;
    setTitles(["Work by", "Bas Horsting"]);
    targetY = -2.3;
    campos = 0;
    colorToRotate = 200;
    pathTracingUniforms.t_PerlinNoise = { type: "t", value: tex2 };
    hideCV();
    showWork();
}

function goContact() {
    showActiveLink('contact');
    showContainer(true);
    stopAnimation = false;
    setTitles(["Contact", "Bas Horsting", "bhorsting at gmail dot com"]);
    targetY = -1.5;
    campos = 1000;
    colorToRotate = 270;
    pathTracingUniforms.t_PerlinNoise = { type: "t", value: PerlinNoiseTexture };
    hideCV();
    hideWork();
}

function goHome() {
    showActiveLink('home');
    showContainer(true);
    stopAnimation = false;
    setTitles(["Welcome to", "bas-horsting dot com", "Bas Horsting"]);
    targetY = -2.2;
    campos = 1979;
    colorToRotate = 0;
    pathTracingUniforms.t_PerlinNoise = { type: "t", value: PerlinNoiseTexture };
    hideCV();
    hideWork();
}

goHome();

function showWork() {
    work.style.display = 'block';
    handwritingCanvas.style.display = 'none';
    stopAnimation = true;
}

function hideWork() {
    work.style.display = 'none';
    handwritingCanvas.style.display = 'block';
    stopAnimation = false;
}

function showCV() {
    cv.style.display = 'block';
    stopAnimation = true;
}

function hideCV() {
    cv.style.display = 'none';
    stopAnimation = false;
}

function getPixel(){
    const gl = canvas.getContext('webgl2');
    const arr = new Uint8Array(4);
    gl.readPixels(0,0,1,1, gl.RGBA, gl.UNSIGNED_BYTE, arr);
    return arr;
}
