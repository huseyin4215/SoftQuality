
import React from 'react';
<<<<<<< HEAD
import { Server, Layout, Database, Activity, Code2, FolderTree, FileCode, Coffee } from 'lucide-react';

const ArchitectureView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Activity className="text-blue-600" /> Test Otomasyon Katmanları
            </h3>
            <div className="space-y-4 text-slate-600 leading-relaxed text-sm">
              <p>
                Bu mimari, <strong>Test Piramidi</strong> prensiplerini temel alarak katmanlı bir yapıda kurgulanmıştır.
                Maliyet-verimlilik dengesi gözetilerek API testlerine ağırlık verilmiş, kritik kullanıcı yolları için UI otomasyonu eklenmiştir.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="font-bold text-slate-800 flex items-center gap-2 mb-1">
                    <Server size={14} className="text-blue-500" /> Backend Otomasyonu
                  </div>
                  <p className="text-xs">PyTest ile Django API uçlarının doğrulanması, DB izolasyonu ve Mock kullanımı.</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="font-bold text-slate-800 flex items-center gap-2 mb-1">
                    <Layout size={14} className="text-purple-500" /> Frontend Otomasyonu
                  </div>
                  <p className="text-xs">Playwright ile React bileşenlerinin çapraz tarayıcı üzerinde uçtan uca (E2E) testi.</p>
=======
import { Server, Layout, Database, Activity, FolderTree, FileCode, Coffee, CheckCircle } from 'lucide-react';

