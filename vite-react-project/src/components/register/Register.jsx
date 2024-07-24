export default function Register() {
    return (
        <>
            <form>
                <label htmlFor="username">
                    Username:
                    <input type="text" name="username" />
                </label>
                <label htmlFor="email">
                    Email:
                    <input type="email" name="email" />
                </label>
                <label htmlFor="password">
                    Password:
                    <input type="password" name="password" />
                </label>
                <label htmlFor="re-password">
                    Confirm Password:
                    <input type="password" name="re-password" />
                </label>
                <button type="submit">Register</button>
            </form>
        </>
    )
}