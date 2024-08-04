import styles from "./LoadingSpinner.module.css";

export default function LoadingSpinner() {
    return (<div className="flex justify-center items-center min-h-screen">
        <span className={styles.loader}></span>
        <p>Loading...</p>
    </div>)
}