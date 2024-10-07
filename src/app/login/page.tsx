"use client";
import { InputField } from "@/components/Input";
import { Logo } from "@/components/Logo";
import { useLogin } from "@/domain/service/loginService";
import { Spinner } from "@radix-ui/themes";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const login = useLogin();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login.mutate({
      username: formData.username,
      password: formData.password,
    });
  }

  return (
    <main className="w-full min-h-screen flex items-center justify-center">
      <Toaster />
      <div className="max-w-md w-full h-auto space-y-8 p-8 flex flex-col sm:border sm:border-green-900/40 sm:rounded-lg">
        <Logo />
        <hr className="hidden sm:block sm:border-green-900/40"></hr>
        <form className="space-y-10 text-center" onSubmit={onSubmit}>
          <InputField
            id="username"
            label="Login"
            type="text"
            name="username"
            onChange={onChange}
          />
          <InputField
            id="password"
            label="Senha"
            type="password"
            name="password"
            onChange={onChange}
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-green-900/50 rounded-lg p-3 w-full h-12 text-white font-bold sm:w-1/4 flex justify-center items-center ${
                login.isPending && "cursor-not-allowed"
              }`}
              disabled={login.isPending}
            >
              {login.isPending ? (
                <Spinner size="3" className="border-black" loading />
              ) : (
                <span>ENTRAR</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
