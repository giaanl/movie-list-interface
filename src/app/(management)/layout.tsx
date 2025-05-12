export default function managementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-cyan-600 to-blue-900 dark:from-blue-900 dark:to-blue-700 transition-colors duration-200">
      <main>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-colors duration-200">{children}</div>
      </main>
    </div>
  );
}
