import { Toaster } from "sonner";

export default function AuthorizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-r from-cyan-600 to-blue-900">
      <main>
        <div className="bg-white p-8 rounded-2xl shadow-xl">{children}</div>
        <Toaster position="top-right" richColors />
      </main>
    </div>
  );
}
