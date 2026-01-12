import React from 'react';
import { CopyToClipboardProps } from './types';
import useCopy from '../Hooks/useCopy';
import './CopyToClipboard.css';

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
    url,
    onCopyStatusChange,
    children
}) => {

    const copyFunction = useCopy();

    const handleCopy = async () => {
        try {
            await copyFunction(url);
            onCopyStatusChange?.('success');
        } catch (error) {
            onCopyStatusChange?.("error");
        }
    };

    return (
        <span
            style={{ margin: '0px', padding: '0px' }}
            onClick={handleCopy}
        >
            {children}
        </span>
    );
};

export default CopyToClipboard;
export const useOnCopy = useCopy;
