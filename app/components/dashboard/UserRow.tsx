import Link from "next/link";

export default function UserRow({ user }) {
  return (
    <Link href={`/dashboard/${user.id}`} className="block">
      <div className="grid grid-cols-6 px-4 py-3 hover:bg-gray-50 cursor-pointer">
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
        <p>{user.date}</p>
        <p>{user.status}</p>
        <p>⋯</p>
      </div>
    </Link>
  );
}
