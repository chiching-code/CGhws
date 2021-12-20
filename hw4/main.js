import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

import { Candle } from "./candle.js";

var renderer, camera, scene,clockA,clockB,clockC,clockD,clockE;
var candles = [];
var mouseLoc;
var raycaster = new THREE.Raycaster();
var pickables = [];
var lightA = false,lightB = false,lightC = false,lightD = false,lightE = false;

export function init() {
	scene = new THREE.Scene();
	clockA = new THREE.Clock();
    clockB = new THREE.Clock();
    clockC = new THREE.Clock();
    clockD = new THREE.Clock();
    clockE = new THREE.Clock();
    
	renderer = new THREE.WebGLRenderer();
	let width = window.innerWidth;
	let height = window.innerHeight;
	renderer.setSize (width, height);
	document.body.appendChild (renderer.domElement);
	renderer.setClearColor (0x01031c);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
	
	camera = new THREE.PerspectiveCamera (50, width/height, 1, 10000);
	camera.position.set (0,150,200);
	
	let controls = new OrbitControls(camera, renderer.domElement);
	 
	///////////////////////////
	let spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.angle = Math.PI/3;
	spotLight.position.set( 0, 220, 0 );

	spotLight.castShadow = true;	
    spotLight.penumbra = 0.51
	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;

	spotLight.shadow.camera.near = 50;
	spotLight.shadow.camera.far = 250;
	spotLight.shadow.camera.fov = 120;//spotLight.angle*Math.PI/180*2;;

	scene.add( spotLight );
	//scene.add (new THREE.SpotLightHelper(spotLight));
	//scene.add (new THREE.CameraHelper (spotLight.shadow.camera));
	
	///////////////////////////  	
	let floorPY = new THREE.Mesh (new THREE.PlaneGeometry(200,200), new THREE.MeshPhongMaterial({color:0xa6a090,side: THREE.DoubleSide}));
	scene.add (floorPY);
	floorPY.rotation.x = -Math.PI/2;
	
	
	/////////////////////////////////
	candles.push (new Candle(0, 10, Math.random() * 180 - 90,0xc983be,"a"));
	candles.push (new Candle(20, 10, Math.random() * 180 - 90,0xe8dc5d,"b"));
	candles.push (new Candle(-30, 10, Math.random() * 180 - 90,0x7ccccb,"c"));
    candles.push (new Candle(80, 10, Math.random() * 180 - 90,0xe87a58,"d"));
    candles.push (new Candle(-50, 10, Math.random() * 180 - 90,0x6fb38d,"e"));

	candles.forEach (function(b) {b.mesh.castShadow = true; b.mesh.receiveShadow = true;});
    floorPY.receiveShadow = true;

    for(var i = 0;i< candles.length;i++){
        pickables.push(candles[i].mesh);
    }
	
    window.addEventListener('resize', onWindowResize, false);
    raycaster = new THREE.Raycaster();
	mouseLoc = new THREE.Vector2();
	document.addEventListener ('pointerdown', doPointerDown, false);
};

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function doPointerDown (event) {
	event.preventDefault();
	
	mouseLoc.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouseLoc.y = -(event.clientY / window.innerHeight) * 2 + 1;
	
	raycaster.setFromCamera (mouseLoc, camera);
	var intersects = raycaster.intersectObjects (pickables);
	
    
	if (intersects.length > 0) {
	    if(intersects[0].object){
            
            
            if(intersects[0].object.name === "a"){
                clockA.elapsedTime = 0;
                lightA = true;
                
            
            }
            if(intersects[0].object.name === "b"){
                clockB.elapsedTime = 0;
                lightB = true;
                
            }
            if(intersects[0].object.name === "c"){
                clockC.elapsedTime = 0;
                lightC = true;
                
            }
            if(intersects[0].object.name === "d"){
                clockD.elapsedTime = 0;
                lightD = true;
                
            }
            if(intersects[0].object.name === "e"){
                clockE.elapsedTime = 0;
                lightE = true;
                
            }
            
		}
	} else {
		console.log ('nothing picked...');
	}
	
}
export function animate() {
	requestAnimationFrame (animate);
	renderer.render (scene, camera);
    var timeA = clockA.getElapsedTime();
    var timeB = clockB.getElapsedTime();
    var timeC = clockC.getElapsedTime();
    var timeD = clockD.getElapsedTime();
    var timeE = clockE.getElapsedTime();
    
	//candles.forEach (function(b) { b.textureAnimate();});
    for(var i = 0;i < candles.length;i++){
	   candles[i].mesh.lookAt(camera.position.x,0,camera.position.z);
    }
    if(lightA){
        //candles[0].wipe();
        if(timeA < 2){
            candles[0].mesh.children[0].power = 0;
            candles[0].mesh.children[1].visible = false;
        }
        else{
            candles[0].mesh.children[0].power = 10;
            candles[0].mesh.children[1].visible = true;
        }
            
    }
        
    if(lightB){
        //candles[1].wipe();
        if(timeB < 2){
            candles[1].mesh.children[0].power = 0;
            candles[1].mesh.children[1].visible = false;
        }
        else{
            candles[1].mesh.children[0].power = 10;
            candles[1].mesh.children[1].visible = true;
        }
        
        
    }
        
    if(lightC){
        //candles[2].wipe();
        if(timeC < 2){
            candles[2].mesh.children[0].power = 0;
            candles[2].mesh.children[1].visible = false;
        }
        else{
            candles[2].mesh.children[0].power = 10;
            candles[2].mesh.children[1].visible = true;
        }
    }
    if(lightD){
        //candles[3].wipe();
        if(timeD < 2){
            candles[3].mesh.children[0].power = 0;
            candles[3].mesh.children[1].visible = false;
        }
        else{
            candles[3].mesh.children[0].power = 10;
            candles[3].mesh.children[1].visible = true;
        }
    }
        
    if(lightE){
        //candles[4].wipe();
        if(timeE < 2){
            candles[4].mesh.children[0].power = 0;
            candles[4].mesh.children[1].visible = false;
        }
        else{
            candles[4].mesh.children[0].power = 10;
            candles[4].mesh.children[1].visible = true;
        }
            
    }
        
    
    
};

export { scene };
