// EditorPane.tsx
import {Button} from "@/components/ui/button.tsx";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select.tsx";
import {useState} from "react";
import CodeEditor, {type Language } from "./CodeEditor";
interface EditorPaneProps {
    snippetId: string;
    onClose: () => void;

}

export default function EditorPane({ snippetId,onClose }: EditorPaneProps) {

    const [code, setCode] = useState("");
    const [language, setLanguage] = useState<Language>("javascript");

    return (
        <div className="flex flex-col h-full w-1/2 bg-white dark:bg-neutral-950 min-w-0">
            <header className="flex items-center px-4 py-3.5 border-b border-gray-200 dark:border-neutral-800 flex-shrink-0">
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    Editor
                </span>
                <span className="ml-2 text-xs text-gray-400 font-mono">{snippetId}</span>

                <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
                    <SelectTrigger className="ml-4 w-36 h-7 text-xs">
                        <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="rust">Rust</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                </Select>

                <Button onClick={onClose} className="ml-auto hover:opacity-75 mr-4 bg-purple-500"><svg width="15" className="text-white" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></Button>
            </header>
            <div className="flex-1 flex items-center justify-center text-sm text-gray-400">
                <CodeEditor value={code} onChange={value => {setCode(value); setLanguage(language)}} language={language} ></CodeEditor>
            </div>
        </div>
    );
}