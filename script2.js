var canvas = document.getElementById("renderCanvas");

var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
const createScene = function () {
const scene = new BABYLON.Scene(engine);






scene.useRightHandedSystem = true    

// const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 4, 4, BABYLON.Vector3.Zero());
var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(10, 10, 10), scene);
camera.attachControl(canvas, true);

    camera.lowerRadiusLimit = 20;
    camera.upperRadiusLimit = 20; // 30
    camera.wheelDeltaPercentage = 0.01;    

    
//camera.position = new BABYLON.Vector3(50, 5, 10);      
    


const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 10, 0));

// Glowing effect on diffuse materials
var gl = new BABYLON.GlowLayer("glow", scene, { mainTextureSamples: 4 }); 


const ground = BABYLON.MeshBuilder.CreateBox("box", {height: 1, width: 1, depth: 1 });

ground.material = new BABYLON.StandardMaterial("road", scene)
ground.material.diffuseTexture = new BABYLON.Texture("Textures/Wood_Floor_006_COLOR (2).jpg", scene);
ground.material.bumpTexture = new BABYLON.Texture("Textures/Stage_Floor_001_normal.jpg", scene);	
ground.material.specularTexture = new BABYLON.Texture("Textures/Stage_Floor_001_ambientOcclusion.jpg", scene);    

   ground.material.bumpTexture.uScale = 20;
   ground.material.bumpTexture.vScale = 20;
      
   ground.material.diffuseTexture.uScale = 20;
   ground.material.diffuseTexture.vScale = 20;  
   
   ground.material.specularTexture.uScale = 20;
   ground.material.specularTexture.vScale = 20;  


ground.position.z = 8.5
ground.position.y = -5
ground.isVisible = false 






// Model

BABYLON.SceneLoader.ImportMesh("", "", "Models/aa43.glb", scene, function (newMeshes, particleSystems, skeletons) { 
var character = newMeshes[0];

var PI = Math.PI / -1;

character.rotation = new BABYLON.Vector3(0, PI, 0);
character.position.y = 0
character.position.z = 0
character.position.x = 0
character.scaling = new BABYLON.Vector3(0.05, 0.05, 0.05);
character.parent = ground;


const firstAnim = scene.getAnimationGroupByName("All");
firstAnim.start(true, 1.0, firstAnim.from, firstAnim.to, false);


});


// Lamps
var GlowMat = new BABYLON.StandardMaterial("redMat", scene);
GlowMat.emissiveColor = new BABYLON.Color3(1, 1, 1);


const Lamp1 = BABYLON.MeshBuilder.CreateCylinder("cylinder", {  });
Lamp1.position.z = 0
Lamp1.position.y = 10;
Lamp1.position.x = 5
Lamp1.scaling = new BABYLON.Vector3(0.2, 2, 0.2);
Lamp1.parent = ground;
Lamp1.material = GlowMat;


const Lamp2 = BABYLON.MeshBuilder.CreateCylinder("cylinder", {  });
Lamp2.position.z = 0
Lamp2.position.y = 10;
Lamp2.position.x = -5
Lamp2.scaling = new BABYLON.Vector3(0.2, 2, 0.2);
Lamp2.parent = ground;
Lamp2.material = GlowMat;

const Lamp3 = BABYLON.MeshBuilder.CreateCylinder("cylinder", {  });
Lamp3.position.z = 5
Lamp3.position.y = 10;
Lamp3.position.x = 0
Lamp3.scaling = new BABYLON.Vector3(0.2, 2, 0.2);
Lamp3.parent = ground;
Lamp3.material = GlowMat;

const Lamp4 = BABYLON.MeshBuilder.CreateCylinder("cylinder", {  });
Lamp4.position.z = -5
Lamp4.position.y = 10;
Lamp4.position.x = 0
Lamp4.scaling = new BABYLON.Vector3(0.2, 2, 0.2);
Lamp4.parent = ground;
Lamp4.material = GlowMat;

scene.registerBeforeRender(() => { 

Lamp1.rotation.x += 0.01    
Lamp2.rotation.x -= 0.01
Lamp3.rotation.x += 0.01 
Lamp4.rotation.x -= 0.01  

});


// Scrolltrigger

gsap.registerPlugin(ScrollTrigger);


//scene.rotation.set(0, 1.88, 0)
camera.position.set(0.014, 1.07, 2.10)


ScrollTrigger.defaults({
immediateRender: false,
ease: "power1.inOut",
});



let car_anim_tl = gsap.timeline({

scrollTrigger: {
//  trigger: ".section-two",
  trigger: "body",
  start: "top top", 
  endTrigger: ".section-five",
  end: "bottom bottom", 
  scrub: 1, 
}

});


car_anim_tl
.to(ground.rotation, { y: 6.5 }, "simultaneously") 
.to(ground.position, { z: 30 }, "simultaneously")   


gsap.to(".section3Text1", {
    scrollTrigger:{
        trigger: ".section-three",
        start: "top bottom", 
        end: "bottom top", 
        scrub: 1,
        markers: false
    },
    x: 0, opacity: 1,

})	




return scene;
}
        window.initFunction = async function() {
            
            
            var asyncEngineCreation = async function() {
                try {
                return createDefaultEngine();
                } catch(e) {
                console.log("the available createEngine function failed. Creating the default engine instead");
                return createDefaultEngine();
                }
            }

            window.engine = await asyncEngineCreation();
if (!engine) throw 'engine should not be null.';
startRenderLoop(engine, canvas);
window.scene = createScene();};
initFunction().then(() => {sceneToRender = scene                    
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});