import * as THREE from "three"

import EventEmitter from "events";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader"
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader"
import Experience from "../Experience";
import Renderer from "../Renderer";

export default class Resources extends EventEmitter{
    constructor(assets){
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;
       
        this.assets = assets;
        
        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }
    
    setLoaders(){
        this.loaders = {};
        this.loaders.GLTFLoader = new GLTFLoader();
        this.loaders.DRACOLoader = new DRACOLoader();
        this.loaders.DRACOLoader.setDecoderPath("/draco/");
        this.loaders.GLTFLoader.setDRACOLoader(this.loaders.DRACOLoader);

    }
    startLoading(){
        for(const assets of this.assets){
            if (assets.type === "glbModel"){
                this.loaders.GLTFLoader.load(assets.path, (file)=>{
                    this.singleAssetLoaded(assets, file);
                });
            }else if (assets.type === "videoTexture"){
                this.video = {};
                this.videoTexture = {};

                this.video[assets.name] = document.createElement("video");
                this.video[assets.name].src = assets.path;
                this.video[assets.name].muted = true;
                this.video[assets.name].playInline = true;
                this.video[assets.name].autoplay = true;
                this.video[assets.name].loop = true;
                this.video[assets.name].play();
                
                this.videoTexture[assets.name] = new THREE.VideoTexture(
                    this.video[assets.name]
                );
                this.videoTexture[assets.name].flipX = true;
                this.videoTexture[assets.name].minFilter = THREE.NearestFilter;
                this.videoTexture[assets.name].magFilter = THREE.NearestFilter;
                this.videoTexture[assets.name].generateMipmaps = false;
                this.videoTexture[assets.name].encoding = THREE.sRGBEncoding;

                this.singleAssetLoaded(assets,this.videoTexture[assets.name]);
            }
        }
    }

    singleAssetLoaded(assets, file){
        this.items[assets.name] = file;
        this.loaded++;

        if(this.loaded === this.queue) {
            this.emit("ready");
        }

    }

}