function setTitles(arrayOfTitles) {
    titles = arrayOfTitles;
    textRotate = arrayOfTitles.length-1;
}

function goAbout() {
    stopAnimation = true;
    setTitles(["About", "Bas Horsting"]);
    targetY = -2.1;
    campos = 3000;
    colorToRotate = 60;
    pathTracingUniforms.t_PerlinNoise = { type: "t", value: PerlinNoiseTexture };
    showCV();
}

function goWork() {
    stopAnimation = false;
    setTitles(["Work by", "Bas Horsting"]);
    targetY = -2.3;
    campos = 0;
    colorToRotate = 200;
    pathTracingUniforms.t_PerlinNoise = { type: "t", value: tex2 };
    hideCV();
}

function goContact() {
    stopAnimation = false;
    setTitles(["Contact", "Bas Horsting", "bhorsting at gmail dot com"]);
    targetY = -1.5;
    campos = 1000;
    colorToRotate = 270;
    pathTracingUniforms.t_PerlinNoise = { type: "t", value: PerlinNoiseTexture };
    hideCV();
}

function goHome() {
    stopAnimation = false;
    setTitles(["Welcome to", "bas-horsting.nl", "Bas Horsting"]);
    targetY = -2.2;
    campos = 1979;
    colorToRotate = 0;
    pathTracingUniforms.t_PerlinNoise = { type: "t", value: PerlinNoiseTexture };
    hideCV();
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
