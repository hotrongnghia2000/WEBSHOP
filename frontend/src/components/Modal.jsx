import icons from "../icons";
import Button from "./Button";

const Modal = (props) => {
  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed left-0 right-0 top-0 z-50 max-h-full overflow-y-auto overflow-x-hidden bg-black/50 p-4 md:inset-0"
    >
      <div className="relative left-1/2 max-h-full w-full max-w-md translate-x-[-50%]">
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          <div className="p-6 text-center">
            <icons.IconErrorWarningLine className="mx-auto mb-4 text-7xl text-gray-400" />
            <h3 className="mb-2 text-lg font-bold text-gray-500 dark:text-gray-400">
              Đăng ký thất bại
            </h3>
            <p className="mb-10 text-gray-500">{props.mes}</p>
            <Button to="/home" danger name="Yes, I'am sure" />
            <Button
              name="No, cancel"
              default
              className="ml-5"
              onClick={() => props.setIsOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
