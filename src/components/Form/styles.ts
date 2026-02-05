import styled from 'styled-components';

const getCSSVar = (property: string, fallback: string) => `var(${property}, ${fallback})`;

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
    $layout === 'inline' &&
    `
      display: inline-flex;
      align-items: center;
      margin-right: ${getCSSVar('--form-inline-item-margin-right', '24px')};
      margin-bottom: 0;
    `
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

export const FormLabel = styled.label<{ $required?: boolean; $colon?: boolean; $styles?: any }>`
  display: block;
  font-size: ${getCSSVar('--form-label-font-size', '14px')};
  color: ${getCSSVar('--form-label-color', '#333')};
  margin-bottom: ${getCSSVar('--form-label-margin-bottom', '8px')};
  white-space: nowrap;

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
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

export const FormControl = styled.div<{ $styles?: any }>`
  width: 100%;

  &.form-control {
    /* 外部可通过 .form-control 选择器覆盖样式 */
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

export const FormError = styled.div<{ $styles?: any }>`
  font-size: ${getCSSVar('--form-error-font-size', '12px')};
  color: ${getCSSVar('--form-error-color', '#f5222d')};
  padding: ${getCSSVar('--form-error-padding', '4px 0')};
  line-height: 1.5;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  &.form-error {
    /* 外部可通过 .form-error 选择器覆盖样式 */
  }

  &.form-error-visible {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;

export const FormHelp = styled.div<{ $styles?: any }>`
  font-size: ${getCSSVar('--form-help-font-size', '12px')};
  color: ${getCSSVar('--form-help-color', '#00000073')};
  padding: ${getCSSVar('--form-help-padding', '4px 0')};
  line-height: 1.5;

  &.form-help {
    /* 外部可通过 .form-help 选择器覆盖样式 */
  }

  ${({ $styles }) => $styles && Object.entries($styles).map(([key, value]) => `${key}: ${value};`).join('\n')}
`;
