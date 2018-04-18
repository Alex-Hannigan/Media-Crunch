import React from 'react';

const DropDown = (props) => {
  const options = props.options.map((item, index) => {
    return <option key={index} value={item}>{item}</option>;
  });

  const selected = props.selected;

  return (
    <select value={selected} name={props.name} onChange={props.onChange}>
      {options}
    </select>
  );
}

export default DropDown;
