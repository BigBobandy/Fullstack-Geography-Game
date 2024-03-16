export const Toast = ({ message, show, onClose }) => {
  if (!show) return null;

  return (
    <div className="toast toast-top toast-center fixed top-0 left-1/2 transform -translate-x-1/2">
      <div className="flex flex-row justify-center items-center bg-base-200 p-2 shadow-xl rounded-2xl border-2 border-primary-content">
        <span className="text-lg mr-2 font-bold">{message}</span>
        <button
          className="btn btn-clear text-lg font-bold border-1 border-black"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </div>
  );
};
