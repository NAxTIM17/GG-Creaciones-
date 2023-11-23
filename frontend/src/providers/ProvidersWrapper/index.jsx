import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

const ProvidersWrapper = ({ children }) => {
    return (
        <NextUIProvider>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </NextUIProvider>

    )
};

export default ProvidersWrapper;
