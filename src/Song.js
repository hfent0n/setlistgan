import React from 'react';
import { FixedSizeList } from 'react-window';
import { components } from 'react-select';
import Select, { createFilter } from "react-select";

import {songOptions} from './data/songOptions';

import './styles.css';

export function Song(props) {

  const handleChange = (e) => {
    const prediction = Object.keys(e.value).reduce((a, b) => e.value[a] > e.value[b] ? a : b);
    props.onChange(prediction);
  }

  return (
    <Select
      onChange={handleChange}
      options={songOptions}
      filterOption={createFilter({ ignoreAccents: false })}
      components={optimizeSelect.components}
      isClearable={true}
      isFocused={false}
    />
  );
}
const optimizeSelect = {
  components: {
    MenuList: OptimizedMenuList,
    Option: OptimizedOption,
  },
}

function OptimizedMenuList(props) {
  const { options, children, maxHeight, getValue } = props;
  if (!children || !Array.isArray(children)) return null;

  const height = 35;
  const selectedValues = getValue();
  const initialOffset = selectedValues[0] ? options.indexOf(selectedValues[0]) * height : 0;

  return (
    <FixedSizeList
      width={''}
      itemSize={height}
      height={maxHeight}
      itemCount={children.length}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => (
        <div className="option-wrapper" style={style}>
          {children[index]}
        </div>
      )}
    </FixedSizeList>
  )
}

function OptimizedOption(props) {
  const {innerProps, isFocused, ...otherProps} = props;
  const {onMouseMove, onMouseOver, ...otherInnerProps} = innerProps;
  const newProps = {innerProps: {...otherInnerProps}, ...otherProps};
  return <components.Option  {...newProps} className="optimized-option">{props.children}</components.Option>;
}


