import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
    return (
    <div className="flex flex-col justify-center items-center min-h-screen">
        <span className={styles.loader}></span>
        <p className="mt-4">Loading...</p>
    </div>
    )
}