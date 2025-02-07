import { getCollection } from "@/lib/db";
import Link from "next/link";

export default async function Home() {
  const postsCollection = await getCollection("posts");
  const posts = await postsCollection.find({}).toArray();

  if(posts){
    return (
      <div className="grid grid-cols-2 gap-6">
        {
          posts.map(post => {
            return(
              <div key={post._id}>
                <div className="border border-slate-400 border-dashed p-4 rounded-md h-full">
                  <p className="text-slate-400 text-xs">Created at</p>
                  <Link href="" className="block text-xl font-semibold mb-4">{post.title}</Link>
                  <p className="text-sm">{post.content}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
  else return <p>Failed to fetch the data from database</p>
}
