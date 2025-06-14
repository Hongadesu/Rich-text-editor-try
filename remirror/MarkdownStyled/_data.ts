export const TEST = `**Remirror** 是一個現代化、可擴展的 **富文字編輯器框架（rich text editor framework）**，使用 **TypeScript** 編寫，基於 **ProseMirror** 架構打造，旨在提供一個更簡潔、模組化且適用於 React 的編輯器開發體驗。

---

### 🌟 Remirror 的特色

1. **React 優先設計**：

   * 提供 \`@remirror/react\` 套件，讓你用 React 方式建立、控制富文字編輯器，並能自然地與其他 UI 元件整合。

2. **高度模組化（Modular）**：

   * Remirror 透過 **extension system** 組合功能，如粗體、斜體、表格、Mention、自訂節點等，讓開發者可以自由開關或擴充功能。

3. **TypeScript 支援**：

   * 全框架以 TypeScript 編寫，型別安全，提供優秀的自動完成與開發者體驗。

4. **基於 ProseMirror，但更好用**：

   * ProseMirror 是一個功能強大但較底層的富文字核心，Remirror 在它上面加了一層易用的抽象，讓開發更簡單。

5. **支援 Markdown、HTML、JSON 等多種內容格式**：

   * 可以轉換內容格式，也支援 server-side rendering。

6. **即時協作、語法高亮等進階功能可擴展**：

   * 社群與官方提供許多 plugin，例如 syntax highlighting（結合 highlight.js）、code blocks、emoji、mention、collab 等等。

---

### 🚀 Remirror 的基本架構

Remirror 使用三個核心概念：

1. **EditorManager**：用來管理整個編輯器的狀態與功能擴展。
2. **Extensions**：用來定義行為與樣式（如 Bold、Italic、Placeholder、自訂節點等）。
3. **React Components**：像 \`<Remirror>\`、\`<EditorComponent>\` 用於包裝與渲染編輯器。

### 🧪 簡單範例（React）

\`\`\`tsx
import { Remirror, useRemirror, BoldExtension } from '@remirror/react';

const MyEditor = () => {
  const { manager, state } = useRemirror({
    extensions: () => [new BoldExtension()],
    content: '<p>Hello <b>Remirror</b></p>',
    selection: 'start',
    stringHandler: 'html',
  });

  return (
    <Remirror manager={manager} initialContent={state}>
      <></> {/* 可插入 Toolbar 等 */}
    </Remirror>
  );
};
\`\`\`

---

### 🔍 Remirror 適合什麼人使用？

* 想在 React 項目中加入自訂或高度互動的富文字編輯器者。
* 想要比 Quill、Slate 等更強大的 schema-based 富文字功能。
* 有前端架構經驗並想控制編輯器邏輯與 DOM 行為的開發者。

---

如果你有特定使用場景（像是語法高亮、mention 功能、多使用者即時協作等），我也可以幫你介紹 Remirror 的進階做法與相關套件。需要嗎？

Source from ChatGPT`;
