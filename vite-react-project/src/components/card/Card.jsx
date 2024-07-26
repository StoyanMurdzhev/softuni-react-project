export default function Card() {
    return (
        <div>
            <img
                className="object-cover object-center w-full h-64 rounded-lg lg:h-80"
                src="https://images.ctfassets.net/nw5k25xfqsik/64VwvKFqxMWQORE10Tn8pY/200c0538099dc4d1cf62fd07ce59c2af/20220211142754-margherita-9920.jpg"
                alt="Pizza Margherita"
            />
            <div className="mt-8">
                <span className="text-blue-500 text-xs font-bold uppercase">Italian Cuisine</span>
                <h1 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                    Classic Margherita Pizza
                </h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Pizza Margherita or Margherita pizza is a typical Neapolitan pizza, roundish in shape with a raised edge and garnished with hand-crushed peeled tomatoes, mozzarella, fresh basil leaves, and extra virgin olive oil. The dough is made by mixing water, salt and yeast with flour.
                </p>
                <div className="flex items-center justify-between mt-4">
                    <div>
                        <a
                            href="#"
                            className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:underline hover:text-gray-500"
                        >
                            Unknown
                        </a>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Insert something here
                        </p>
                    </div>
                    <a
                        href="#"
                        className="inline-block text-blue-500 underline hover:text-blue-400"
                    >
                        Details
                    </a>
                </div>
            </div>
        </div>
    );
}