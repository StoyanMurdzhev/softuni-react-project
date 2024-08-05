import Hero from "../hero/Hero";
import RecentPosts from "../recent/RecentPosts";

export default function Home() {
    return (
        <div className="dark:bg-gray-900">
        <Hero />
        <RecentPosts />
        </div>
    );
}