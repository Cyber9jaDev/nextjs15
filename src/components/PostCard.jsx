import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="border border-slate-400 border-dashed p-4 rounded-md h-full">
      <p className="text-slate-400 text-xs">{post._id.getTimestamp().toLocaleString()}</p>
      <Link href="" className="block text-xl font-semibold mb-4">{post.title}</Link>
      <p className="text-sm">{post.content}</p>
    </div>
  );
}