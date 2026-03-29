import CodeMirror from '@uiw/react-codemirror';
import {javascript} from '@codemirror/lang-javascript';
import {python} from "@codemirror/lang-python";
import {css} from "@codemirror/lang-css";
import {html} from "@codemirror/lang-html";
import {sql} from "@codemirror/lang-sql";
import {rust} from "@codemirror/lang-rust";
import {json as jsonLang} from "@codemirror/lang-json";


const LANG_MAP = {
    javascript: javascript(),
    typescript: javascript({ typescript: true }),
    python: python(),
    css: css(),
    html: html(),
    sql: sql(),
    rust: rust(),
    json: jsonLang(),
}

export type Language = keyof typeof LANG_MAP;

interface CodeEditorProps {

    value:string;
    language?: Language;
    onChange: (value: string) => void;

    readOnly?: boolean;
}

export default function CodeEditor({value,language= 'javascript',   onChange, readOnly = false }: CodeEditorProps) {



    return (

        <>




            <CodeMirror
            value={value}
            extensions={[LANG_MAP[language]]}
            onChange={onChange}
            readOnly={readOnly}
            height="100%"
        />

        </>
    );
}