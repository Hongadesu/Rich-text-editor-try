import { useCommands } from "@remirror/react";
import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Code,
  SquareCode,
  Plus,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const btnStyles =
  "flex justify-center items-center w-8 h-8 p-2 border border-[#555] rounded-md hover:bg-[#ddd] cursor-pointer";

/**
 * Bold
 */
function BolderBtn() {
  const { toggleBold, focus } = useCommands();

  return (
    <button
      className={btnStyles}
      onClick={() => {
        toggleBold();
        focus();
      }}
    >
      <Bold />
    </button>
  );
}

/**
 * Italic
 */
function ItalicBtn() {
  const { toggleItalic, focus } = useCommands();

  return (
    <button
      className={btnStyles}
      onClick={() => {
        toggleItalic();
        focus();
      }}
    >
      <Italic />
    </button>
  );
}

function Heading1Btn() {
  const { toggleHeading, focus } = useCommands();

  return (
    <button
      className={btnStyles}
      onClick={() => {
        toggleHeading({ level: 1 });
        focus();
      }}
    >
      <Heading1 />
    </button>
  );
}

function Heading2Btn() {
  const { toggleHeading, focus } = useCommands();

  return (
    <button
      className={btnStyles}
      onClick={() => {
        toggleHeading({ level: 2 });
        focus();
      }}
    >
      <Heading2 />
    </button>
  );
}

function Heading3Btn() {
  const { toggleHeading, focus } = useCommands();

  return (
    <button
      className={btnStyles}
      onClick={() => {
        toggleHeading({ level: 3 });
        focus();
      }}
    >
      <Heading3 />
    </button>
  );
}

/**
 * inlined code
 */
function CodeBtn() {
  const { toggleCode, focus } = useCommands();

  return (
    <button
      className={btnStyles}
      onClick={() => {
        toggleCode();
        focus();
      }}
    >
      <Code />
    </button>
  );
}

// /**
//  * code block (Previous)
//  */
// function CodeBlockBtn() {
//   const { toggleCodeBlock, focus } = useCommands();

//   return (
//     <button
//       className={btnStyles}
//       onClick={() => {
//         toggleCodeBlock();
//         focus();
//       }}
//     >
//       <SquareCode />
//     </button>
//   );
// }

/**
 * code block
 */
function CodeBlockBtn() {
  const inputRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { toggleCodeBlock, setCodeBlockLanguage, focus } = useCommands();
  const [isOpen, setIsOpen] = useState(false);

  const createCodeBlock = () => {
    const lang = inputRef.current ? inputRef.current.textContent : "plaintext";
    toggleCodeBlock();
    setCodeBlockLanguage(lang);
    focus();
    setIsOpen(false);
  };

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === "Enter" && document.activeElement === input) {
        e.preventDefault();
        createCodeBlock();
      }
    };

    document.addEventListener("click", handleClickOutside);
    input.addEventListener("keydown", handleEnter);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      input.removeEventListener("keydown", handleEnter);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="group flex gap-2 relative">
      <button
        className={btnStyles}
        onClick={() => {
          const input = inputRef.current;
          if (!input) return;
          setIsOpen(true);
          input.focus();
        }}
      >
        <SquareCode />
      </button>

      <div
        className={`absolute -bottom-10 left-0 origin-left transition-width duration-200 ${
          isOpen ? "scale-x-full" : "scale-x-0"
        }`}
      >
        <div className="flex gap-2 items-center">
          <div
            className="border rounded-md h-8 min-w-12 py-1 px-2 font-mono text-nowrap"
            contentEditable
            ref={inputRef}
          />
          <button className={btnStyles} onClick={createCodeBlock}>
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 多個按鈕的 menu
 *
 * 可能還需要
 * <ListOrdered /> (Ordered list)
 * <List /> (Unordered list)
 */
export function Menu() {
  return (
    <div className="flex justify-center gap-2 mt-6">
      <Heading1Btn />
      <Heading2Btn />
      <Heading3Btn />
      <div className="w-0.5 bg-gray-300"></div>
      <BolderBtn />
      <ItalicBtn />
      <CodeBtn />
      <div className="w-0.5 bg-gray-300"></div>
      <CodeBlockBtn />
    </div>
  );
}
