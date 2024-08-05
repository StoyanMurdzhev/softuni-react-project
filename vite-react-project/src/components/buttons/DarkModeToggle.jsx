import { useEffect, useState } from "react";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const themePref = localStorage.getItem("theme");
        if (themePref === "dark" || (!themePref && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    function clickHandler() {
        setDarkMode((prevMode) => !prevMode);
        if (darkMode) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <button onClick={clickHandler} className="p-2 rounded focus:outline-none">
            {darkMode ? "\u2600" : "\u263D"}
        </button>
    )
}