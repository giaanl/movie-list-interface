import { redirect } from "next/navigation";

export default function Home() {
  redirect("/list");

  return (
    <div>
      <p className="text-[24px] font-semibold text-gray-500">Inicio</p>
    </div>
  );
}
