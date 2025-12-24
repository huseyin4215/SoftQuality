
import React from 'react';
import { BACKEND_TEST_CODE } from '../constants';
import { FileCode2, Terminal, CheckCircle2 } from 'lucide-react';

const BackendTestsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Terminal className="text-slate-800" size={20} /> Django REST Framework - API Otomasyonu
        </h3>
        <p className="text-slate-600 text-sm mb-6">
          Backend testleri <strong>PyTest</strong> kütüphanesi ve <strong>pytest-django</strong> eklentisi kullanılarak geliştirilmiştir. 
          Her test senaryosu için izole bir veritabanı (sqlite veya postgres) kullanılır.
        </p>
        
        <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm border">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b" style={{borderColor: '#1e293b'}}>
            <FileCode2 size={16} style={{color: '#60a5fa'}} />
            <span className="text-slate-500">tests/api/test_products.py</span>
          </div>
          <pre style={{color: '#cbd5e1', overflowX: 'auto'}}>
            {BACKEND_TEST_CODE}
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'Kimlik Doğrulama', desc: 'JWT token geçerliliği ve yetkilendirme testleri.' },
          { title: 'Validasyon Testleri', desc: 'Hatalı veri girişlerinde API cevaplarının kontrolü.' },
          { title: 'Entegrasyon', desc: 'Servis katmanı ve DB etkileşim doğrulamaları.' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border shadow-sm" style={{transition: 'border 0.2s'}}>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="text-green-500 mt-1" size={18} />
              <div>
                <h4 className="font-bold text-slate-800 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackendTestsView;
