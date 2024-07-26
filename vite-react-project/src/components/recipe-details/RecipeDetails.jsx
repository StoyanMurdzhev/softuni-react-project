import { Link } from "react-router-dom";

export default function RecipeDetails() {
    return (
        <article
            className="px-4 py-24 mx-auto max-w-7xl"
            itemID="#"
            itemScope=""
            itemType="http://schema.org/BlogPosting"
        >
            <div className="w-full mx-auto mb-12 text-left md:w-3/4 lg:w-1/2">
                <img
                    src="https://images.ctfassets.net/nw5k25xfqsik/64VwvKFqxMWQORE10Tn8pY/200c0538099dc4d1cf62fd07ce59c2af/20220211142754-margherita-9920.jpg"
                    className="object-cover w-full h-64 bg-center rounded-lg"
                    alt="Pizza Margherita"
                />
                <p className="mt-6 mb-2 text-xs font-semibold tracking-wider uppercase text-primary">
                    Main Course
                </p>
                <h1
                    className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl"
                    itemProp="headline"
                    title="Rise of Tailwind - A Utility First CSS Framework"
                >
                    Classic Margherita Pizza
                </h1>
                <div className="flex mb-6 space-x-2">
                    <Link to="/" className="text-gray-900 bg-gray-100 badge hover:bg-gray-200">
                        Italian
                    </Link>
                </div>
                <Link to="/" className="flex items-center text-gray-700">
                    <div className="avatar">
                        <img src="/placeholder.jpg" alt="Couldn't find photo of God" />
                    </div>
                    <div className="ml-2">
                        <p className="text-sm font-semibold text-gray-800">Probably God</p>
                        {/* <p className="text-sm text-gray-500">Jan 02 2021</p> */}
                    </div>
                </Link>
            </div>
            <div className="w-full mx-auto prose md:w-3/4 lg:w-1/2">
                <p>
                Pizza Margherita or Margherita pizza is a typical Neapolitan pizza, roundish in shape with a raised edge and garnished with hand-crushed peeled tomatoes, mozzarella, fresh basil leaves, and extra virgin olive oil. The dough is made by mixing water, salt and yeast with flour.
                </p>

                <ul className="mt-10">
                    Instructions:
                    <li> Preheat the oven to 475°F (245°C). </li>
                    <li> Roll out the pizza dough and spread tomato sauce evenly.</li>
                    <li> Top with slices of fresh mozzarella and fresh basil leaves.</li>
                    <li> Drizzle with olive oil and season with salt and pepper.</li>
                    <li> Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.</li>
                    <li> Slice and serve hot. </li>
                </ul>

            </div>
        </article>

    )
}

