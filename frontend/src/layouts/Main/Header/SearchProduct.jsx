import clsx from "clsx";
import React, { useRef } from "react";
import productApi from "../../../apis/product";
import useDebounce from "../../../hooks/useDebounce";
import icons from "../../../icons";
import * as ultils from "../../../utils";

const SearchProduct = () => {
  const [results, setResults] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(true);

  const dropdown = useRef(null);
  const inputRef = useRef(null);
  const debounceValue = useDebounce(value, 500);

  const handleValue = (e) => {
    const value = e.target.value;
    // if value not start with a space, value will be updated
    if (!value.startsWith(" ")) {
      setValue(value);
    }
  };
  React.useEffect(() => {
    if (!value.trim()) {
      return;
    }
    (async function () {
      setIsLoading(true);
      await productApi.filter({ name: debounceValue }).then((res) => {
        console.log(res);
        setResults(res.data.data);
        setIsLoading(false);
      });
    })();
  }, [debounceValue]);
  return (
    <form className="relative w-full min-w-[200px] max-w-[400px] rounded-md border-[1.5px] border-transparent bg-whiten text-sm focus-within:border-[#16182333]">
      <div className="relative flex h-full w-full items-center ">
        <input
          ref={inputRef}
          type="text"
          className="h-full w-full rounded-md bg-transparent px-3 py-2 text-sm outline-none"
          placeholder="Click to type..."
          value={value}
          onChange={handleValue}
        />
        {/* clear */}
        {value && !isLoading && (
          <icons.IconCloseCircle
            className="mx-3 cursor-pointer text-2xl"
            onClick={() => {
              setValue("");
              inputRef.current.focus();
            }}
          />
        )}
        {/* loading */}
        {value && isLoading && (
          <icons.IconLoading3Quarters className="mx-3 animate-spin text-xl" />
        )}
        <span
          className={clsx(
            "separator",
            "w-[1px]",
            "h-[28px]",
            "bg-[rgba(22,24,35,0.12)]",
            "my-[-3px]",
          )}
        ></span>
        <button
          className={clsx(
            "active:bg-[#1618230f]",
            "hover:bg-[#16182308]",
            "rounded-md",
            "h-full",
            "px-3",
            {
              "text-[#A3A3A8]": !value,
            },
          )}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <icons.IconBxSearch className="text-2xl" />
        </button>
      </div>
      {/* dropdown */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-full flex-col rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-4 py-6 dark:border-strokedark">
          {results.map((el, index) => (
            <li key={index} className="flex items-center gap-2">
              <div className="w-10 ">
                <img src={el.thumb[0].path} />
              </div>
              <div>
                <p>{ultils.capitalizeFirst(el.name)}</p>
                <p>{el.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
};

export default SearchProduct;
