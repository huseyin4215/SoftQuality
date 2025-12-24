
import React from 'react';
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
import { AlertCircle, CheckCircle, Clock, ListFilter } from 'lucide-react';
import { TestStatus } from '../types';

const data = [
  { name: 'Pzt', passed: 40, failed: 2 },
  { name: 'Sal', passed: 35, failed: 5 },
  { name: 'Çar', passed: 45, failed: 1 },
  { name: 'Per', passed: 38, failed: 0 },
  { name: 'Cum', passed: 48, failed: 3 },
  { name: 'Cmt', passed: 20, failed: 0 },
  { name: 'Paz', passed: 15, failed: 1 },
];

const pieData = [
  { name: 'Başarılı', value: 241, color: '#22c55e' },
  { name: 'Hatalı', value: 12, color: '#ef4444' },
  { name: 'Atlandı', value: 8, color: '#94a3b8' },
];

const testHistory = [
  { id: 'T-102', name: 'API_GET_Products_Detail', status: TestStatus.PASSED, time: '14:20', duration: '124ms' },
  { id: 'T-103', name: 'UI_Login_Wrong_Password', status: TestStatus.FAILED, time: '14:18', duration: '2.4s' },
  { id: 'T-104', name: 'UI_Checkout_Cart_Flow', status: TestStatus.PASSED, time: '14:15', duration: '5.1s' },
  { id: 'T-105', name: 'API_POST_Create_User', status: TestStatus.SKIPPED, time: '14:10', duration: '0ms' },
];

const ReportsView: React.FC = () => {
  return (
    <div className="space-y-6 animate-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Toplam Test', value: '261', icon: ListFilter, color: '#2563eb' },
          { label: 'Başarı Oranı', value: '%92.3', icon: CheckCircle, color: '#22c55e' },
          { label: 'Kritik Hatalar', value: '3', icon: AlertCircle, color: '#ef4444' },
          { label: 'Ort. Koşum', value: '1.2s', icon: Clock, color: '#f59e0b' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
              <stat.icon style={{color: stat.color}} size={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold mb-6 text-slate-800">Günlük Başarı Trendi</h3>
          <div style={{height: '250px'}}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="passed" fill="#2563eb" radius={[4, 4, 0, 0]} name="Başarılı" />
                <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} name="Hatalı" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-bold mb-6 text-slate-800">Genel Test Dağılımı</h3>
          <div style={{height: '250px'}}>
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

      <div className="bg-white rounded-xl border shadow-sm" style={{overflow: 'hidden'}}>
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Son Test Koşumları</h3>
          <button className="text-blue-600 text-sm font-semibold" style={{background: 'none', border: 'none', cursor: 'pointer'}}>Tümünü Gör</button>
        </div>
        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left'}}>
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Test ID</th>
                <th className="px-6 py-4">Senaryo Adı</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4">Zaman</th>
                <th className="px-6 py-4">Süre</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {testHistory.map((test) => (
                <tr key={test.id} className="border-b" style={{backgroundColor: 'white'}}>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{test.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">{test.name}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${test.status === TestStatus.PASSED ? 'badge-success' : test.status === TestStatus.FAILED ? 'badge-error' : ''}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{test.time}</td>
                  <td className="px-6 py-4 text-slate-500">{test.duration}</td>
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
