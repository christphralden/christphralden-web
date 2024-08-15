import React, { useCallback, useRef, useState, useEffect} from 'react';
import { NavbarRoutes } from '@lib/routes';
import { textGlitch } from '@lib/animations/text-effect';

export const Navbar = () => {
    const routeRefs = useRef([]);

    const handleMouseEnter = useCallback((text, index) => {
        textGlitch({
            text: text,
            duration: 50,
            glitch: 2,
            callbackFn: (newText) => {
                if (routeRefs.current[index]) {
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
        <nav className="fixed w-full h-20 flex justify-center">
            <div className="w-[90vw] h-full flex items-center justify-between z-10 bg-background gap-8">
                <div className="w-full flex justify-start gap-8 xl:gap-16">
                    {NavbarRoutes.map((routes, i) => {
                        const isActive = current == routes.route
                        return (
                            <a
                                key={i}
                                href={isActive ? "#" : routes.route[0]}
                                className={`${isActive && 'underline'} uppercase cursor-pointer hover:underline underline-offset-4 flex text-nowrap items-center text-base`}
                            >
                                <p
                                    ref={(el) => (routeRefs.current[i] = el)} 
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