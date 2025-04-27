import React from 'react';
import { LoaderIcon } from 'lucide-react';

const Loader: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <LoaderIcon className='text-white' />
        </div>
    );
};

export default Loader;