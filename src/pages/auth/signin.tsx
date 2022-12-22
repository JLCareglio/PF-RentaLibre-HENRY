import { useSession, signIn, signOut } from "next-auth/react"

/* The code above checks if the user has Session. If there is no Session, the Sign in button is returned, else it returns the Sign out button. */

export default function SignIn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div /* className={styles.container} */>
        Welcome user<br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div /* className={styles.container} */>
      Click to sign into your user account <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
}