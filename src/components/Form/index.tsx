import React, { useState, useContext, createContext, useCallback, useRef, useEffect } from 'react';
import { FormProps, FormItemProps, FormContextType, FormInstance, Rule } from './types';
import { FormWrapper, FormItemWrapper, FormLabel, FormControl, FormError, FormHelp } from './styles';
import './Form.css';

const FormContext = createContext<FormContextType | null>(null);

export const useForm = (): FormInstance => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a Form component');
  }

  const formInstance: FormInstance = {
    getFieldValue: context.getFieldValue,
    getFieldsValue: (names?: string[]) => {
      if (!names) return context.values;
      const result: Record<string, any> = {};
      names.forEach(name => {
        result[name] = context.values[name];
      });
      return result;
    },
    setFieldValue: context.setFieldValue,
    setFieldsValue: context.setFieldValueList,
    resetFields: context.resetFields,
    validateFields: context.validateFields,
    submit: () => {
      context.validateFields().then(() => {
        const formElement = document.querySelector('form');
        if (formElement) {
          formElement.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      });
    }
  };

  return formInstance;
};

const Form: React.FC<FormProps> & { Item: typeof FormItem } = ({
  children,
  className = '',
  style,
  layout = 'horizontal',
  labelCol = 5,
  wrapperCol = 19,
  initialValues = {},
  onFinish,
  onFinishFailed,
  colon = true,
  requiredMark = true,
  styles
}) => {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const itemsRef = useRef<Map<string, any>>(new Map());

  const setFieldValue = useCallback((name: string, value: any) => {
    setValues(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  const getFieldValue = useCallback((name: string) => {
    return values[name];
  }, [values]);

  const setFieldValueList = useCallback((newValues: Record<string, any>) => {
    setValues(prev => ({ ...prev, ...newValues }));
    Object.keys(newValues).forEach(name => {
      if (errors[name]) {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    });
  }, [errors]);

  const validateField = useCallback(async (name: string) => {
    const item = itemsRef.current.get(name);
    if (!item) return;

    const { rules, value } = item;
    if (!rules || rules.length === 0) return;

    for (const rule of rules) {
      if (rule.required && (value === undefined || value === null || value === '')) {
        const errorMessage = rule.message || `${name} is required`;
        setErrors(prev => ({ ...prev, [name]: errorMessage }));
        return;
      }

      if (rule.pattern && !rule.pattern.test(value)) {
        const errorMessage = rule.message || `${name} format is invalid`;
        setErrors(prev => ({ ...prev, [name]: errorMessage }));
        return;
      }

      if (rule.type) {
        let isValid = true;
        switch (rule.type) {
          case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            break;
          case 'url':
            isValid = /^https?:\/\/.+$/.test(value);
            break;
          case 'number':
            isValid = !isNaN(Number(value));
            break;
          case 'integer':
            isValid = Number.isInteger(Number(value));
            break;
          case 'float':
            isValid = !isNaN(parseFloat(value)) && isFinite(value);
            break;
          case 'string':
            isValid = typeof value === 'string';
            break;
          case 'boolean':
            isValid = typeof value === 'boolean';
            break;
          case 'array':
            isValid = Array.isArray(value);
            break;
          case 'object':
            isValid = typeof value === 'object' && value !== null && !Array.isArray(value);
            break;
        }
        if (!isValid) {
          const errorMessage = rule.message || `${name} must be a ${rule.type}`;
          setErrors(prev => ({ ...prev, [name]: errorMessage }));
          return;
        }
      }

      if (rule.min !== undefined && value.length < rule.min) {
        const errorMessage = rule.message || `${name} must be at least ${rule.min} characters`;
        setErrors(prev => ({ ...prev, [name]: errorMessage }));
        return;
      }

      if (rule.max !== undefined && value.length > rule.max) {
        const errorMessage = rule.message || `${name} must be at most ${rule.max} characters`;
        setErrors(prev => ({ ...prev, [name]: errorMessage }));
        return;
      }

      if (rule.len !== undefined && value.length !== rule.len) {
        const errorMessage = rule.message || `${name} must be exactly ${rule.len} characters`;
        setErrors(prev => ({ ...prev, [name]: errorMessage }));
        return;
      }

      if (rule.validator) {
        try {
          await rule.validator(rule, value);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : rule.message || `${name} validation failed`;
          setErrors(prev => ({ ...prev, [name]: errorMessage }));
          return;
        }
      }
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  const validateFields = useCallback(async (names?: string[]) => {
    const fieldNames = names || Array.from(itemsRef.current.keys());
    const validationPromises = fieldNames.map(name => validateField(name));
    await Promise.all(validationPromises);

    if (Object.keys(errors).length > 0) {
      throw new Error('Validation failed');
    }

    return values;
  }, [validateField, errors]);

  const resetFields = useCallback((names?: string[]) => {
    if (names) {
      const newValues = { ...values };
      names.forEach(name => {
        newValues[name] = initialValues[name] || undefined;
      });
      setValues(newValues);
    } else {
      setValues(initialValues);
    }
    setErrors({});
  }, [values, initialValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await validateFields();
      onFinish?.(values);
    } catch (error) {
      onFinishFailed?.({ error, values });
    }
  };

  const registerItem = useCallback((name: string, item: any) => {
    itemsRef.current.set(name, item);
    return () => {
      itemsRef.current.delete(name);
    };
  }, []);

  const contextValue: FormContextType = {
    layout,
    labelCol,
    wrapperCol,
    colon,
    requiredMark,
    values,
    setFieldValue,
    getFieldValue,
    setFieldValueList,
    validateField,
    validateFields,
    resetFields
  };

  return (
    <FormContext.Provider value={contextValue}>
      <FormWrapper
        ref={formRef}
        className={`form-wrapper ${className}`}
        style={style}
        $styles={styles?.wrapper}
        onSubmit={handleSubmit}
      >
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && child.type === FormItem) {
            return React.cloneElement(child, { registerItem } as any);
          }
          return child;
        })}
      </FormWrapper>
    </FormContext.Provider>
  );
};

const FormItem: React.FC<FormItemProps & { registerItem?: (name: string, item: any) => () => void }> = ({
  name,
  label,
  required,
  rules = [],
  className = '',
  style,
  help,
  validateStatus,
  colon,
  hidden = false,
  extra,
  styles,
  registerItem,
  children
}) => {
  const context = useContext(FormContext);
  const [localValue, setLocalValue] = useState<any>(name && context?.values[name] ? context.values[name as string] : '');

  useEffect(() => {
    if (registerItem && name) {
      return registerItem(name, { rules, value: localValue });
    }
  }, [registerItem, name, rules, localValue]);

  useEffect(() => {
    if (context && name) {
      setLocalValue(context.values[name]);
    }
  }, [context, name, context?.values]);

  const handleChange = (value: any) => {
    setLocalValue(value);
    if (name) {
      context?.setFieldValue(name, value);
    }
  };

  const isRequired = required || rules.some(rule => rule.required);
  const error = (context && name ? context.values[`__error_${name}`] : '');
  const hasError = !!error || validateStatus === 'error';

  if (hidden) return null;

  return (
    <FormItemWrapper
      className={`form-item ${className}`}
      style={style}
      $layout={context?.layout || 'horizontal'}
      $styles={styles?.wrapper}
    >
      {label && (
        <FormLabel
          className="form-label"
          $required={isRequired}
          $colon={colon !== undefined ? colon : context?.colon}
          $styles={styles?.label}
        >
          {label}
        </FormLabel>
      )}
      <FormControl className="form-control" $styles={styles?.input}>
        {React.Children.map(
          React.Children.toArray(children).filter(child => React.isValidElement(child)),
          (child: React.ReactElement) => {
            return React.cloneElement(child, {
              value: localValue,
              onChange: (e: any) => {
                const value = e?.target?.value !== undefined ? e.target.value : e;
                handleChange(value);
                const childProps = child.props as any;
                childProps.onChange?.(e);
              },
              error: hasError
            } as any);
          }
        )}
        {hasError && (
          <FormError className={`form-error ${hasError ? 'form-error-visible' : ''}`} $styles={styles?.error}>
            {error}
          </FormError>
        )}
        {help && !hasError && (
          <FormHelp className="form-help" $styles={styles?.help}>
            {help}
          </FormHelp>
        )}
        {extra && !hasError && (
          <FormHelp className="form-help" $styles={styles?.help}>
            {extra}
          </FormHelp>
        )}
      </FormControl>
    </FormItemWrapper>
  );
};

Form.Item = FormItem;

export default Form;
export type { FormProps, FormItemProps, Rule, FormContextType, FormInstance };
