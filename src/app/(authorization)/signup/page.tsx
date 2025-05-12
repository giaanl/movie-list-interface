"use client";

import { redirect } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { UsersService } from "@/services/UsersService";
import { SignUpInputs } from "@/types/Inputs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpInputs>();

  const onSubmit: SubmitHandler<SignUpInputs> = async (data: SignUpInputs) => {
    try {
      await UsersService.registerUser(data);
      toast.success("Cadastro realizado com sucesso!");

      setTimeout(() => {
        redirect("/login");
      }, 500);
    } catch (error) {
      console.log(error);
      toast.error(
        "Ops! Algo deu errado. Verifique os dados e tente novamente."
      );
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.code;
    if (key === "Enter") {
      handleSubmit(onSubmit);
    }
  };

  const password = watch("password");

  return (
    <>
      <div className="flex min-h-fit flex-col justify-center overflow-hidden">
        <div className="m-auto w-fit rounded-md p-6 lg:max-w-xl">
          <h1 className="text-center text-2xl font-medium text-black">
            Cadastro
          </h1>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Digite seu nome"
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-500 focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                {...register("name", { required: true })}
                onKeyDown={handleKeyPress}
              />
              {errors.name && (
                <span className="mt-2 text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Digite seu email"
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-500 focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="mt-2 text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="Digite sua senha"
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-500 focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                {...register("password", { required: true })}
                onKeyDown={handleKeyPress}
              />
              {errors.password && (
                <span className="mt-2 text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Input
                type="password"
                placeholder="Confirme a sua senha"
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-500 focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === password || "As senhas não coincidem",
                })}
                onKeyDown={handleKeyPress}
              />
              {errors.confirmPassword && (
                <span className="mt-2 text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                className="w-full transform rounded-sm bg-blue-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              >
                Cadastrar-se
              </Button>
            </div>
            <div className="mt-[15px] flex justify-center">
              <p className="text-black">
                Já possui uma conta?{" "}
                <Link href="/login">
                  <span className="text-blue-500">Faça login aqui</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
