
import React from 'react';
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
                </div>
              </div>
            </div>
          </section>

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
              </div>
            </div>
          </section>
        </div>

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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureView;
