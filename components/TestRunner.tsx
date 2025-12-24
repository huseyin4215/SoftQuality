
import React, { useState, useEffect, useRef } from 'react';
import { Play, Terminal as TerminalIcon, CheckCircle, XCircle, Loader2 } from 'lucide-react';

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
              {log.text}
            </span>
          </div>
        ))}
        {isRunning && (
          <div className="flex items-center gap-2 text-primary mt-2">
            <Loader2 size={14} className="animate-spin" />
            <span>Koşturuluyor...</span>
          </div>
        )}
      </div>

      <div style={{padding: '1rem', background: '#1e293b', borderTop: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '1rem'}}>
        <button onClick={runSimulation} disabled={isRunning} className="btn-primary">
          {isRunning ? <Loader2 size={16} /> : <Play size={16} />}
          {isRunning ? 'Çalışıyor...' : 'Testleri Başlat'}
        </button>
        <div className="m-auto flex gap-4">
          <div className="flex items-center gap-1 text-xs text-success font-bold"><CheckCircle size={14}/> {logs.filter(l=>l.type==='success').length}</div>
          <div className="flex items-center gap-1 text-xs text-error font-bold"><XCircle size={14}/> {logs.filter(l=>l.type==='error').length}</div>
        </div>
      </div>
    </div>
  );
};

export default TestRunner;
