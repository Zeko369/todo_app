import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Box, Button, Heading, IconButton, Spinner, Stack, useColorMode } from '@chakra-ui/core';
import { Controlled } from 'react-codemirror2';
import { Editor as IEditor } from 'codemirror';

import useSaveToggle from '../../../hooks/useSaveToggle';

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

  const [loading, setLoading] = useState<boolean>(true);
  const [mode, setMode] = useState<Language | undefined>(undefined);
  const [vimMode, setVimMode] = useState<string>();
  const [vim, toggleVim] = useSaveToggle('vim');

  useEffect(() => {
    (async () => {
      await import('codemirror/keymap/vim' as any);
      await Promise.all(langs.map((lang) => import(`codemirror/mode/${lang}/${lang}` as any)));
    })()
      .then(() => {
        console.log('Done loading languages, reloading editor');
        setMode(language);
        setLoading(false);
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

  const undo = () => {
    editorRef.current?.undo();
  };

  const redo = () => {
    editorRef.current?.redo();
  };

  const setupListeners = (cm: IEditor) => {
    cm.on('vim-mode-change', (vimEvent: any) => {
      setVimMode((vimEvent as { mode: string }).mode);
    });
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Stack isInline pb="2">
        <Button size="sm" onClick={toggleVim}>
          {vim ? 'Vim' : 'Normal mode'}
        </Button>
        <IconButton size="sm" icon="arrow-left" aria-label="Undo" onClick={undo} />
        <IconButton size="sm" icon="arrow-right" aria-label="Redo" onClick={redo} />
      </Stack>
      <CodeEditor
        value={code}
        editorDidMount={(e: IEditor) => {
          e.refresh();
          setupListeners(e);
          editorRef.current = e;
        }}
        onBeforeChange={(_e: IEditor, _d: CodeMirror.EditorChange, v: string) => setCode(v)}
        options={{
          mode,
          theme: colorMode === 'dark' ? 'material-darker' : '3024-day',
          lineNumbers: true,
          tabSize: 2,
          lineWrapping: true,
          keyMap: (vim && 'vim') || 'default',
        }}
      />
      {vim && (
        <Heading p={2} size="sm" fontWeight="bold">
          {vimMode?.toUpperCase()}
        </Heading>
      )}
    </Box>
  );
});

export default Editor;