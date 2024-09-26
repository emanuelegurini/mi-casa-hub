interface ImagesPageProps {
  params: {
    id: string;
  };
}

export default function LoadingPage() {
  return (
    <main className="pb-16 lg:pb-24 antialiased flex flex-col lg:flex-row">
      <div className="w-full lg:w-4/6 p-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-48 bg-gray-300 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
      <aside className="w-full lg:w-2/6 p-4 flex flex-col space-y-4"></aside>
    </main>
  );
}
