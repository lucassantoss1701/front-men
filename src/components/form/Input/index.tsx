import {
    FormControl,
    FormHelperText,
    FormLabel,
    Input as ChakraInput,
    InputProps as ChakraInputProps,
  } from "@chakra-ui/react";
  

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    placeholder?: string;
    helpText?: string;
    type?: string;
    size?: "lg" | "md" | "sm" | "xs";
    inputProps?: ChakraInputProps;
  }
  
  export function Input(props: InputProps) {
    const {
      label,
      type = "text",
      size,
      helpText,
      placeholder,
      inputProps,
      name,
      ...rest
    } = props;
  
    return (
      <FormControl {...rest}>
        {label && (
          <FormLabel
            fontSize="0.9rem"
            htmlFor={`${type}-input-${name}`}
            color="gray.200"
            mb={1}
          >
            {label}
          </FormLabel>
        )}
        <ChakraInput
          name={name}
          id={`${type}-input-${name}`}
          type={type}
          size={size}
          placeholder={placeholder}
          {...inputProps}
        />
        {helpText && <FormHelperText>{helpText}</FormHelperText>}
      </FormControl>
    );
  }