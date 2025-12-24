
import React from 'react';
import { GITHUB_ACTIONS_YAML } from '../constants';
import { GitBranch, Box, CheckCircle2, Rocket, FileJson } from 'lucide-react';

const CicdView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="bg-gradient-to-r p-8 rounded-2xl shadow-lg" style={{color: 'white', position: 'relative', overflow: 'hidden'}}>
        <div style={{position: 'relative', zIndex: 10}}>
          <h3 className="text-2xl font-bold mb-6">Sürekli Entegrasyon & Yayılım (CI/CD)</h3>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6" style={{position: 'relative'}}>
            {[
              { label: 'Kod Değişikliği', icon: GitBranch, color: '#60a5fa' },
              { label: 'Bağımlılık Kurulumu', icon: Box, color: '#818cf8' },
              { label: 'Otomasyon Koşumu', icon: CheckCircle2, color: '#4ade80' },
              { label: 'Deploy / Release', icon: Rocket, color: '#c084fc' }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 p-4 rounded-xl border" style={{backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', width: '180px'}}>
                <div style={{width: '48px', height: '48px', backgroundColor: step.color, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.2)'}}>
                  <step.icon size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-center">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{position: 'absolute', bottom: '-40px', right: '-40px', width: '250px', height: '250px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%', filter: 'blur(40px)'}}></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <FileJson className="text-slate-500" /> Workflow Konfigürasyonu
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 font-mono border" style={{fontSize: '11px', overflowX: 'auto', height: '350px'}}>
            <pre style={{color: '#cbd5e1'}}>
              {GITHUB_ACTIONS_YAML}
            </pre>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
          <h3 className="font-bold mb-2 text-slate-800">Stratejik Avantajlar</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div style={{width: '32px', height: '32px', backgroundColor: '#dcfce7', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803d', fontWeight: 'bold', flexShrink: 0}}>1</div>
              <div>
                <h4 className="font-bold text-sm text-slate-800">Erken Tespit (Fail Fast)</h4>
                <p className="text-xs text-slate-500">Hataların üretim ortamına gitmeden yakalanması sağlanır.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div style={{width: '32px', height: '32px', backgroundColor: '#dbeafe', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8', fontWeight: 'bold', flexShrink: 0}}>2</div>
              <div>
                <h4 className="font-bold text-sm text-slate-800">Kod Kalitesi Güvencesi</h4>
                <p className="text-xs text-slate-500">Sadece testleri geçen kodların birleştirilmesine izin verilir.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div style={{width: '32px', height: '32px', backgroundColor: '#f3e8ff', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7e22ce', fontWeight: 'bold', flexShrink: 0}}>3</div>
              <div>
                <h4 className="font-bold text-sm text-slate-800">İzole Test Ortamı</h4>
                <p className="text-xs text-slate-500">Konteyner tabanlı sistemler ile "benim makinemde çalışıyordu" sorunu çözülür.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CicdView;
