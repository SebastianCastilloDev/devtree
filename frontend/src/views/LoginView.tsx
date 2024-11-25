import { Link } from "react-router-dom"

export default function LoginView() {
  return (
    <>
      <div className="bg-slate-800 min-h-screen">
        <div className="max-w-lg mx-auto pt-10 px-5">
          <img src="/logo.svg" alt="logo devtree" />
          <div className="py-10">
            <h1 className="text-white">Login</h1>
          </div>
        </div>
      </div>
      <nav>
        <Link to="/auth/register">
          ¿No tienes una cuenta? Crea una aquí
        </Link>
      </nav>
    </>
  )
}
