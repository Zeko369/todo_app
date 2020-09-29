import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Controlled } from 'react-codemirror2';
import { Editor as IEditor } from 'codemirror';

import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/3024-day.css';
import 'codemirror/lib/codemirror.css';
import { useColorMode } from '@chakra-ui/core';

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

// import React, { forwardRef, useRef } from 'react';
// import styled from '@emotion/styled';
// import { Controlled } from 'react-codemirror2';
// import type { Editor as IEditor, EditorChange } from 'codemirror';

// // import 'codemirror/mode/xml/xml';
// import 'codemirror/mode/javascript/javascript';
// import 'codemirror/mode/markdown/markdown';

// import 'codemirror/theme/material-darker.css';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/addon/display/autorefresh';

// const CodeEditor = styled(Controlled)`
//   font-size: 1.5em;
//   height: 100%;

//   .CodeMirror {
//     height: 100%;
//   }
// `;

// interface EditorProps {
//   initCode: string;
// }

// interface EditorState {
//   code: string;
// }

// class Editor extends React.Component<EditorProps, EditorState> {
//   public editor: IEditor | undefined;

//   constructor(props: EditorProps) {
//     super(props);

//     this.state = {
//       code: props.initCode,
//     };

//     this.setCode = this.setCode.bind(this);
//     this.editorDidMount = this.editorDidMount.bind(this);
//   }

//   setCode(_editor: IEditor, _data: EditorChange, value: string) {
//     this.setState({ code: value });
//   }

//   editorDidMount(editor: IEditor) {
//     this.editor = editor;
//   }

//   render() {
//     const { code } = this.state;

//     return (
//       <CodeEditor
//         value={code}
//         onBeforeChange={this.setCode}
//         editorDidMount={this.editorDidMount}
//         onChange={(...args) => console.log(args)}
//         options={{
//           mode: 'markdown',
//           theme: 'material-darker',
//           lineNumbers: true,
//           tabSize: 2,
//           lineWrapping: true,
//         }}
//       />
//     );
//   }
// }

// export type EditorType = typeof Editor;

// export default Editor;
