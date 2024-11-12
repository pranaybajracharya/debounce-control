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
    const timeoutId = setTimeout(() => {
      onDebouncedChange(internalValue as Maybe<TValue>);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [internalValue, delay]);

  const onChange = (newValue: TValue) => {
    setInternalValue(newValue);
  };

  return render({ value: internalValue, onChange });
}

export default DebounceControl;
