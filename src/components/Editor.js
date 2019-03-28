import React from 'react';
import AddButton from './AddButton';
import './Editor.scss';

export default function Editor(props) {
  const { data, onChange } = props;
  const isArray = Array.isArray(data);

  if (typeof data !== 'object') {
    return <input type="text" value={data} onChange={e => onChange(e.target.value)} />;
  }

  function editEntry(name, newValue) {
    if (isArray) {
      const copy = [...data];
      copy[name] = newValue;
      return onChange(copy);
    }

    return onChange({ ...data, [name]: newValue });
  }

  function addEntry({ name, value }) {
    if (isArray) {
      if (!name) {
        return onChange([...data].concat(value));
      } else {
        return onChange([...data].concat({ [name]: value }));
      }
    }
    return onChange({ ...data, [name]: value });
  }

  return (
    <div className="editor">
      {Object.entries(data).map(([name, value]) => (
        <div key={name} className="entry">
          <label>{name}</label>
          <Editor data={value} onChange={newValue => editEntry(name, newValue)} />
        </div>
      ))}
      <AddButton onSave={addEntry} isArray={isArray} />
    </div>
  );
}
