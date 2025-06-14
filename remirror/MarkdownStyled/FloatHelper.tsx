import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Undo2 } from "lucide-react";

const btnStyles =
  "flex justify-center items-center w-8 h-8 p-2 border border-[#555] rounded-md hover:bg-[#ddd] cursor-pointer";

type Position = {
  left: number;
  top: number;
};

export function useFloatHelper() {
  const [isHelperOpen, setIsHelperOpen] = useState(false);
  return { isHelperOpen, setIsHelperOpen };
}

export function FloatHelper({
  isHelperOpen,
  setIsHelperOpen,
}: {
  isHelperOpen: boolean;
  setIsHelperOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const helperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pos = useRef<Position>({ left: 0, top: 0 });
  const [selectedText, setSelectedText] = useState("");

  // 暫存的高亮區塊
  const [showHighlight, setShowHighlight] = useState(false);
  const [highlightRects, setHighlightRects] = useState<DOMRect[]>([]);

  useEffect(() => {
    const editor = document.querySelector("#editor")!;

    const handleSelectionChange = () => {
      if (!helperRef.current) return;

      const selection = window.getSelection();
      if (!selection || selection.rangeCount === 0) return;

      const rangeStart = selection.getRangeAt(0);
      const selectedText = selection.toString().trim() || "";
      const commonAncestor = rangeStart.commonAncestorContainer;

      if (editor.contains(commonAncestor)) {
        // 表示選取變化了，並且發生在 editor 裡
        if (selectedText) {
          // 表示剛剛選取了文字
          const rect = rangeStart.getBoundingClientRect();
          pos.current = {
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
          };
          setHighlightRects(Array.from(rangeStart.getClientRects()));
          setSelectedText(selectedText);
          setIsHelperOpen(true);
        } else {
          // 表示剛剛在 editor 中的選取變化 (可能是點擊) 沒有選取文字，此時關閉
          setShowHighlight(false);
          setIsHelperOpen(false);
        }
      }
      // else if (helperRef.current.contains(commonAncestor)) {
      //   // 表示選取變化了，並且發生在菜單裡
      //   if (selectedText) {
      //     // 菜單裡的選取行為，需要被忽略
      //     return;
      //   } else {
      //     // 表示剛剛既沒有選取文字(點了一下菜單內部)，在菜單內互動
      //     return;
      //   }
      // } else {
      //   // 表示選取變化了，並且發生在編輯器與菜單的外面
      // }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return createPortal(
    <>
      <div
        ref={helperRef}
        className={`absolute top-0 left-0 w-fit p-2 border bg-gray-100 rounded-md ${
          !isHelperOpen ? "hidden" : ""
        }`}
        style={{
          transform: `translate(${pos.current.left}px, ${
            pos.current.top - 60
          }px)`,
        }}
      >
        <div className="flex gap-2 justify-start items-center">
          <input
            ref={inputRef}
            type="text"
            className="max-w-64 border rounded-md h-8 py-1 px-2 text-sm"
            placeholder="Ask Something ..."
            onMouseDown={() => setShowHighlight(true)}
          />
          <button
            className={btnStyles}
            onClick={() => {
              if (!inputRef.current) return;

              console.log("你當前選取的文字為:", selectedText);
              console.log("你輸入的請求為:", inputRef.current.value);

              inputRef.current.value = "";
              setIsHelperOpen(false);
              setShowHighlight(false);
            }}
          >
            <ArrowRight />
          </button>
          <button
            className={btnStyles}
            onClick={() => {
              if (!inputRef.current) return;

              inputRef.current.value = "";
              setIsHelperOpen(false);
              setShowHighlight(false);
            }}
          >
            <Undo2 />
          </button>
        </div>
      </div>
      {/* selection simulator */}
      {showHighlight &&
        highlightRects.map((rect, i) => (
          <div
            key={i}
            className="absolute top-0 left-0 bg-amber-200/40 pointer-events-none z-50"
            style={{
              transform: `translate(${rect.left + window.scrollX}px, ${
                rect.top + window.scrollY
              }px)`,
              width: rect.width,
              height: rect.height,
            }}
          />
        ))}
    </>,
    document.body
  );
}
