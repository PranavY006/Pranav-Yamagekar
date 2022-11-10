import  { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap"
import convert from "./Utils/convertDivsToSpans";

export default class Preloader extends EventEmitter{
    constructor(){
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources; 
        this.camera = this.experience.camera;
        this.world = this.experience.World;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice" , (device) =>{

        })

        this.world.on("worldready", () => {
            this.setAssets();
            this.playIntro();
        })
    }

    setAssets(){
        convert(document.querySelector(".intro-text"))
        convert(document.querySelector(".hero-main-title"))
        convert(document.querySelector(".hero-main-description"))
        convert(document.querySelector(".hero-secound-subheading"))
        convert(document.querySelector(".second-sub"))
            this.room = this.experience.World.room.actualroom;
            this.roomChildren = this.experience.World.room.roomChildren;
    }

    firstIntro(){
        return new Promise ((resolve)=>{
            this.timeline = new GSAP.timeline();
            this.timeline.set(".animatedis", {
                y: 0,
                yPercent: 100})
            this.timeline.to(".preloader",{
               opacity: 0,
               delay: 1,
               onComplete: () =>{
                document.querySelector(".preloader").classList.add("hidden");
               },
            })
            if(this.device === "desktop") {
            this.timeline.to(this.roomChildren.cube.scale,{
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.5)",
                duration: 1,
            }).to(this.room.position,{
                x: -1,
                ease: "power1.out",
                duration: 1,
            })
        }else{
            this.timeline.to(this.roomChildren.cube.scale,{
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out(2.5)",
                duration: 0.7,
            }).to(this.room.position,{
                x: -1,
                ease: "power1.out",
                duration: 0.7,
            })
      }
      this.timeline.to(".intro-text .animatedis" , {
        yPercent: 0,
        stagger: 0.05,
        ease: "back.out(1.7)",
      })
      .to(".arrow-svg-wrapper" , {
        opacity:1,
        onComplete:resolve,
      }, "same")
      .to(".toggle-bar", {
        opacity:1,
        
      }, "same")
    })
      
    }
    secondIntro(){
        return new Promise ((resolve)=>{

        this.secondTimeline = new GSAP.timeline();

            this.secondTimeline
            .to(".intro-text .animatedis" , {
                yPercent: 100,
                stagger: 0.05,
                ease: "back.in(1.7)",
            },"fade")
            .to(".arrow-svg-wrapper" , {
                opacity:0,
            }, "fade")
            .to(this.room.position,{
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
            }, "same")

            .to(this.roomChildren.cube.rotation, {
                y: 2 * Math.PI + Math.PI / 4,
            }, "same")

            .to(this.roomChildren.cube.scale, { 
                x: 5,
                y: 5, 
                z: 5,
            }, "same")

            .to(this.camera.OrthographicCamera.position,{
                y: 3.5,
            }, "same")
            .to(this.roomChildren.cube.position,{
                x: 0.003955,
                y: 4.60041,
                z: -0.244927, 
            }, "same")

            .set(this.roomChildren.body.scale,{
                x: 1,
                y: 1,
                z: 1,
            })
            .to(this.roomChildren.cube.scale,{
                x: 0,
                y: 0,
                z: 0,
                duration: 1,
            }, "intro-text")
            .to(".hero-main-title .animatedis" , {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",

            }, "intro-text")
            .to(".hero-main-description .animatedis" , {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",

            }, "intro-text")
            .to(".hero-secound-subheading .animatedis" , {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",

            }, "intro-text")
            .to(".second-sub .animatedis" , {
                yPercent: 0,
                stagger: 0.07,
                ease: "back.out(1.7)",

            },"intro-text")
            .to(this.roomChildren.fishtank.scale , {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.5")
            .to(this.roomChildren.clock.scale , {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.4").to(this.roomChildren.shelf.scale , {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.3").to(this.roomChildren.floor_items.scale , {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.2").to(this.roomChildren.desks.scale , {
                x: 1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.1").to(this.roomChildren.table_stuff.scale , {
                x: 1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            },">-0.1").to(this.roomChildren.monitor.scale , {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }).set(this.roomChildren.mini_floor.scale,{
                x:1,
                y:1,
                z:1,
            }).to(this.roomChildren.fish.scale , {
                x:1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }, "chair").to(this.roomChildren.chair.scale , {
                x: 1,
                y:1,
                z:1,
                ease: "back.out(2.2)",
                duration: 0.5,
            }, "chair").to(this.roomChildren.chair.rotation , {
                y: 6.9,
                ease: "power2.out",
                duration: 1,
            })
            .to(".arrow-svg-wrapper" , {
                opacity: 1,
                onComplete: resolve,
            });
    });
}
    onScroll(e){
        if(e.deltaY > 0){
            this.removeEventListeners();
            this.playSecondIntro();
        }
    }
    
    onTouch(e) {
        this.initalY = e.touches[0].clientY;
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initalY - currentY;
        if (difference > 0) {
            console.log("swipped up");
            this.removeEventListeners();
            this.playSecondIntro();
        }
        this.intialY = null;
    }

    removeEventListeners() {
        window.removeEventListener("wheel", this.scrollOnceEvent);
        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    }
async playIntro() {
    this.scaleFlag = true;
        await this.firstIntro();
        this.moveFlag = true;
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove" , this.touchMove) ;
 }
async  playSecondIntro(){
        this.moveFlag = false;
       await this.secondIntro();
       this.scaleFlag = false;
       this.emit("enablecontrols"); 
    }

    move(){
        if(this.device === "desktop") {
            this.room.position.set(-1,0,0);
        } else {
            this.room.position.set(0,0,-1);
        }
    }

    scale(){
        this.roomChildren.rectLight.width = 0;
        this.roomChildren.rectLight.height = 0;

        if(this.device === "desktop") {
            this.room.scale.set(0.2,0.2,0.2);
        } else {
            this.room.scale.set(0.17,0.17,0.17);
        }
    }
    update(){
        if(this.moveFlag){
        this.move();
        }

        if(this.scaleFlag){
            this.scale();
        }
    }

} 