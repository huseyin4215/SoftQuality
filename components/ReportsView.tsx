
import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { AlertCircle, CheckCircle, Clock, ListFilter, RefreshCw, Server } from 'lucide-react';

const API_BASE = 'http://localhost:5001/api';

interface TestResult {
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    timestamp: string;
  };
  coverage: {
    total: number;
    by_module: Record<string, number>;
  };
  recent_tests: Array<{
    id: string;
    name: string;
    status: 'PASSED' | 'FAILED' | 'SKIPPED';
    duration: number;
    type: string;
    timestamp: string;
    error?: string;
  }>;
  trends: {
    daily: Array<{ date: string; passed: number; failed: number }>;
  };
}

const ReportsView: React.FC = () => {
  const [testData, setTestData] = useState<TestResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchTestResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/test-results`);
      if (!response.ok) throw new Error('Backend API yok veya çalışmıyor');
      const data = await response.json();
      setTestData(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      console.error('Test sonuçları alınamadı:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestResults();
    // Her 30 saniyede bir otomatik güncelle
    const interval = setInterval(fetchTestResults, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !testData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600 font-semibold">Test raporları yükleniyor...</p>
          <p className="text-sm text-slate-400 mt-2">Backend API'sine bağlanılıyor (port 5001)</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <Server className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-red-800 mb-2">Backend API Bağlantı Hatası</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <p className="text-sm text-red-500 mb-6">Backend API server'ı çalıştırmayı unutmayın:</p>
        <code className="bg-red-100 text-red-800 px-4 py-2 rounded font-mono text-sm block mb-4">
          python backend/api_server.py
        </code>
        <button
          onClick={fetchTestResults}
          className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  if (!testData) return null;

  const { summary, coverage, recent_tests, trends } = testData;

  // Grafik verileri
  const pieData = [
    { name: 'Başarılı', value: summary.passed, color: '#22c55e' },
    { name: 'Hatalı', value: summary.failed, color: '#ef4444' },
    { name: 'Atlandı', value: summary.skipped, color: '#94a3b8' },
  ].filter(d => d.value > 0);

  const successRate = summary.total > 0
    ? ((summary.passed / summary.total) * 100).toFixed(1)
    : '0';

  const avgDuration = recent_tests.length > 0
    ? (recent_tests.reduce((sum, t) => sum + t.duration, 0) / recent_tests.length).toFixed(2)
    : '0';

  return (
    <div className="space-y-6">
      {/* Güncelleme Bilgisi */}
      <div className="flex justify-between items-center bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-blue-800">
            Canlı Veri: Backend API Aktif (Port 5001)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-blue-600">
            Son güncelleme: {lastUpdate.toLocaleTimeString('tr-TR')}
          </span>
          <button
            onClick={fetchTestResults}
            disabled={loading}
            className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* İstatistik Özetleri */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Toplam Test', value: summary.total.toString(), icon: ListFilter, color: 'blue' },
          { label: 'Başarı Oranı', value: `%${successRate}`, icon: CheckCircle, color: 'green' },
          { label: 'Başarısız', value: summary.failed.toString(), icon: AlertCircle, color: 'red' },
          { label: 'Ort. Süre', value: `${avgDuration}s`, icon: Clock, color: 'amber' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
              <stat.icon className={`text-${stat.color}-500`} size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Haftalık Trend Grafiği */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold mb-6 text-slate-800">Haftalık Test Trendi (Canlı)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trends.daily}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(date) => new Date(date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="passed" fill="#22c55e" radius={[4, 4, 0, 0]} name="Başarılı" />
                <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} name="Hatalı" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dağılım Grafiği */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold mb-6 text-slate-800">Test Durumu Dağılımı (Gerçek Veri)</h3>
          <div className="h-64 flex flex-col md:flex-row items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Coverage İstatistikleri */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold mb-4 text-slate-800">Code Coverage: {coverage.total}%</h3>
        <div className="space-y-3">
          {Object.entries(coverage.by_module).map(([module, cov]) => (
            <div key={module}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-mono text-xs text-slate-600">{module}</span>
                <span className="font-bold text-slate-800">{cov}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${Number(cov) >= 80 ? 'bg-green-500' : Number(cov) >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                  style={{ width: `${cov}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Son Test Koşumları */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Son Test Koşumları (Backend API)</h3>
          <span className="text-xs text-slate-500">{recent_tests.length} test</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Test Adı</th>
                <th className="px-6 py-4">Tip</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4">Süre</th>
                <th className="px-6 py-4">Zaman</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {recent_tests.map((test, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{test.name}</div>
                    {test.error && (
                      <div className="text-xs text-red-600 mt-1 font-mono">{test.error.substring(0, 60)}...</div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded font-semibold">
                      {test.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${test.status === 'PASSED' ? 'bg-green-50 text-green-700 border-green-100' :
                      test.status === 'FAILED' ? 'bg-red-50 text-red-700 border-red-100' :
                        'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-mono text-xs">{test.duration.toFixed(3)}s</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {new Date(test.timestamp).toLocaleTimeString('tr-TR')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsView;
