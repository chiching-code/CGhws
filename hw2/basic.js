import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import {initObject, initLight,truck,rect,Obstacle} from './mesh.js';
import {update,makeRect,Check_Intersect,objectCopy,pos,angle} from './move.js';

var camera, scene, renderer;
var clock; 
var cameraHUD1; 

var state;

export function init() {
    
    clock = new THREE.Clock();
    scene = new THREE.Scene();
    
    cameraHUD1 = new THREE.OrthographicCamera(-150,150,150,-150,-350,350);
    cameraHUD1.position.set (0,30,0)
    cameraHUD1.up.set (0,0,-1)   // for top view
    cameraHUD1.lookAt (new THREE.Vector3())
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x888888);
   
    
    document.body.appendChild(renderer.domElement);

 
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set (0,200,250);
    let controls = new OrbitControls(camera, renderer.domElement);
    

    var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
    scene.add(gridXZ);
    ///////////////////////////////////////////////////////
    //power = 5.0;
    //angle = 0.0; 
    ///////////////////////////////////////////////////////
    scene.obstacles = [];
    scene.obstacles.push(
        new Obstacle(new THREE.Vector3(50, 0, 50), 15)
    );
    scene.obstacles.push(
        new Obstacle(new THREE.Vector3(-70, 0, 40), 15)
    );
    scene.obstacles.push(
        new Obstacle(new THREE.Vector3(0, 0, -60), 15)
    );
    initObject();
    initLight();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}





export function animate() {

    var dt = clock.getDelta();
    update(dt);
    
    truck.position.copy(pos);
    truck.rotation.y = angle;
    
    requestAnimationFrame(animate);
    render();
    
    let Rect = makeRect(rect);
    for(var i = 0;i < scene.obstacles.length;i++){
        
        if (Check_Intersect (Rect, scene.obstacles[i].mesh, 15)) {
            scene.obstacles[i].mesh.material.color = new THREE.Color ('red');
            state = 1;
        } else {
            scene.obstacles[i].mesh.material.color = new THREE.Color ('pink');  
            state = 0;
        }
    }
    
}

function render() {
    var ww = window.innerWidth;
    var hh = window.innerHeight;
    renderer.setScissorTest( true );

    renderer.setViewport(0, 0, ww, hh);
    renderer.setScissor(0, 0, ww, hh);
    renderer.clear();

    renderer.setViewport(0, 0, ww/2, hh);
    renderer.setScissor(0, 0, ww/2, hh);
    renderer.render(scene, camera);
    renderer.setViewport(ww/2, 0, ww/2,hh);
    renderer.setScissor(ww/2, 0, ww/2, hh);
    renderer.render(scene, cameraHUD1);

    renderer.setScissorTest( false );
}

export {scene, truck,cameraHUD1,state};