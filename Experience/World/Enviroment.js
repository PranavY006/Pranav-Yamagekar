import * as THREE from "three"
import Experience from "../Experience";
import GSAP from "gsap"


export default class Enviroment{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        
        this.setSunlight();
    }

    setSunlight() {
        this.sunlight = new THREE.DirectionalLight("#ffffff", 3 );
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(2048,2048);
        this.sunlight.shadow.normalBias = 0.05;
        this.sunlight.position.set(-1.5,7,3);
        this.scene.add(this.sunlight);

        this.ambiantLight = new THREE.AmbientLight("#ffffff",1);
        this.scene.add(this.ambiantLight);


    }
    switchTheme(theme){
       if(theme === "dark"){
        GSAP.to(this.sunlight.color, {
            r: 0.17254901960784313,
            g: 0.23137254901960785, 
            b: 0.6862745098039216,
        });
        GSAP.to(this.ambiantLight.color, {
            r: 0.17254901960784313,
            g: 0.23137254901960785, 
            b: 0.6862745098039216,
        });
        GSAP.to(this.ambiantLight,{
            intensity: 0.78,
        });
        GSAP.to(this.sunlight,{
            intensity: 0.78,
        });
       }else{
        GSAP.to(this.sunlight.color, {
            r: 255 / 255,
            g: 255 / 255, 
            b: 255 / 255,
        });
        GSAP.to(this.ambiantLight.color, {
            r: 255 / 255,
            g: 255 / 255, 
            b: 255 / 255,
        });
        GSAP.to(this.ambiantLight,{
            intensity: 3,
        }); 
        GSAP.to(this.ambiantLight,{
            intensity: 1, 
        });      
       }
    }

    resize(){
        
   }
   update(){
    
    }
}