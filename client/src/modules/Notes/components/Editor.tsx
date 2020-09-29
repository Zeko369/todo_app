import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useColorMode } from '@chakra-ui/core';
import { Controlled } from 'react-codemirror2';
import { Editor as IEditor } from 'codemirror';

import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/lib/codemirror.css';

const langs = ['javascript', 'clike', 'ruby', 'python', 'markdown', 'sql'] as const;
type Language = typeof langs[number];

const CodeEditor = styled(Controlled)`
  font-size: 1.5em;
  height: 100%;

  .CodeMirror {
    border-radius: 0.25rem;
    height: 100%;
  }
`;

interface EditorProps {
  initCode: string;
  language: Language;
}

export interface EditorFunctions {
  getCode: () => string | undefined;
}

const Editor = forwardRef<EditorFunctions, EditorProps>(({ initCode, language }, ref) => {
  const [code, setCode] = useState(initCode);
  const editorRef = useRef<IEditor>();

  const { colorMode } = useColorMode();

  const [mode, setMode] = useState<Language | undefined>(undefined);

  useEffect(() => {
    Promise.all(langs.map((lang) => import(`codemirror/mode/${lang}/${lang}` as any)))
      .then(() => {
        console.log('Done loading languages, reloading editor');
        setMode(language);
      })
      .catch((err) => {
        console.error(`Error loading languages`);
        console.error(err);
      });
  }, []);

  useImperativeHandle(ref, () => ({
    getCode: (): string | undefined => {
      if (editorRef.current) {
        return editorRef.current.getValue();
      }

      return undefined;
    },
  }));

  return (
    <>
      <CodeEditor
        value={code}
        editorDidMount={(e: IEditor) => {
          e.refresh();
          editorRef.current = e;
        }}
        onBeforeChange={(_e: IEditor, _d: CodeMirror.EditorChange, v: string) => setCode(v)}
        options={{
          mode,
          theme: colorMode === 'dark' ? 'material-darker' : '3024-day',
          lineNumbers: true,
          tabSize: 2,
          lineWrapping: true,
        }}
      />
    </>
  );
});

export default Editor;
