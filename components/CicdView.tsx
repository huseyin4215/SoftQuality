
import React from 'react';
import { GITHUB_ACTIONS_YAML } from '../constants';
import { GitBranch, Box, CheckCircle2, Rocket, FileJson } from 'lucide-react';

const CicdView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      {/* Süreç Akışı */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl text-white shadow-lg overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-8">Sürekli Entegrasyon & Yayılım (CI/CD)</h3>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-400/30 -translate-y-1/2 hidden md:block"></div>

            {[
              { label: 'Kod Değişik liği', icon: GitBranch, color: 'bg-blue-400' },
              { label: 'Bağımlılık Kurulumu', icon: Box, color: 'bg-indigo-400' },
              { label: 'Otomasyon Koşumu', icon: CheckCircle2, color: 'bg-green-400' },
              { label: 'Deploy / Release', icon: Rocket, color: 'bg-purple-400' }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 relative z-10 bg-indigo-800/20 backdrop-blur-sm p-4 rounded-xl border border-white/10 w-44">
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/10`}>
                  <step.icon size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-tighter text-center">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
        {/* Dekorasyon */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <FileJson className="text-slate-400" /> Workflow Konfigürasyonu
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 code-font text-[11px] overflow-x-auto border border-slate-800 h-[350px]">
            <pre className="text-slate-300">
              {GITHUB_ACTIONS_YAML}
            </pre>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h3 className="font-bold mb-2">Stratejik Avantajlar</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded bg-green-100 flex-shrink-0 flex items-center justify-center text-green-600 font-bold">1</div>
              <div>
                <h4 className="font-bold text-sm text-slate-800">Erken Tespit (Fail Fast)</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Hataların üretim ortamına gitmeden, pull-request aşamasında yakalanması sağlanır.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded bg-blue-100 flex-shrink-0 flex items-center justify-center text-blue-600 font-bold">2</div>
              <div>
                <h4 className="font-bold text-sm text-slate-800">Kod Kalitesi Güvencesi</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Sadece testleri geçen kodların birleştirilmesine izin verilerek master branch kalitesi korunur.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded bg-purple-100 flex-shrink-0 flex items-center justify-center text-purple-600 font-bold">3</div>
              <div>
                <h4 className="font-bold text-sm text-slate-800">Standardize Edilmiş Ortam</h4>
                <p className="text-xs text-slate-500 leading-relaxed">"Benim bilgisayarımda çalışıyor" sorunu, konteyner tabanlı izole test ortamları ile çözülür.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CicdView;
