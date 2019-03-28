import React from 'react';
import Editor from './components/Editor';
import './App.scss';

const initialValue = {
  foo: 'bar',
  bar: 'baz',
  baz: ['one', 'two', 'three', { foo: 'bar' }]
};

export default function App(props) {
  const [value, setValue] = React.useState(initialValue);

  return (
    <div className="editor-container">
      <Editor data={value} onChange={setValue} />
      <textarea readOnly value={JSON.stringify(value, null, 2)} />
    </div>
  );
}
