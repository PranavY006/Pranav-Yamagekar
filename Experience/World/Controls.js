import * as THREE from "three"
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ASScroll from "@ashthornton/asscroll";



export default class Controls {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.World.room.actualroom;
        this.room.children.forEach((child) => {
            if (child.type === "RectAreaLight") {
                this.rectLight = child;
            }
        }); 

        this.circleFirst = this.experience.World.floor.circleFirst;
        this.circleSecond = this.experience.World.floor.circleSecond;
        this.circleThird = this.experience.World.floor.circleThird;

        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";
        
        this.setSmoothScroll();
        this.setscrollTrigger();
    }

    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            //ease: 0.3,
            disableRaf: true });
      
      
        GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
      }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }

    setscrollTrigger(){
        ScrollTrigger.matchMedia({
            //desktop 
            "(min-width: 969px)": () => {
                //console.log("Dekstop");

                this.room.scale.set(0.2,0.2,0.2)
                this.rectLight.width = 0.69;
                this.rectLight.height = 0.96;
                
                //first section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0014;
                    },
                });

            /*Secound Setion*/ 

            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".secound-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    //invalidateOnRefresh: true,
                },
            })
            .to(this.room.position, {
                x: () => {
                    return 1 ;
                },
                z:()=>{
                    return this.sizes.height * 0.0032;
                }
            }, "same")
            .to(this.room.scale, {
                x: 0.8,
                y:0.8,
                z: 0.8,
            }, "same")
            .to(this.rectLight, {
                width: 0.69 * 4,
                height: 0.96 * 4,
            }, "same");

            /* Third section */
            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            })
            .to(this.camera.OrthographicCamera.position, {
                x: -2.5,
                y: -0.69,
            });

        },

            //mobile
            "(max-width: 968px)": () => {
            //console.log("mobile");

            //reset
            this.room.scale.set(0.17,0.17,0.17);
            this.room.position.set(0,0,0)
            this.rectLight.width = 0.36
            this.rectLight.height = 0.69
                //first section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.room.scale,{
                    x: 0.2,
                    y: 0.2,
                    z: 0.2,
                })
                 /*Secound Setion*/
                this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".secound-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                 },
                }).to(this.room.scale,{
                    x: 0.35,
                    y: 0.35,
                    z: 0.35,
                }, "same").to(this.rectLight, {
                    width: 0.69 * 3.4,
                    height: 0.96 * 3.4,
                }, "same").to(this.room.position, {
                    x:1.5,
                }, "same")

                /* Third section */
                 this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                },
            });
            },
            // all
            all: () => {
                this.sections = document.querySelectorAll(".section");
                    this.sections.forEach((section) => {
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");
                    
                    if (section.classList.contains("right")){
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                        
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                             
                                scrub: 0.6,
                            },
                        });
                    }else{
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger:{
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                        
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger:{
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                             
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        }
                    })
                });

                //circle Animation OR ALL animation
                this.firstCircle = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                }).to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                }) 

            /*Secound Setion*/ 

            this.secondCircle = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".secound-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    //invalidateOnRefresh: true,
                },
            }).to(this.circleSecond.scale, {
                x: 3,
                y: 3,
                z: 3,
            }, "same").to(this.room.position, {
                y: 0.3,
            }, "same"); 
            
            /* Third section */
            this.thirdCircle = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                },
            }).to(this.circleThird.scale, {
                x: 3,
                y: 3,
                z: 3,
            })

                // mini platform animation

                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "center center",
                },
            });

            this.room.children.forEach((child) => {
                if(child.name === "Mini_Floor"){
                    this.first = GSAP.to(child.position, {
                        x: -2.73327,
                        z: 5.83746, 
                        duration: 0.3,
                    });
                }
                if(child.name === "Mail_Box"){
                    this.secound = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2)", 
                        duration: 0.3,
                    });
                }
                if(child.name === "Lamp"){
                    this.third = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2)", 
                        duration: 0.3,
                    });
                }
                if(child.name === "floor_1"){
                    this.fourth = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2)", 
                        duration: 0.3,
                    });
                }
                if(child.name === "floor_2"){
                    this.fifth = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2)", 
                        duration: 0.3,
                    });
                }
                if(child.name === "floor_3"){
                    this.sixth = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2)", 
                        duration: 0.3,
                    });
                }
                if(child.name === "Dirt"){
                    this.seventh = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2)", 
                        duration: 0.3,
                    });
                }
                if(child.name === "Flower_1"){
                    this.eighth = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2)", 
                        duration: 0.3,
                    });
                }
                if(child.name === "Flower_2"){
                    this.ninth = GSAP.to(child.scale, {
                        x: 1,
                        y: 1,
                        z: 1,
                        ease: "back.out(2)", 
                        duration: 0.3,
                    });
                }
            });
            this.secondPartTimeline.add(this.first);
            this.secondPartTimeline.add(this.secound);
            this.secondPartTimeline.add(this.third);
            this.secondPartTimeline.add(this.fourth, "-=0.2");
            this.secondPartTimeline.add(this.fifth, "-=0.2");
            this.secondPartTimeline.add(this.sixth, "-=0.2");
            this.secondPartTimeline.add(this.seventh, "-=0.2");
            this.secondPartTimeline.add(this.eighth);
            this.secondPartTimeline.add(this.ninth, "-=0.2");

            },
        });
    }

    resize(){

    }
   update(){
    
    }
}