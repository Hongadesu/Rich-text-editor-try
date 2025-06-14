import "remirror/styles/all.css";
import "./remirror-custom.css";
import { SupportedLanguages } from "./code-supports";
import { CustomCodeBlockExtension } from "./codeblock-extension";
import {
  BoldExtension,
  BulletListExtension,
  CodeExtension,
  HeadingExtension,
  ItalicExtension,
} from "remirror/extensions";
import { EditorComponent, Remirror, useRemirror } from "@remirror/react";
import { MarkdownExtension } from "@remirror/extension-markdown";
import { Menu } from "./Menu";
import { useFloatHelper, FloatHelper } from "./FloatHelper";

// test use
import { TEST } from "./_data";
const data = TEST;

export default function App() {
  const { manager, state } = useRemirror({
    extensions: () => [
      new BoldExtension({ weight: 900 }),
      new ItalicExtension(),
      new HeadingExtension({ levels: [1, 2, 3, 4, 5] }),
      new BulletListExtension({}),
      new CodeExtension(),
      new CustomCodeBlockExtension({ supportedLanguages: SupportedLanguages }),
      new MarkdownExtension({}),
    ],
    content: data,
    selection: "start",
    stringHandler: "markdown",
  });

  const { isHelperOpen, setIsHelperOpen } = useFloatHelper();

  return (
    <div
      id="editor"
      className="remirror-theme h-full content-center w-[80%] mx-auto p-6"
    >
      <Remirror
        placeholder="Write Something ..."
        manager={manager}
        initialContent={state}
      >
        <EditorComponent />
        {/* 我們可以在這邊自由添加各種功能按鈕 DOM */}
        <Menu />
        <FloatHelper
          isHelperOpen={isHelperOpen}
          setIsHelperOpen={setIsHelperOpen}
        />
      </Remirror>
    </div>
  );
}
