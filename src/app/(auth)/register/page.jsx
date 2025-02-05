export default function Register() {
  return (
    <div className="container w-1/2">
      <h1 className="title">Register</h1>

      <form action="" className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email"/>
        </div>
        <div>
          <label htmlFor="email">Password</label>
          <input type="password" name="password"/>
        </div>
        <div>
          <label htmlFor="email">Confirm Password</label>
          <input type="text" name="" />
        </div>
      </form>
    </div>
  );
}