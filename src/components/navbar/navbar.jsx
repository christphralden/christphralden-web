import React, { useRef } from 'react';
import { NavbarRoutes } from '@lib/routes';
import { textGlitch } from '@lib/animations/text-effect';

export const Navbar = () => {
    const routeRefs = useRef([]);
    return (
        <nav className="fixed w-full h-20 flex justify-center">
            <div className="w-[90vw] h-full flex items-center justify-between z-10 bg-background gap-8">
                <div className="w-full flex justify-start gap-8 xl:gap-16">
                    {NavbarRoutes.map((routes, i) => {
                        const isActive = true;
                        return (
                            <a
                                key={i}
                                href={isActive ? "#" : routes.route[0]}
                                className={`uppercase cursor-pointer hover:underline underline-offset-4 flex text-nowrap items-center text-base`}
                            >
                                <p
                                    ref={(el) => (routeRefs.current[i] = el)} 
                                    onMouseEnter={() =>
                                        textGlitch({
                                            text: routes.name,
                                            duration: 50,
                                            glitch: 2,
                                            callbackFn: (newText) => {
                                                if (routeRefs.current[i]) {
                                                    routeRefs.current[i].innerText = newText;
                                                }
                                            },
                                        })
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