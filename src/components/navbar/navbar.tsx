import { useCallback, useRef, useState, useEffect } from 'react';
import { NavbarRoutes } from '@lib/routes';
import { textGlitch } from '@lib/animations/text-effect';
import { AtSign } from '@geist-ui/icons';
import Separator from '@components/ui/separator.astro';

export const Navbar = () => {
    const routeRefs = useRef<HTMLParagraphElement[]>([]);

    const handleMouseEnter = useCallback((text: string, index: number) => {
        textGlitch({
            text: text,
            duration: 50,
            glitch: 2,
            callbackFn: (newText) => {
                const currentRef = routeRefs.current[index];
                if (currentRef) {
                    try{
                        currentRef.innerText = newText;
                    }catch(e){
                        console.warn('Dont worry about this :)')
                    }
                } else {
                    console.error(`Element at index ${index} not found.`);
                }
            },
        });
    }, []);

    const [current, setCurrent] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrent(window.location.pathname);
        }
    }, []);

    return (
        <nav className="fixed w-full h-14 flex justify-center px-4 md:px-8 xl:px-16 bg-background z-[100] border-b-[1px] border-black">
            <div className="w-full h-full flex gap-8 xl:gap-16 items-center justify-between">
                <div className='aspect-square bg-[#0000ff]'>
                    <AtSign color='transparent'/>
                </div>
                <div className="flex-1 flex justify-evenly gap-4 md:gap-8 xl:gap-16">
                    {NavbarRoutes.map((routes, i) => {
                        const isActive = current === routes.route[0];
                        return (
                            <a
                                key={i}
                                href={isActive ? "#" : routes.route[0]}
                                className={`${isActive && 'underline text-[#0000ff]'} uppercase cursor-pointer hover:underline underline-offset-4 flex text-nowrap items-center text-base p-4`}
                            >
                                <p
                                    ref={(el) => {
                                        if (el) {
                                            routeRefs.current[i] = el;
                                        }
                                    }}
                                    onMouseEnter={() =>
                                        handleMouseEnter(routes.name, i)
                                    }
                                    className='no-select'
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