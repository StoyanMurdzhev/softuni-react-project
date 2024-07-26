import Card from "../card/Card";

export default function RecentPosts() {
    return (
        <section className="bg-white dark:bg-gray-900 mx-20 my-10">
            <div className="container px-6 py-10 mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white"> Recent Recipes </h1>
                </div>
                <hr className="my-4 border-gray-200 dark:border-gray-700" />
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </section>

    );
}