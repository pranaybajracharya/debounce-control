# DebounceControl

> React component that debounce state

## Install

```bash
npm install debounce-control
```

## Usage

```tsx
import React, { useState } from "react";
import DebounceControl from "debounce-control";

const App = () => {
  const [text, setText] = useState("");

  const onChange = (value: string) => {
    setText(value)
  }

  return (
    <DebounceControl
      value={text}
      delay={300}
      onDebouncedChange={onChange}
      render={({ value, onChange }) => (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    />
  );
};

export default App;
```
