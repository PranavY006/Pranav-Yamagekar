import * as THREE from "three"
import Experience from "../Experience";
import Room from "./Room";
import Controls from "./Controls";
import Enviroment from "./Enviroment";
import Floor from "./Floor";
import  { EventEmitter } from "events";


export default class World extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;
        this.canvas = this.experience.canvas;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on("ready", () => {
            this.enviroment = new Enviroment();
            this.floor = new Floor();
            this.room = new Room(); 
            //this.controls = new Controls();
            this.emit("worldready");
        });
        
        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        });
    }
    switchTheme(theme){
        if(this.enviroment){
            this.enviroment.switchTheme(theme);
        }
    }

    resize(){
        
   }
   update(){
        if(this.room){
            this.room.update();
        }
        if(this.controls){
            this.controls.update();
        }
    }
}