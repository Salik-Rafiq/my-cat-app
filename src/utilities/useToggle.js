import { useCallback, useState } from 'react';

const useToggle = (initialState = false) => {
    const [state, setstate] = useState(initialState);

    const toggle = useCallback(() => setstate(state => !state), []);

    return [state, toggle, toggle];
}

export default useToggle;