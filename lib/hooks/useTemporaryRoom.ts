import { useState } from 'react';

export function useTemporaryRoom() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Start coding here');

  return {
    language,
    code,
    setLanguage,
    setCode,
  };
}