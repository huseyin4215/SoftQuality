
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
        <div className="flex flex-col gap-4 animate-slide">
          <div className="card">
            <h2 className="text-lg font-bold mb-2">Canlı Test Ortamı</h2>
            <p className="text-sm text-muted">Django API'leri ve React UI bileşenleri için hazırlanan otomasyon senaryoları simüle edilmektedir.</p>
          </div>
          <TestRunner onComplete={(res) => setLastResults(res)} />
        </div>
      );
      case 'backend': return <BackendTestsView />;
      case 'frontend': return <FrontendTestsView />;
      case 'reports': return <ReportsView />;
      case 'cicd': return <CicdView />;
      case 'info': return (
        <div className="p-8 animate-slide" style={{maxWidth: '900px', margin: '0 auto'}}>
          <h2 className="text-lg font-bold mb-4" style={{fontSize: '2rem'}}>Proje Kapsamı ve Hedefleri</h2>
          <div className="card" style={{padding: '2rem'}}>
            <p className="text-lg text-muted mb-4">
              Bu proje, modern bir web uygulamasının uçtan uca kalite güvence süreçlerini otomatize etmek amacıyla tasarlanmış bir 
              <strong> Test Otomasyon Çerçevesi</strong> mimarisidir.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4" style={{background: '#eff6ff', borderRadius: '8px', border: '1px solid #dbeafe'}}>
                <h3 className="font-bold text-primary mb-1">Akademik Odak</h3>
                <p className="text-xs text-primary">Yazılım Testi ve Kalite Güvencesi dersi için standartlara uygun yapı.</p>
              </div>
              <div className="p-4" style={{background: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7'}}>
                <h3 className="font-bold text-success mb-1">Teknoloji Yığını</h3>
                <p className="text-xs text-success">PyTest, Django, Playwright, React ve GitHub Actions.</p>
              </div>
            </div>
          </div>
        </div>
      );
      default: return <ArchitectureView />;
    }
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="p-4 flex items-center gap-3" style={{borderBottom: '1px solid #1e293b', padding: '1.5rem'}}>
          <div style={{background: 'var(--primary)', padding: '8px', borderRadius: '8px', color: 'white'}}>
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 style={{fontSize: '1.1rem', fontWeight: 800, color: 'white'}}>QA-Pro</h1>
            <p style={{fontSize: '0.65rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px'}}>Test Automation</p>
          </div>
        </div>

        <nav style={{flex: 1, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewType)}
              className={`btn-nav ${activeView === item.id ? 'active' : ''}`}
            >
              <item.icon size={20} />
              <span className="text-sm">{item.label}</span>
              {activeView === item.id && <ChevronRight size={16} style={{marginLeft: 'auto'}} />}
            </button>
          ))}
        </nav>

        <div style={{padding: '1rem', borderTop: '1px solid #1e293b', textAlign: 'center'}}>
          <p className="text-xs" style={{color: '#475569', fontWeight: 600}}>
            Mühendislik Fakültesi<br/>v1.1 Stable
          </p>
        </div>
      </aside>

      <main className="main-view">
        <header className="header">
          <h2 className="text-lg font-bold">
            {navItems.find(i => i.id === activeView)?.label}
          </h2>
          <div className="flex items-center gap-4">
            {lastResults && (
              <div className="flex items-center gap-2">
                <span className="badge badge-success">{lastResults.passed} Başarılı</span>
                <span className="badge badge-error">{lastResults.failed} Hata</span>
              </div>
            )}
            <span className="badge badge-success flex items-center gap-2" style={{background: '#f0fdf4'}}>
              <div style={{width: '6px', height: '6px', background: 'var(--success)', borderRadius: '50%'}}></div>
              Sistem Aktif
            </span>
          </div>
        </header>

        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
