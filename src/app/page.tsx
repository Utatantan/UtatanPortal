import { getLinks } from '@/utils/fetchData';
import ClientContent from '@/components/ClientContent';

export default async function Home() {
  const links = await getLinks();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Utatan Portal</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <ClientContent initialLinks={links} />
        </div>
      </main>
      
      <footer className="bg-white shadow-inner mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Utatan Portal</p>
        </div>
      </footer>
    </div>
  );
}
