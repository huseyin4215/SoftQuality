
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Terminal, 
  Monitor, 
  BarChart3, 
  GitBranch, 
  Info,
  ChevronRight,
  PlaySquare
} from 'lucide-react';
import ArchitectureView from './components/ArchitectureView';
import BackendTestsView from './components/BackendTestsView';
import FrontendTestsView from './components/FrontendTestsView';
import ReportsView from './components/ReportsView';
import CicdView from './components/CicdView';
import TestRunner from './components/TestRunner';

type ViewType = 'architecture' | 'backend' | 'frontend' | 'reports' | 'cicd' | 'info' | 'run';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('architecture');
  const [lastResults, setLastResults] = useState<{passed: number, failed: number} | null>(null);

  const navItems = [
    { id: 'architecture', label: 'Mimari Yapı', icon: Layers },
    { id: 'run', label: 'Otomasyonu Çalıştır', icon: PlaySquare },
    { id: 'backend', label: 'Backend API Testleri', icon: Terminal },
    { id: 'frontend', label: 'Frontend UI Testleri', icon: Monitor },
    { id: 'reports', label: 'Test Raporları', icon: BarChart3 },
    { id: 'cicd', label: 'CI/CD Entegrasyonu', icon: GitBranch },
    { id: 'info', label: 'Proje Hakkında', icon: Info },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'architecture': return <ArchitectureView />;
      case 'run': return (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
            <h2 className="text-xl font-bold mb-2">Canlı Test Ortamı</h2>
            <p className="text-sm text-slate-500">Bu bölümde, Django API'leri ve React UI bileşenleri için hazırlanan otomasyon senaryoları simüle edilmektedir.</p>
          </div>
          <TestRunner onComplete={(res) => {
            setLastResults(res);
            // Opsiyonel: Test bitince raporlara yönlendir
          }} />
        </div>
      );
      case 'backend': return <BackendTestsView />;
      case 'frontend': return <FrontendTestsView />;
      case 'reports': return <ReportsView />;
      case 'cicd': return <CicdView />;
      case 'info': return (
        <div className="p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Proje Kapsamı ve Hedefleri</h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-6">
            <p className="text-lg leading-relaxed text-slate-600">
              Bu proje, modern bir web uygulamasının uçtan uca kalite güvence süreçlerini otomatize etmek amacıyla tasarlanmış bir 
              <strong> Test Otomasyon Çerçevesi (Framework)</strong> mimarisidir.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Akademik Odak</h3>
                <p className="text-sm text-blue-700">Yazılım Testi ve Kalite Güvencesi dersi için standartlara uygun, modüler ve sürdürülebilir bir yapı sunar.</p>
              </div>
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Teknoloji Yığını</h3>
                <p className="text-sm text-green-700">Backend için PyTest/Django-REST, Frontend için Playwright/React ve CI/CD için GitHub Actions.</p>
              </div>
            </div>
          </div>
        </div>
      );
      default: return <ArchitectureView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-72 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">QA-Pro</h1>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Test Automation</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewType)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                activeView === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeView === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
              <span className="font-medium text-sm">{item.label}</span>
              {activeView === item.id && <ChevronRight size={16} className="ml-auto" />}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="text-xs text-slate-500 text-center font-medium">
            Mühendislik Fakültesi<br/>
            Yazılım Kalite Güvencesi v1.1
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800">
            {navItems.find(i => i.id === activeView)?.label}
          </h2>
          <div className="flex items-center gap-4">
            {lastResults && (
              <div className="flex items-center gap-3 mr-4 animate-in fade-in zoom-in duration-300">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Son Koşum:</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">{lastResults.passed} Başarılı</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">{lastResults.failed} Hata</span>
              </div>
            )}
            <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Sistem Aktif
            </span>
          </div>
        </header>

        <div className="p-4 lg:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
