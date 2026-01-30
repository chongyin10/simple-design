import styled from 'styled-components';

export const LabelWrapper = styled.label`
    background-color: #f5f5f5;
    padding: 8px;
    padding-right: var(--label-padding-right, 8px);
    border-radius: 4px;
    position: relative;
    display: inline-flex;
    align-items: center;
    
    &::after {
        content: ' ';
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: var(--label-indicator-width, 3px);
        height: var(--label-indicator-height, 100%);
        background-color: var(--label-indicator-color, blue);
        border-radius: 2px;
    }
`;
