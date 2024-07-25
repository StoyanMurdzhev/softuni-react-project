export default function Login() {
    return (
        <>
            <form>
                <label htmlFor="email">
                    Email:
                    <input type="email" name="email" />
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password" name="password" />
                </label>
                <button type="submit">Log in</button>
            </form>
        </>
    )
}