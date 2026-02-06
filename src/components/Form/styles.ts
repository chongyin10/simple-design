import styled, { keyframes } from 'styled-components';

const getCSSVar = (property: string, fallback: string) => `var(${property}, ${fallback})`;

const slideDown = keyframes`
  from {
    opacity: 0;
    max-height: 0;
    padding-top: 0;
    padding-bottom: 0;
  }
  to {
    opacity: 1;
    max-height: 100px;
    padding-bottom: 4px;
  }
`;

export const FormWrapper = styled.form<{ $styles?: any }>`
  width: 100%;

  &.form-wrapper {
    /* 外部可通过 .form-wrapper 选择器覆盖样式 */
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

export const FormItemWrapper = styled.div<{ $layout: 'horizontal' | 'vertical' | 'inline'; $styles?: any }>`
  margin-bottom: ${getCSSVar('--form-item-margin-bottom', '24px')};

  &.form-item {
    /* 外部可通过 .form-item 选择器覆盖样式 */
  }

  ${({ $layout }) =>
    $layout === 'horizontal' &&
    `
      display: flex;
      align-items: center;

      & .form-label {
        margin-bottom: 0;
      }
    `
  }

  ${({ $layout }) =>
    $layout === 'inline' &&
    `
      display: inline-flex;
      align-items: center;
      margin-right: ${getCSSVar('--form-inline-item-margin-right', '24px')};
      margin-bottom: 0;

      & .form-label {
        margin-bottom: 0;
      }
    `
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

export const FormLabel = styled.label<{ $required?: boolean; $colon?: boolean; $labelAlign?: 'start' | 'center' | 'end'; $styles?: any }>`
  display: block;
  font-size: ${getCSSVar('--form-label-font-size', '14px')};
  color: ${getCSSVar('--form-label-color', '#333')};
  margin-bottom: ${getCSSVar('--form-label-margin-bottom', '8px')};
  white-space: nowrap;
  text-align: ${({ $labelAlign }) => $labelAlign || 'end'};

  &.form-label {
    /* 外部可通过 .form-label 选择器覆盖样式 */
  }

  &::after {
    content: ${({ $colon }) => ($colon ? '":"' : '')};
    margin: 0 8px 0 2px;
  }

  &::before {
    content: ${({ $required }) => ($required ? '"*"' : '""')};
    color: ${getCSSVar('--form-label-required-color', '#f5222d')};
    margin-right: 4px;
    display: inline-block;
    vertical-align: middle;
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

export const FormControl = styled.div<{ $styles?: any }>`
  width: 100%;
  position: relative;

  &.form-control {
    /* 外部可通过 .form-control 选择器覆盖样式 */
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

export const FormError = styled.div<{ $styles?: any }>`
  font-size: ${getCSSVar('--form-error-font-size', '12px')};
  color: ${getCSSVar('--form-error-color', '#f5222d')};
  line-height: 1.5;
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
  z-index: 10;

  &.form-error {
    /* 外部可通过 .form-error 选择器覆盖样式 */
  }

  &.form-error-visible {
    animation: ${slideDown} 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

export const FormHelp = styled.div<{ $styles?: any }>`
  font-size: ${getCSSVar('--form-help-font-size', '12px')};
  color: ${getCSSVar('--form-help-color', '#00000073')};
  line-height: 1.5;
  position: absolute;

  &.form-help {
    /* 外部可通过 .form-help 选择器覆盖样式 */
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;
