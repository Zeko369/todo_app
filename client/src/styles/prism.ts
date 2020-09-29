import { css } from '@emotion/core';

export const githubDark = css`
  code[class*='language-'],
  pre[class*='language-'] {
    color: #abb2bf;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    border-radius: 6px;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection,
  code[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: #282c34;
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    text-shadow: none;
    background: #282c34;
  }

  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    color: white;
    background: #282c34;
  }

  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.punctuation {
    color: #abb2bf;
  }

  .token.constant {
    color: #e06c75;
  }

  .token.deleted {
    color: #e06c75;
  }

  .token.tag {
    color: #e06c75;
  }

  .token.variable {
    color: #c678dd;
  }

  .token.keyword {
    color: #c678dd;
  }

  .token.selector {
    color: #c678dd;
  }

  .token.builtin {
    color: #e5c07b;
  }

  .token.changed {
    color: #e5c07b;
  }

  .token.namespace {
    color: #e5c07b;
  }

  .token.class-name {
    color: #e5c07b;
  }

  .token.operator {
    color: #abb2bf;
  }

  .token.property {
    color: #abb2bf;
  }

  .token.inserted {
    color: #98c379;
  }

  .token.string {
    color: #98c379;
  }

  .token.char {
    color: #d19a66;
  }

  .token.number {
    color: #d19a66;
  }

  .token.attr-name {
    color: #d19a66;
  }

  .token.function {
    color: #61afef;
  }

  .token.symbol {
    color: #56b6c2;
  }

  .token.comment {
    color: undefined;
    font-style: italic;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }
`;

export const githubLight = css`
  code[class*='language-'],
  pre[class*='language-'] {
    color: #24292e;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  pre[class*='language-']::-moz-selection,
  pre[class*='language-'] ::-moz-selection,
  code[class*='language-']::-moz-selection,
  code[class*='language-'] ::-moz-selection {
    text-shadow: none;
    background: #ffffff;
  }

  pre[class*='language-']::selection,
  pre[class*='language-'] ::selection,
  code[class*='language-']::selection,
  code[class*='language-'] ::selection {
    text-shadow: none;
    background: #ffffff;
  }

  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    color: white;
    background: #ffffff;
  }

  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.comment {
    color: #6a737d;
  }

  .token.punctuation {
    color: #6a737d;
  }

  .token.string {
    color: #6a737d;
  }

  .token.constant {
    color: #005cc5;
  }

  .token.builtin {
    color: #005cc5;
  }

  .token.variable {
    color: #005cc5;
  }

  .token.tag {
    color: #22863a;
  }

  .token.deleted {
    color: #b31d28;
  }

  .token.inserted {
    color: #22863a;
  }

  .token.changed {
    color: #e36209;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }
`;
