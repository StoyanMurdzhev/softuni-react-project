export default function Login() {
    return (
        <>
            <form>
                <label htmlFor="username">
                    Username:
                    <input type="text" name="username" />
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