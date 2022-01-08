import { useLayoutEffect } from 'react';

const usePageTitle = (title) => {
    useLayoutEffect(() => {
        if (title) {
            document.title = title;
        } else {
            document.title = 'GlassShop - A eye wear shop';
        }
    }, [title]);
};

export default usePageTitle;
