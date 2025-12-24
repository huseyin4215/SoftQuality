
import React from 'react';
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
                </div>
              </div>
            </div>
          </section>

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
              </div>
            </div>
          </section>
        </div>

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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckCircle: React.FC<{ size?: number, className?: string }> = ({ size = 16, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default ArchitectureView;
