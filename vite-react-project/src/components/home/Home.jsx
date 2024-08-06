import Hero from "../hero/Hero";
import RecentPosts from "../recent/RecentPosts";
import ScrollArrow from "../scroll-arrow/ScrollArrow";

export default function Home() {
    return (
        <>
        <Hero />
        <ScrollArrow />
        <RecentPosts />
        </>
    );
}