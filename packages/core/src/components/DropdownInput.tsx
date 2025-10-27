import styled from "@emotion/styled";
import { withTheme } from "@emotion/react";
import {
  KeyboardEventHandler,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { FaRegArrowAltCircleRight as SetUrlIcon } from "react-icons/fa";
import type { Theme } from "@web-noise/core";
import { InputInner, InputWrapper } from "./Input";

const InputButton = withTheme(styled.button<{ theme: Theme }>`
  position: absolute;
  right: 0;
  height: 100%;
  outline: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.highlight1};
  cursor: pointer;
  display: flex;
  align-items: center;
  z-index: 2;
  &:hover {
    color: ${({ theme }) => theme.colors.highlight2};
  }
  &:active {
    color: ${({ theme }) => theme.colors.highlight3};
  }
`);

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

const DropdownList = withTheme(styled.div<{ theme: Theme; isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.elevation2};
  border: 1px solid ${({ theme }) => theme.colors.elevation3};
  border-radius: 0.2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.elevation1};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.elevation3};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.highlight1};
  }
`);

const DropdownItem = withTheme(styled.div<{
  theme: Theme;
  isHighlighted: boolean;
}>`
  padding: 0.4rem 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.highlight1};
  background-color: ${({ theme, isHighlighted }) =>
    isHighlighted ? theme.colors.elevation3 : "transparent"};
  font-family: var(--leva-fonts-mono);
  font-size: 0.9em;

  &:hover {
    background-color: ${({ theme }) => theme.colors.elevation3};
    color: ${({ theme }) => theme.colors.highlight2};
  }
`);

const DropdownItemValue = styled.div`
  font-size: 0.85em;
  opacity: 0.7;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DropdownItemLabel = styled.div`
  font-size: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface InputOption {
  value: string;
  label?: string;
}

interface SubmitInputProps {
  value?: string;
  placeholder?: string;
  onSubmit?: (value: string) => void;
  options?: Array<InputOption>;
}

export const DropdownInput = ({
  value = "",
  placeholder = "",
  onSubmit = () => {},
  options = [],
  ...props
}: SubmitInputProps) => {
  const [currentValue, setCurrentValue] = useState<string>(value);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (option) =>
      currentValue === "" ||
      option.value.toLowerCase().includes(currentValue.toLowerCase()) ||
      option.label?.toLowerCase().includes(currentValue.toLowerCase()),
  );

  const applyCurrentValue = useCallback(() => {
    onSubmit(currentValue);
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, [currentValue, onSubmit]);

  const selectOption = useCallback(
    (option: InputOption) => {
      setCurrentValue(option.value);
      onSubmit(option.value);
      setIsOpen(false);
      setHighlightedIndex(-1);
    },
    [onSubmit],
  );

  const handleKeyDown: KeyboardEventHandler = useCallback(
    (event) => {
      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
        case "Enter":
          if (
            isOpen &&
            highlightedIndex >= 0 &&
            filteredOptions[highlightedIndex]
          ) {
            event.preventDefault();
            selectOption(filteredOptions[highlightedIndex]);
          } else {
            applyCurrentValue();
          }
          break;
        case "ArrowDown":
          event.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
            setHighlightedIndex(0);
          } else {
            setHighlightedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : prev,
            );
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          if (isOpen) {
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          }
          break;
      }
    },
    [
      applyCurrentValue,
      isOpen,
      highlightedIndex,
      filteredOptions,
      selectOption,
    ],
  );

  const handleInputChange = (value: string) => {
    setCurrentValue(value);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleFocus = () => {
    if (options.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    // Use setTimeout to allow click events on dropdown items to fire first
    setTimeout(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
    }, 200);
  };

  // Handle clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && dropdownRef.current) {
      const highlightedElement = dropdownRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (highlightedElement) {
        highlightedElement.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [highlightedIndex]);

  return (
    <DropdownContainer>
      <InputWrapper>
        <InputInner
          {...props}
          ref={inputRef}
          value={currentValue}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onChange={(event) => handleInputChange(event.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
        />

        <InputButton onClick={applyCurrentValue}>
          <SetUrlIcon />
        </InputButton>
      </InputWrapper>

      {options.length > 0 && (
        <DropdownList
          ref={dropdownRef}
          isOpen={isOpen && filteredOptions.length > 0}
        >
          {filteredOptions.map((option, index) => (
            <DropdownItem
              key={option.value + index}
              isHighlighted={index === highlightedIndex}
              onClick={() => selectOption(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <DropdownItemLabel>
                {option.label || option.value}
              </DropdownItemLabel>
              {option.value && (
                <DropdownItemValue>{option.value}</DropdownItemValue>
              )}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default DropdownInput;
