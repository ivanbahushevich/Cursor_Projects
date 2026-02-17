import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            WorkDone
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Система управления объектами и документами
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Link href="/objects">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Объекты
                </h2>
                <p className="text-gray-600 mb-4">
                  Управление объектами и их данными
                </p>
                <Button>Перейти к объектам</Button>
              </div>
            </Link>
            
            <Link href="/templates">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Шаблоны документов
                </h2>
                <p className="text-gray-600 mb-4">
                  Управление шаблонами документов
                </p>
                <Button>Перейти к шаблонам</Button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}







