import * as THREE from "three"
import Experience from "../Experience";
import GSAP from "gsap";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';



export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualroom = this.room.scene;
        this.roomChildren = {}

        this.setModel();
        this.setAnimation();
        this.onMouseMove();

        this.lerp = {
            current: 0,
            target: 0,
            ease:0.1,
        }
    }

    setModel() {
        this.actualroom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            if(child.name ==="FishTank") {
                child.children[6].material = new THREE.MeshPhysicalMaterial();
                child.children[6].material.roughness = 0;
                child.children[6].material.color.set(0x549dd2);
                child.children[6].material.ior = 3;
                child.children[6].material.transmission = 1;
                child.children[6].material.opacity = 1;
            }
            if(child.name === "Monitor") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }
            if(child.name === "Mini_Floor"){
                child.position.x = -0.673447 ;
                child.position.z = 4.00651 ;
            }
            /*if(child.name === "Mail_Box" ||
                child.name === "floor_1" ||
                child.name === "floor_2" || 
                child.name === "floor_3" ||
                child.name === "Dirt" ||
                child.name === "Flower_1" ||
                child.name === "Flower_2" ||
                child.name === "Lamp")
                {
                child.scale.set(0,0,0);
            }*/

            child.scale.set(0,0,0);
            if (child.name ==="Cube"){
                //child.scale.set(1,1,1); 
                child.position.set(0,0,0);
                child.rotation.y = Math.PI / 4;  
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });

        const width = .69;
        const height = .96;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight( 0xffffff, intensity,  width, height );
        rectLight.position.set(3.86397, 3.69, -0.940949 );
        rectLight.rotation.x = -Math.PI /2;
        rectLight.rotation.z = Math.PI /4;
        this.actualroom.add( rectLight );

        this.roomChildren['rectLight'] = rectLight;

        //const rectLightHelper = new RectAreaLightHelper( rectLight );
        //rectLight.add( rectLightHelper );

        this.scene.add(this.actualroom);
        this.actualroom.scale.set(0.2,0.2,0.2);

    }
    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualroom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();
    }

    onMouseMove(){
            window.addEventListener("mousemove" , (e) => {
                this.rotation = ((e.clientX - window.innerWidth / 2) * 2) /window.innerWidth;
                this.lerp.target = this.rotation*0.1;
            })
    };

    resize(){
        
   }
   update(){
    this.lerp.current = GSAP.utils.interpolate(
        this.lerp.current,
        this.lerp.target,
        this.lerp.ease,
    );
    this.actualroom.rotation.y = this.lerp.current;
        this.mixer.update(this.time.delta * 0.00069);
       
    }
}