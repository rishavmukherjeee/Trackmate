import React, { useRef } from 'react';
import { TextInput } from 'react-native';

export function copyToClipboard(text) {
  const inputRef = useRef(null);
  return (
    <TextInput
      ref={inputRef}
      style={{ position: 'absolute', left: 0, top: 0 }}
      value={text}
      onContentSizeChange={() => {
        inputRef.current.setNativeProps({
          style: {
            height: inputRef.current.scrollHeight,
          },
        });
      }}
      onFocus={() => inputRef.current.setNativeProps({ selection: { start: 0, end: text.length } })}
      onBlur={() => inputRef.current.setNativeProps({ selection: { start: 0, end: 0 } })}
    />
  );
}
