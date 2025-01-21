import { useEffect, useRef, useState } from "react";

type RenderFn<TValue> = ({
  value,
  onChange,
}: {
  value: TValue;
  onChange: (value: TValue) => void;
}) => React.ReactElement;

type Maybe<T> = T extends undefined ? T | undefined : T;

type DebounceInputProps<TValue> = {
  value: TValue;
  onDebouncedChange: (value: Maybe<TValue>) => void;
  delay?: number;
  render: RenderFn<TValue>;
};

function DebounceControl<TValue>({
  render,
  value,
  delay = 500,
  onDebouncedChange,
}: DebounceInputProps<TValue>) {
  const initialRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (value !== internalValue) {
      setInternalValue(value);
    }
  }, [value]);

  useEffect(() => {
    return () => {
      if (timeoutRef?.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const onChange = (newValue: TValue) => {
    setInternalValue(newValue);

    if (timeoutRef?.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      onDebouncedChange(newValue as Maybe<TValue>);
    }, delay);
  };

  return render({ value: internalValue, onChange });
}

export default DebounceControl;
