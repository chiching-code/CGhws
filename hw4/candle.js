import * as THREE from "https://threejs.org/build/three.module.js";
import { scene } from './main.js';

export class Candle {
    constructor (x,y,z,myColor,name) {
        this.pos = new THREE.Vector3(x,y,z);
        this.mesh = new THREE.Mesh (new THREE.CylinderGeometry(5,5,20,32), new THREE.MeshPhongMaterial({color:myColor}));
        this.mesh.name = name;
        this.light = new THREE.PointLight( 0xffffff, 1, 50 );
        this.light.position.y = 18;
        
        let loader = new THREE.TextureLoader();
		loader.crossOrigin = "";
		let texture = loader.load(
			"flame.png"
		);

        var texMat = new THREE.MeshBasicMaterial({
                map: texture,
                alphaTest:0.5
        });
        var flameMesh = new THREE.Mesh(new THREE.PlaneGeometry(30,30), texMat);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set (1/3,1/3);
        texture.offset.set (0,2/3);
        flameMesh.position.y = 18;
        this.flame = flameMesh;
        this.mesh.add(this.light,this.flame);
        scene.add (this.mesh);
        this.mesh.position.copy(this.pos);
        this.flameInterval = setInterval (this.textureAnimate.bind(this), 100);

    }
    
    
    textureAnimate() {
        this.count = (this.count === undefined) ? 1 : this.count;

        if (this.flame!== undefined) {
            var texture = this.flame.material.map;
            texture.offset.x += 1/3;

            if (this.count % 3 === 0) {
                texture.offset.y -= 1/3;
            }
            this.count++;
        }
    }

    
   

}

export {  };
