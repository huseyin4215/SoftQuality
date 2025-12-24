
import React, { useState, useEffect, useRef } from 'react';
<<<<<<< HEAD
import { Play, Square, Terminal as TerminalIcon, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { TestStatus } from '../types';
=======
import { Play, Terminal as TerminalIcon, CheckCircle, XCircle, Loader2 } from 'lucide-react';
>>>>>>> 848559c3172931f9e3b3259088c5b6925df13755

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
<<<<<<< HEAD
    
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
=======
    addLog('QA-Pro Otomasyon Hattı Başlatılıyor...', 'cmd');
    await new Promise(r => setTimeout(r, 800));
    addLog('Backend servisleri kontrol ediliyor: http://localhost:8000', 'info');
    await new Promise(r => setTimeout(r, 600));
    addLog('>> pytest tests/backend/', 'cmd');
    const steps = ['test_auth.py PASSED', 'test_products.py PASSED', 'test_ui_login.spec.ts PASSED'];
    for (const step of steps) {
      await new Promise(r => setTimeout(r, 500));
      addLog(step, 'success');
    }
    addLog('Tüm testler tamamlandı.', 'info');
    setIsRunning(false);
    onComplete({ passed: 20, failed: 0 });
  };

  return (
    <div className="terminal" style={{height: '500px'}}>
      <div className="terminal-header">
        <div className="flex items-center gap-2">
          <TerminalIcon size={14} style={{color: '#94a3b8'}} />
          <span className="text-xs font-mono" style={{color: '#cbd5e1'}}>qa_runner.sh</span>
        </div>
        <div className="flex gap-2">
          <div style={{width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444'}}></div>
          <div style={{width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b'}}></div>
          <div style={{width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e'}}></div>
        </div>
      </div>

      <div ref={scrollRef} className="terminal-body scrollbar-hide">
        {logs.length === 0 && (
          <div style={{height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.2}}>
            <Play size={48} />
            <p className="text-sm mt-2">Başlatmak için butona tıklayın</p>
          </div>
        )}
        {logs.map((log, i) => (
          <div key={i} className="flex gap-3" style={{marginBottom: '4px'}}>
            <span style={{color: '#475569'}}>[{log.timestamp}]</span>
            <span style={{
              color: log.type === 'cmd' ? 'var(--primary)' : 
                     log.type === 'success' ? 'var(--success)' :
                     log.type === 'error' ? 'var(--error)' : '#cbd5e1'
            }}>
              {log.type === 'cmd' && '$ '}
>>>>>>> 848559c3172931f9e3b3259088c5b6925df13755
              {log.text}
            </span>
          </div>
        ))}
        {isRunning && (
<<<<<<< HEAD
          <div className="flex items-center gap-2 text-blue-400 animate-pulse mt-2">
            <Loader2 size={14} className="animate-spin" />
            <span>İşlem devam ediyor...</span>
=======
          <div className="flex items-center gap-2 text-primary mt-2">
            <Loader2 size={14} className="animate-spin" />
            <span>Koşturuluyor...</span>
>>>>>>> 848559c3172931f9e3b3259088c5b6925df13755
          </div>
        )}
      </div>

<<<<<<< HEAD
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
=======
      <div style={{padding: '1rem', background: '#1e293b', borderTop: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <button onClick={runSimulation} disabled={isRunning} className="btn-primary">
          {isRunning ? <Loader2 size={16} /> : <Play size={16} />}
          {isRunning ? 'Çalışıyor...' : 'Testleri Başlat'}
        </button>
        <div className="m-auto flex gap-4">
          <div className="flex items-center gap-1 text-xs text-success font-bold"><CheckCircle size={14}/> {logs.filter(l=>l.type==='success').length}</div>
          <div className="flex items-center gap-1 text-xs text-error font-bold"><XCircle size={14}/> {logs.filter(l=>l.type==='error').length}</div>
>>>>>>> 848559c3172931f9e3b3259088c5b6925df13755
        </div>
      </div>
    </div>
  );
};

export default TestRunner;
