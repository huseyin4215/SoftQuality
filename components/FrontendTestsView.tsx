
import React from 'react';
import { FRONTEND_TEST_CODE } from '../constants';
import { Monitor, PlayCircle, Eye, ShieldAlert } from 'lucide-react';

const FrontendTestsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Monitor className="text-blue-600" size={20} /> Playwright UI Otomasyonu (E2E)
        </h3>
        <p className="text-slate-600 text-sm mb-6">
          UI testleri, gerçek kullanıcı deneyimini simüle etmek için <strong>Playwright</strong> kullanılarak gerçekleştirilir. 
          Çapraz tarayıcı (Chromium, Firefox, WebKit) desteği sayesinde her ortamda tutarlı çalışma garanti edilir.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm border" style={{maxHeight: '400px', overflowY: 'auto'}}>
            <div className="flex items-center gap-2 mb-4 pb-2 border-b" style={{borderColor: '#1e293b', position: 'sticky', top: 0, backgroundColor: 'inherit'}}>
              <PlayCircle size={16} style={{color: '#4ade80'}} />
              <span className="text-slate-500">e2e/auth.spec.ts</span>
            </div>
            <pre style={{color: '#cbd5e1'}}>
              {FRONTEND_TEST_CODE}
            </pre>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border rounded-lg">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Eye size={16} className="text-blue-500" /> Görsel Regresyon
              </h4>
              <p className="text-xs text-slate-500">UI bileşenlerinin pixel-pixel karşılaştırması yapılarak tasarım kaymaları tespit edilir.</p>
            </div>
            <div className="p-4 bg-slate-50 border rounded-lg">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <ShieldAlert size={16} className="text-red-500" /> Erişilebilirlik Testleri
              </h4>
              <p className="text-xs text-slate-500">WCAG standartlarına uygunluk, Playwright/Axe-core entegrasyonu ile denetlenir.</p>
            </div>
            <div className="flex flex-col justify-center items-center p-8 border rounded-lg text-slate-500" style={{borderStyle: 'dashed', height: '140px'}}>
              <Monitor size={48} className="mb-2" style={{opacity: 0.1}} />
              <span className="text-xs font-semibold uppercase tracking-wider">UI Snapshot Bekleniyor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendTestsView;
