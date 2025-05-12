"use client";

import { UsersService } from "@/services/UsersService";
import { LoginInputs } from "@/types/Inputs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { setCookie } from "cookies-next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data: any) => {
    try {
      const request: any = await UsersService.login(data);

      setCookie("MOVIE-LIST::TOKEN", request.access_token);
      setCookie("MOVIE-LIST::USER", JSON.stringify(request.user));
      router.refresh();
    } catch (error: any) {
      toast.error("Erro ao fazer login!");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.code;
    if (key === "Enter") {
      handleSubmit(onSubmit);
    }
  };
  return (
    <>
      <div className="flex min-h-fit flex-col justify-center overflow-hidden">
        <div className="m-auto w-fit rounded-md p-6 lg:max-w-xl">
          <h1 className="text-center text-2xl font-medium text-black">Login</h1>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Digite seu email"
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-500 focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                {...register("email", { required: true })}
                onKeyDown={handleKeyPress}
              />
              {errors.email && (
                <span className="mt-2 text-red-500">Campo Obrigatório</span>
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
                <span className="mt-2 text-red-500">Campo Obrigatório</span>
              )}
            </div>
            <div className="mt-6">
              <Button
                type="submit"
                className="w-full transform rounded-sm bg-blue-500 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none"
              >
                Logar
              </Button>
            </div>
            <div className="mt-[15px] flex justify-center">
              <p className="text-black">
                Não possui uma conta?{" "}
                <Link href="/signup">
                  <span className="text-blue-500">Se cadastre aqui</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
