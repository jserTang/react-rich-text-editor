import { useEffect, useRef } from 'react';

export const useClickContainTarget = (
    target: Array<HTMLElement | string | null> | HTMLElement | string | null,
    callback: (contain: boolean) => void
) => {
    const cbRef = useRef(callback);
    cbRef.current = callback;
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (Array.isArray(target)) {
                return cbRef.current(
                    target.some((t) => {
                        const el = typeof t === 'string' ? document.querySelector(t) : t;
                        return !!el && el.contains(event.target as Node);
                    })
                );
            }

            const el = typeof target === 'string' ? document.querySelector(target) : target;
            if (el) {
                cbRef.current(el.contains(event.target as Node));
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [target]);
};