const ArchitectureView: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 animate-slide">
      <div className="grid grid-cols-3 gap-4">
        <div style={{gridColumn: 'span 2'}} className="flex flex-col gap-4">
          <section className="card">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Activity className="text-primary" /> Test Otomasyon Katmanları
            </h3>
            <div className="text-muted text-sm flex flex-col gap-4">
              <p>Maliyet-verimlilik dengesi gözetilerek API testlerine ağırlık verilmiş, kritik kullanıcı yolları için UI otomasyonu eklenmiştir.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4" style={{background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px'}}>
                  <div className="font-bold flex items-center gap-2 mb-1"><Server size={14} className="text-primary" /> Backend</div>
                  <p className="text-xs">PyTest ile Django API uçlarının doğrulanması ve DB izolasyonu.</p>
                </div>
                <div className="p-4" style={{background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px'}}>
                  <div className="font-bold flex items-center gap-2 mb-1"><Layout size={14} style={{color: '#a855f7'}} /> Frontend</div>
                  <p className="text-xs">Playwright ile React bileşenlerinin E2E doğrulaması.</p>
>>>>>>> 848559c3172931f9e3b3259088c5b6925df13755
                </div>
              </div>
            </div>
          </section>

<<<<<<< HEAD
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FolderTree className="text-amber-600" /> Proje Dosya Yapısı (QA)
            </h3>
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs text-slate-300 leading-relaxed">
              <div className="flex items-center gap-2 text-blue-400 mb-1"><FolderTree size={12}/> qa-automation-root/</div>
              <div className="pl-4 border-l border-slate-700 ml-1 py-1">
                <div className="flex items-center gap-2"><FolderTree size={12} className="text-amber-500"/> tests/</div>
                <div className="pl-4 border-l border-slate-700 ml-1">
                  <div className="flex items-center gap-2"><FolderTree size={12} className="text-amber-500"/> backend/ <span className="text-slate-500 italic"># Django API Testleri</span></div>
                  <div className="pl-4 border-l border-slate-700 ml-1">
                    <div className="flex items-center gap-2"><FileCode size={12} className="text-slate-400"/> test_auth.py</div>
                    <div className="flex items-center gap-2"><FileCode size={12} className="text-slate-400"/> test_api_v1.py</div>
                    <div className="flex items-center gap-2"><FileCode size={12} className="text-slate-400"/> conftest.py</div>
                  </div>
                  <div className="flex items-center gap-2"><FolderTree size={12} className="text-amber-500"/> frontend/ <span className="text-slate-500 italic"># Playwright UI Testleri</span></div>
                  <div className="pl-4 border-l border-slate-700 ml-1">
                    <div className="flex items-center gap-2"><FileCode size={12} className="text-slate-400"/> login.spec.ts</div>
                    <div className="flex items-center gap-2"><FileCode size={12} className="text-slate-400"/> checkout.spec.ts</div>
                    <div className="flex items-center gap-2"><FileCode size={12} className="text-slate-400"/> playwright.config.ts</div>
                  </div>
                </div>
                <div className="flex items-center gap-2"><FolderTree size={12} className="text-amber-500"/> reports/ <span className="text-slate-500 italic"># HTML & XML Çıktılar</span></div>
                <div className="flex items-center gap-2"><FileCode size={12} className="text-slate-400"/> pytest.ini</div>
                <div className="flex items-center gap-2"><FileCode size={12} className="text-slate-400"/> .github/workflows/main.yml</div>
=======
          <section className="card">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FolderTree style={{color: '#f59e0b'}} /> Proje Yapısı
            </h3>
            <div className="terminal-body" style={{background: 'var(--bg-sidebar)', borderRadius: '8px', color: '#94a3b8', fontSize: '0.75rem'}}>
              <div style={{color: 'var(--primary)'}}>qa-automation-root/</div>
              <div style={{paddingLeft: '1rem', borderLeft: '1px solid #1e293b'}}>
                <div>tests/</div>
                <div style={{paddingLeft: '1rem', borderLeft: '1px solid #1e293b'}}>
                  <div style={{color: '#eab308'}}>backend/</div>
                  <div style={{paddingLeft: '1rem'}}>test_api.py</div>
                  <div style={{color: '#eab308'}}>frontend/</div>
                  <div style={{paddingLeft: '1rem'}}>login.spec.ts</div>
                </div>
                <div>reports/</div>
                <div>.github/workflows/main.yml</div>
>>>>>>> 848559c3172931f9e3b3259088c5b6925df13755
              </div>
            </div>
          </section>
        </div>

<<<<<<< HEAD
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-xl text-white shadow-xl">
            <h3 className="font-bold mb-4 text-slate-400 uppercase text-xs tracking-widest">Kalite Metrikleri</h3>
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500 border border-green-500/30">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <div className="text-lg font-bold">92%</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Birim Test Kapsamı</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500 border border-blue-500/30">
                  <Coffee size={20} />
                </div>
                <div>
                  <div className="text-lg font-bold">12ms</div>
                  <div className="text-[10px] text-slate-500 uppercase font-bold">Ortalama API Tepkisi</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold mb-4 text-slate-800">Test Tasarımı</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-xs text-slate-600 italic">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1"></span>
                Her test senaryosu bağımsızdır.
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-600 italic">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1"></span>
                "Clean Code" prensipleri otomasyon kodunda da uygulanır.
              </li>
              <li className="flex items-start gap-2 text-xs text-slate-600 italic">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1"></span>
                Flaky testleri önlemek için dinamik bekleme (wait) stratejileri kullanılır.
              </li>
=======
        <div className="flex flex-col gap-4">
          <div className="card" style={{background: 'var(--bg-sidebar)', color: 'white'}}>
            <h3 className="text-xs font-bold text-muted mb-4" style={{letterSpacing: '1px', textTransform: 'uppercase'}}>Kalite Metrikleri</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div style={{width: '40px', height: '40px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)'}}>
                  <CheckCircle size={20} />
                </div>
                <div><div className="text-lg font-bold">92%</div><div className="text-xs text-muted font-bold">KAPSAM</div></div>
              </div>
              <div className="flex items-center gap-4">
                <div style={{width: '40px', height: '40px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)'}}>
                  <Coffee size={20} />
                </div>
                <div><div className="text-lg font-bold">12ms</div><div className="text-xs text-muted font-bold">API HIZI</div></div>
              </div>
            </div>
          </div>
          <div className="card">
            <h3 className="font-bold mb-3">Strateji</h3>
            <ul className="text-xs text-muted" style={{listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
              <li>• İzole Test Senaryoları</li>
              <li>• Dinamik Bekleme Mantığı</li>
              <li>• Mocked Servis Entegrasyonu</li>
>>>>>>> 848559c3172931f9e3b3259088c5b6925df13755
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
const CheckCircle: React.FC<{ size?: number, className?: string }> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

=======
>>>>>>> 848559c3172931f9e3b3259088c5b6925df13755
export default ArchitectureView;
