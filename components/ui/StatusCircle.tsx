import clsx from "clsx";

type Props = {type: "success" | "danger" | "warn"};

export default function StatusCircle({type}: Props) {
  return (
    <div
      className={clsx(
        type === "success"
          ? "bg-green-500 shadow-[0_0_0_3px_rgba(34,197,94,0.3)]"
          : type === "danger"
          ? "bg-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.3)]"
          : "bg-yellow-400 shadow-[0_0_0_3px_rgba(250,204,21,0.3)]",
        "w-3 h-3 rounded-full"
      )}
    />
  );
}
