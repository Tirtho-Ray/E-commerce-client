import { useEffect, useRef } from "react";
import { useLocation } from "react-router";


const ScrollManager: React.FC = () => {
    const location = useLocation();
    const positions = useRef<Map<string, number>>(new Map());
    const pathnameRef = useRef(location.pathname);

    useEffect(() => {

        const saved = positions.current.get(location.pathname);
        if (saved !== undefined) {
            window.scrollTo({ top: saved, behavior: "auto" });
        } else {
            window.scrollTo({ top: 0, behavior: "auto" });
        }


        pathnameRef.current = location.pathname;

        const onScroll = () => {

            positions.current.set(pathnameRef.current, window.scrollY);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [location.pathname]);

    useEffect(() => {
        const onBeforeUnload = () => {
            positions.current.forEach((value, key) => {
                sessionStorage.setItem(`scrollPos:${key}`, String(value));
            });
        };


        const restoreFromStorage = () => {
            try {
                positions.current = new Map(
                    Object.entries(sessionStorage)
                        .filter(([k]) => k.startsWith("scrollPos:"))
                        .map(([k, v]) => [k.replace("scrollPos:", ""), Number(v)])
                );
            } catch {
                // ignore
            }
        };

        restoreFromStorage();
        window.addEventListener("beforeunload", onBeforeUnload);
        return () => window.removeEventListener("beforeunload", onBeforeUnload);
    }, []);

    return null;
};

export default ScrollManager;
