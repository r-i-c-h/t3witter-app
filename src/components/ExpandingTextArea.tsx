import { useCallback, useLayoutEffect, useRef } from "react";
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
    <textarea className="bg-amber-50 flex-grow resize-none overflow-hidden text-amber-950 border border-amber-300 focus-visible:outline-amber-600 p-4 rounded text-lg placeholder:text-sm placeholder:md:text-lg"
      ref={inputRef}
      name="new_tw33t"
      id="new_tw33t"
      /* style height is 0 because text-area will self-enlarge via updateSize() above  */
      style={{ height: 0 }}
      placeholder={getFillerText()}
      value={inputValue}
      onChange={e => setInputValue(e.target.value)}
    />
  );
}