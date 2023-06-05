import { useCallback, useLayoutEffect, useRef, useState } from "react";
interface ExpandingTextAreaProps {
  inputValue: string;
  setInputValue: (val: string) => void;
}

export default function ExpandingTextArea({ inputValue, setInputValue }: ExpandingTextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>()

  function updateTextAreaSize(textArea?: HTMLTextAreaElement) {
    if (textArea == null) { return }
    if (textArea) {
      textArea.style.height = "0";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  }

  // forces trigger to render ONCE on init in order to set the height correctly
  const inputRef = useCallback((textArea: HTMLTextAreaElement) => {
    updateTextAreaSize(textArea);
    textAreaRef.current = textArea;
  }, [])

  useLayoutEffect(() => {
    updateTextAreaSize(textAreaRef.current);
  }, [inputValue]);

  const getFillerText = () => {
    const proomptsArr = [`What's Shakin' Bacon?`, `What's The Word?`, `What'cha Know, Joe?`, `What's Crack-A-Lackin'?`, `How Goes?`, `Que Pasa?`, `What's the Skinny?`, `What's the Jive, Clive?`, `Whatcha Thinkin'bout?`]
    return proomptsArr[Math.floor(Math.random() * proomptsArr.length)]?.concat(`...`)
  }

  return (
    <textarea className="flex-grow resize-none overflow-hidden border border-amber-200 focus-visible:outline-amber-900 p-4 rounded text-lg"
      ref={inputRef}
      name="new_tw33t"
      id="new_tw33t"
      /* style height:0 because text-area will self-enlarge via updateSize() above  */
      style={{ height: 0 }}
      placeholder={getFillerText()}
      onChange={e => setInputValue(e.target.value)}
    />
  );
}