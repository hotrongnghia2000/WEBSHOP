import clsx from "clsx";
import { useRef } from "react";

import React from "react";
import { Controller } from "react-hook-form";
import Select from "react-select";

const SelectField = (props) => {
  const selectRef = useRef();
  return (
    <div className="mt-4 flex w-full flex-col text-sm">
      <label
        className=" text-gray-500"
        onClick={() => selectRef.current.focus()}
      >
        {props.label}
      </label>
      <Controller
        control={props.control}
        defaultValue={props.defaultValue}
        name={props.fieldId}
        render={({ field: { onChange } }) => (
          <Select
            classNames={{
              container: () => clsx("min-w-fit"),
              control: (state) =>
                clsx("!border-gray-200 !shadow-none focus-within:ring-1", {
                  "!ring-focusborder": state.isFocused,
                }),
            }}
            options={props.options}
            onChange={(e) => {
              e.value ? onChange(e.value) : onChange(e.map((c) => c.value));
              props.setValue(e);
            }}
            ref={selectRef}
            menuPlacement="auto"
            menuPosition={props.position}
            placeholder={props.placeholder}
            isMulti={props.isMulti}
            value={props.value}
          />
        )}
      />
      <p className={clsx("h-4 text-sm text-red-600")}>{props.error}</p>
    </div>
  );
};

export default SelectField;
