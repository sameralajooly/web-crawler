import { capitalizeFirstLetter } from "../../utils/stringUtils";

const statusStyles = {
  queued: "bg-yellow-100 text-yellow-800 border-yellow-300",
  running: "bg-blue-100 text-blue-800 border-blue-300",
  done: "bg-green-100 text-green-800 border-green-300",
  error: "bg-red-100 text-red-800 border-red-300",
  idle: "bg-gray-100 text-gray-800 border-gray-300",
};

function getStatusStyle(status: string) {
  return statusStyles[status as keyof typeof statusStyles] || statusStyles.idle;
}

export const StatusBadge = ({ status }: { status: string }) => {
  const style = getStatusStyle(status);
  const dotColor = style.includes("green")
    ? "bg-green-500"
    : style.includes("red")
    ? "bg-red-500"
    : style.includes("blue")
    ? "bg-blue-500"
    : style.includes("yellow")
    ? "bg-yellow-500"
    : "bg-gray-500";

  return (
    <span
      className={`inline-flex items-center gap-2 px-2 py-1 rounded-full border text-xs font-semibold ${style}`}
    >
      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      {capitalizeFirstLetter(status)}
    </span>
  );
};
