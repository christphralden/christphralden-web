import { useCallback, useRef, useState, useEffect} from 'react';
import { NavbarRoutes } from '@lib/routes';
import { textGlitch } from '@lib/animations/text-effect';
import { AtSign } from '@geist-ui/icons'

export const Navbar = () => {
    const routeRefs = useRef<HTMLParagraphElement[] | null>([]);

    const handleMouseEnter = useCallback((text:string, index:number) => {
        textGlitch({
            text: text,
            duration: 50,
            glitch: 2,
            callbackFn: (newText) => {
                if (routeRefs.current) {
                    routeRefs.current[index].innerText = newText;
                }
            },
        });
    }, []); 

    const [current, setCurrent] = useState('')

    useEffect(() => {
        if(window){
            setCurrent(window.location.pathname)
        }
    }, [])
    
    return (
        <nav className="fixed w-full h-20 flex justify-center px-16 bg-background z-[100]">
            <div className="w-full h-full flex gap-16 items-center justify-between">
                <div className='aspect-square bg-[#0000ff]'>
                    <AtSign color='transparent'/>
                </div>
                <div className="w-full flex justify-start gap-8 xl:gap-16">
                    {NavbarRoutes.map((routes, i) => {
                        const isActive = current == routes.route[0]
                        return (
                            <a
                                key={i}
                                href={isActive ? "#" : routes.route[0]}
                                className={`${isActive && 'underline text-[#0000ff]'} uppercase cursor-pointer hover:underline underline-offset-4 flex text-nowrap items-center text-base`}
                            >
                                <p
                                    ref={(el) =>{
                                        if(routeRefs.current){
                                            routeRefs.current[i] = el as HTMLParagraphElement
                                        }
                                    }} 
                                    onMouseEnter={() =>
                                        handleMouseEnter(routes.name, i)
                                    }
                                >
                                    {routes.name}
                                </p>
                            </a>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
};