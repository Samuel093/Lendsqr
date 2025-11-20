interface Props {
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

export default function StatusBadge({ status }: Props) {
  const colors = {
    Active: "bg-[#DDF7C8] text-[#3C5F23]",
    Inactive: "bg-[#F4F4F6] text-[#545F7D]",
    Pending: "bg-[#FFF6D9] text-[#9A7B2F]",
    Blacklisted: "bg-[#FCDDE0] text-[#8A1E2D]",
  } as const;

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

