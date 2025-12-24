
import React from 'react';
import { FRONTEND_TEST_CODE } from '../constants';
import { Monitor, PlayCircle, Eye, ShieldAlert } from 'lucide-react';

const FrontendTestsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Monitor className="text-blue-600" size={20} /> Playwright UI Otomasyonu (E2E)
        </h3>
        <p className="text-slate-600 text-sm mb-6">
          UI testleri, gerçek kullanıcı deneyimini simüle etmek için <strong>Playwright</strong> kullanılarak gerçekleştirilir. 
          Çapraz tarayıcı (Chromium, Firefox, WebKit) desteği sayesinde her ortamda tutarlı çalışma garanti edilir.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-900 rounded-lg p-4 code-font text-sm overflow-x-auto border border-slate-800 max-h-[400px]">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800 sticky top-0 bg-slate-900 z-10">
              <PlayCircle size={16} className="text-green-400" />
              <span className="text-slate-400">e2e/auth.spec.ts</span>
            </div>
            <pre className="text-slate-300">
              {FRONTEND_TEST_CODE}
            </pre>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Eye size={16} className="text-blue-500" /> Görsel Regresyon
              </h4>
              <p className="text-xs text-slate-500">UI bileşenlerinin pixel-pixel karşılaştırması yapılarak tasarım kaymaları tespit edilir.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <ShieldAlert size={16} className="text-red-500" /> Erişilebilirlik Testleri
              </h4>
              <p className="text-xs text-slate-500">WCAG standartlarına uygunluk, Playwright/Axe-core entegrasyonu ile denetlenir.</p>
            </div>
            <div className="flex flex-col justify-center items-center h-full p-8 border-2 border-dashed border-slate-200 rounded-lg text-slate-400">
              <Monitor size={48} className="mb-2 opacity-20" />
              <span className="text-xs font-medium uppercase tracking-widest">UI Snapshot Bekleniyor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontendTestsView;
