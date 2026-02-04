import { useMemo } from 'react';

function useWorkSpace() {

    const pathname = window.location.pathname;

    const useIsWorkspace = useMemo(() => {
        if (pathname.indexOf('workspace') == -1) {
            return false
        } else {
            return true;
        }
    }, [pathname]);

    return useIsWorkspace;
}

export default useWorkSpace;