import Hero from "../hero/Hero";
import RecentRecipes from "../recent-recipes/RecentRecipes";
import ScrollArrow from "../scroll-arrow/ScrollArrow";

export default function Home() {
    return (
        <>
        <Hero />
        <ScrollArrow />
        <RecentRecipes />
        </>
    );
}