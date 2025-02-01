import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { CircleX } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  username: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>();

  const handleLogin: SubmitHandler<FormData> = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signin`, {
        username: data.username,
        password: data.password,
      });
    } catch (e) {
      if (e instanceof AxiosError) {
        setError("root.serverError", { message: e.response?.data.error });
      }
    }
  };

  return (
    <div className="bg-black text-white h-screen py-32 flex flex-col justify-center items-center font-primary">
      <form
        className="flex flex-col px-5 text-sm w-full md:max-w-xs mx-auto text-center"
        onSubmit={handleSubmit(handleLogin)}
      >
        <h1 className="text-2xl font-bold my-5">Log in to Brainly</h1>

        <input
          type="text"
          id="username"
          className="py-2 px-4 outline-1 outline-white/20 rounded-md bg-gray-500 mb-2"
          placeholder="Username"
          {...register("username", {
            required: "Username is required.",
            minLength: {
              value: 3,
              message: "Username should not be shorter than 3 character.",
            },
            maxLength: {
              value: 10,
              message: "Username should not be longer than 10 character.",
            },
          })}
        />
        {errors.username && (
          <p className="text-primary text-left flex justify-start items-start gap-1 mb-5">
            <CircleX size={14} className="mt-1" />
            <span>{errors.username.message}</span>
          </p>
        )}

        <input
          type="text"
          id="password"
          className="py-2 px-4 outline-1 outline-white/20 rounded-md bg-gray-500 mb-2"
          placeholder="Password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password should not be shorter than 8 character.",
            },
            maxLength: {
              value: 20,
              message: "Password should not be longer than 20 character.",
            },
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[_#@%\*\-])[A-Za-z0-9_#@%\*\-]{8,20}$/,
              message:
                "Password must atleast contain 1 Uppercase, Lowercase, Number & Special character.",
            },
          })}
        />

        {errors.password && (
          <p className="text-primary text-left flex justify-start items-start gap-1 mb-5">
            <CircleX size={14} className="mt-1" />
            <span>{errors.password.message}</span>
          </p>
        )}

        {errors.root?.serverError && (
          <p className="text-primary text-left flex justify-start items-start gap-1 mb-5">
            <CircleX size={14} className="mt-1" />
            <span>{errors.root?.serverError.message}</span>
          </p>
        )}

        <button
          type="submit"
          className="px-4 py-2 font-medium rounded-md bg-white text-black my-2 cursor-pointer shadow-[0_0px_30px_rgba(0,0,0,0.25)] transition-all duration-500 hover:shadow-primary"
        >
          Login
        </button>
        <Link
          to={"/signup"}
          className="px-4 py-2 outline-1 outline-white/20 font-medium rounded-md cursor-pointer"
        >
          Don't have an account? Sign up
        </Link>
      </form>
    </div>
  );
}

export default Login;
