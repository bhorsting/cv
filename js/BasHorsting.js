// scene/demo-specific variables go here
const sceneIsDynamic = true;
const camFlightSpeed = 1000;
let sunAngle = 0;
const sunDirection = new THREE.Vector3();
const waterLevel = 0.0;
let cameraUnderWater = false;
let tex2;
// called automatically from within initTHREEjs() function
function initSceneData()
{

        // scene/demo-specific three.js objects setup goes here
        EPS_intersect = mouseControl ? 1.0 : 5.0; // less precision on mobile

        // set camera's field of view
        worldCamera.fov = 60;
        focusDistance = 2000.0;

        // position and orient camera
        cameraControlsObject.position.set(-7134, 1979, -4422);
        cameraControlsYawObject.rotation.y = -2.2;
        cameraControlsPitchObject.rotation.x = 0.0;

        PerlinNoiseTexture = setUpTexture('textures/perlin256.png');
        tex2= setUpTexture('textures/perlin256_2.png');

} // end function initSceneData()


function setUpTexture(path) {
        //const texture = new THREE.TextureLoader().load(path);
        const texture = new THREE.VideoTexture( document.getElementById( 'video' ));
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.flipY = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        return texture;
}
const cv = document.getElementById('cv');

function setUpText(amount) {
        let textShadow = [];
        for (let i=0; i<amount; i++) {
                textShadow.push(`${i*2}px ${i*2}px 0px rgba(255,0,155,${0.85-((i/amount)*0.85)})`);
        }
        cv.style.textShadow = textShadow.join(',');
}

// called automatically from within initTHREEjs() function
function initPathTracingShaders()
{

        // scene/demo-specific uniforms go here
        pathTracingUniforms.t_PerlinNoise = { type: "t", value: PerlinNoiseTexture };
        pathTracingUniforms.uWaterLevel = { type: "f", value: 0.0 };
        pathTracingUniforms.uSunDirection = { type: "v3", value: new THREE.Vector3() };
        pathTracingUniforms.uColorChange = { type: "f", value: 0.0 };
        pathTracingDefines = {
                //NUMBER_OF_TRIANGLES: total_number_of_triangles
        };

        // load vertex and fragment shader files that are used in the pathTracing material, mesh and scene
        fileLoader.load('shaders/common_PathTracing_Vertex.glsl', function (shaderText)
        {
                pathTracingVertexShader = shaderText;

                createPathTracingMaterial();
        });

} // end function initPathTracingShaders()


// called automatically from within initPathTracingShaders() function above

let campos = 1979;


function createPathTracingMaterial()
{

        fileLoader.load('shaders/Arctic_Circle_Fragment.glsl', function (shaderText)
        {

                pathTracingFragmentShader = shaderText;

                pathTracingMaterial = new THREE.ShaderMaterial({
                        uniforms: pathTracingUniforms,
                        defines: pathTracingDefines,
                        vertexShader: pathTracingVertexShader,
                        fragmentShader: pathTracingFragmentShader,
                        depthTest: false,
                        depthWrite: false
                });

                pathTracingMesh = new THREE.Mesh(pathTracingGeometry, pathTracingMaterial);
                pathTracingScene.add(pathTracingMesh);

                // the following keeps the large scene ShaderMaterial quad right in front 
                //   of the camera at all times. This is necessary because without it, the scene 
                //   quad will fall out of view and get clipped when the camera rotates past 180 degrees.
                worldCamera.add(pathTracingMesh);

        });

} // end function createPathTracingMaterial()
const linksDiv = document.getElementById('links');

let textRotate = 0;
let colorRotate = 0;
let colorToRotate = 0;

let titles = ["Welcome to", "bas-horsting.nl", "Bas Horsting"];
// called automatically from within the animate() function
function updateVariablesAndUniforms()
{

        // scene/demo-specific variables
        if (cameraControlsObject.position.y < 0.0)
                cameraUnderWater = true;
        else cameraUnderWater = false;


        sunAngle = ((elapsedTime * 0.02) + 0.5) % TWO_PI;
        sunDirection.set(Math.cos(sunAngle), Math.cos(sunAngle) * 0.2 + 0.2, Math.sin(sunAngle));
        sunDirection.normalize();

        // scene/demo-specific uniforms
        pathTracingUniforms.uWaterLevel.value = waterLevel;
        pathTracingUniforms.uSunDirection.value.copy(sunDirection);

        linksDiv.style.filter = `hue-rotate(${colorRotate}deg)`;
        pathTracingUniforms.uColorChange.value = colorRotate * 0.0174532925;

        //cameraControlsObject.position.y = elapsedTime * 1000;
        //console.log(cameraControlsObject.position.y)
        cameraControlsObject.position.y += (campos - cameraControlsObject.position.y) / 200;
        colorRotate += (colorToRotate - colorRotate) / 100;

} // end function updateUniforms()
let opacity = 0;
let time = 0;
let targetY = -2.2;
function updateText(){
        opacity = Math.abs(Math.sin(time/60));
        if (opacity < 0.02 && time>10) {
                currentText = titles[textRotate];
                startHandWriting();
                textRotate += 1;
                if (textRotate > titles.length-1){
                        textRotate = 0;
                }
                time = 0;
        }
        cameraControlsYawObject.rotation.y += (targetY- cameraControlsYawObject.rotation.y)/10;
        time++;
}

setInterval(updateText, 15);

init(); // init app and start animating
