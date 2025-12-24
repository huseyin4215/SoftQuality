
import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Terminal as TerminalIcon, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { TestStatus } from '../types';

interface LogEntry {
  text: string;
  type: 'info' | 'success' | 'error' | 'cmd';
  timestamp: string;
}

const TestRunner: React.FC<{ onComplete: (results: any) => void }> = ({ onComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const addLog = (text: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev, {
      text,
      type,
      timestamp: new Date().toLocaleTimeString('tr-TR')
    }]);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const runSimulation = async () => {
    setIsRunning(true);
    setLogs([]);

    addLog('QA-Pro Otomasyon Hattı Başlatılıyor...', 'cmd');
    await new Promise(r => setTimeout(r, 800));

    addLog('Backend servisleri kontrol ediliyor: http://localhost:8000', 'info');
    await new Promise(r => setTimeout(r, 600));

    addLog('>> pytest tests/backend/ --junitxml=reports/result.xml', 'cmd');
    addLog('Koleksiyon yapılıyor: 12 test bulundu.', 'info');

    const backendSteps = [
      'test_user_auth.py::test_login_success PASSED',
      'test_user_auth.py::test_login_invalid_creds PASSED',
      'test_products.py::test_get_list PASSED',
      'test_products.py::test_create_product FAILED (Assertion Error: Price mismatch)',
      'test_orders.py::test_order_flow PASSED'
    ];

    for (const step of backendSteps) {
      await new Promise(r => setTimeout(r, 400));
      addLog(step, step.includes('FAILED') ? 'error' : 'success');
    }

    addLog('-------------------------------------------------------', 'info');
    addLog('>> npx playwright test --project=chromium', 'cmd');
    addLog('Tarayıcı başlatılıyor (Chromium)...', 'info');

    const uiSteps = [
      'UI_Giriş_Sayfası: Görsel elementler doğrulandı.',
      'UI_Sepet_İşlemleri: Ürün eklendi ve kontrol edildi.',
      'UI_Profil_Güncelleme: Fotoğraf yükleme testi PASSED.'
    ];

    for (const step of uiSteps) {
      await new Promise(r => setTimeout(r, 700));
      addLog(step, 'success');
    }

    addLog('Tüm testler tamamlandı. Raporlar üretiliyor...', 'info');
    await new Promise(r => setTimeout(r, 1000));

    setIsRunning(false);
    onComplete({ passed: 19, failed: 1 });
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[500px]">
      <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} className="text-slate-400" />
          <span className="text-xs font-mono text-slate-300">qa_automation_terminal.sh</span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 p-4 font-mono text-sm overflow-y-auto space-y-1 scrollbar-hide bg-[#0d1117]"
      >
        {logs.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 italic">
            <Play size={48} className="mb-4 opacity-10" />
            <p>Otomasyonu başlatmak için butona tıklayın</p>
          </div>
        )}
        {logs.map((log, i) => (
          <div key={i} className="flex gap-3 animate-in slide-in-from-left-2 duration-200">
            <span className="text-slate-600 shrink-0">[{log.timestamp}]</span>
            <span className={`
              ${log.type === 'cmd' ? 'text-blue-400 font-bold' : ''}
              ${log.type === 'success' ? 'text-green-400' : ''}
              ${log.type === 'error' ? 'text-red-400' : ''}
              ${log.type === 'info' ? 'text-slate-300' : ''}
            `}>
              {log.type === 'cmd' && <span className="mr-2">$</span>}
              {log.text}
            </span>
          </div>
        ))}
        {isRunning && (
          <div className="flex items-center gap-2 text-blue-400 animate-pulse mt-2">
            <Loader2 size={14} className="animate-spin" />
            <span>İşlem devam ediyor...</span>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-800/50 border-t border-slate-700 flex gap-4">
        {!isRunning ? (
          <button
            onClick={runSimulation}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-lg shadow-blue-900/40"
          >
            <Play size={16} fill="currentColor" /> Test Senaryolarını Koştur
          </button>
        ) : (
          <button
            disabled
            className="flex items-center gap-2 bg-slate-700 text-slate-400 px-6 py-2 rounded-lg font-bold text-sm"
          >
            <Loader2 size={16} className="animate-spin" /> Otomasyon Çalışıyor
          </button>
        )}
        <div className="ml-auto flex items-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-500" />
            <span className="text-xs text-slate-400 font-bold">BAŞARILI: {logs.filter(l => l.type === 'success').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle size={16} className="text-red-500" />
            <span className="text-xs text-slate-400 font-bold">HATALI: {logs.filter(l => l.type === 'error').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestRunner;
