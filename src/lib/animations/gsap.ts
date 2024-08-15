import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

class GsapProvider{
    readonly instance: any

    constructor(){
        this.instance = gsap
        this.instance.registerPlugin(ScrollTrigger)
    }

    registerEffects(){

    }
}

export const gsapProvider = new GsapProvider()

