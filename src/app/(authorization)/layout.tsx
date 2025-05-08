export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-screen">
      <main>
        <div className="bg-white p-8 rounded-2xl shadow-xl">{children}</div>
      </main>
    </div>
  );
}
