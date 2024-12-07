"use client";

import { useRoom } from "@/components/Room/RoomProvider";
import MonacoEditor from "./MonacoEditor";
import EditorToolbar from "./EditorToolbar";
import { defaultTheme } from "@/lib/constants/editorThemes";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

export default function CodeEditor() {
  const { room, updateRoom } = useRoom();
  const [theme, setTheme] = useState(defaultTheme);

  const handleLanguageChange = (language: string) => {
    updateRoom({ language });
  };

  const handleCodeChange = (code: string) => {
    updateRoom({ code });
  };

  return (
    <div className="h-full flex flex-col">
      <EditorToolbar
        language={room?.language || "javascript"}
        theme={theme}
        code={room?.code || ""}
        onLanguageChange={handleLanguageChange}
        onThemeChange={setTheme}
        onCodeChange={handleCodeChange}
      />
      <div className="flex-grow">
        <MonacoEditor
          language={room?.language || "javascript"}
          theme={theme}
          value={room?.code || ""}
          onChange={handleCodeChange}
        />
      </div>
      <Toaster />
    </div>
  );
}
