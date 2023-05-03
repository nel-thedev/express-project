var codeView = CodeMirror.fromTextArea(document.getElementById('codeView'), {
  theme: 'dracula',
  readOnly: 'nocursor',
  mode: 'javascript',
  lineNumbers: true,
});
