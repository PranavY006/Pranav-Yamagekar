import * as THREE from "three"
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


export default class Camera{
    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.CreatePerspectiveCamera();
        this.CreateOrthographicCamera();
        this.setOrbitcontrols();
    }

    CreatePerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35,
            this.sizes.aspect,
            0.1,
            1000,
            );
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 29;
        this.perspectiveCamera.position.y = 14;
        this.perspectiveCamera.position.z = 12;
    }

    CreateOrthographicCamera() {
    
        this.OrthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum/2,
            -this.sizes.frustrum/2, 
            -50,
            50  
            
        );

        this.OrthographicCamera.position.y = 2.5;  //3.5
        this.OrthographicCamera.position.z = 5;
        this.OrthographicCamera.rotation.x = -Math.PI /6 ;

        this.scene.add(this.OrthographicCamera);

    // this.helper = new THREE. CameraHelper (this.OrthographicCamera);
    // this.scene. add (this.helper);`

    // const size = 20;
    //const divisions = 20;

    //const gridHelper = new THREE. GridHelper (size, divisions);
    // this. scene.add(gridHelper);`

    // const axesHelper = new THREE.AxesHelper (10);
    //this.scene.add(axesHelper);`
    }

    setOrbitcontrols(){
        this.controls = new OrbitControls(this.perspectiveCamera,this.canvas)
        this.controls.enableDamping = true;
        this.controls.enableZoom = false;
    }
    resize(){
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.OrthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/2;
        this.OrthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/2;
        this.OrthographicCamera.top = this.sizes.frustrum/2;
        this.OrthographicCamera.bottom = -this.sizes.frustrum/2;
        this.OrthographicCamera.updateProjectionMatrix();
    }
    update(){
        this.controls.update(); 

       //this.helper.matrixWorldNeedsUpdate = true;
        //this.helper.update();
        //this.helper.position.copy(this.OrthographicCamera.position);
        //this.helper.rotation.copy(this.OrthographicCamera.rotation);`
    }
}