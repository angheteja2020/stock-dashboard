import { TrendingUp, Calendar, DollarSign, BarChart3, Trophy, TrendingDown, LineChart } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

export default function App() {
  const data = [
    { fecha: '2025-08-29', mosaic: 33.17, teck: 34.12, pg: 157.04, spy: 643.27, label: '29-Aug' },
    { fecha: '2025-09-05', mosaic: 32.23, teck: 34.24, pg: 160.02, spy: 645.45, label: '5-Sep' },
    { fecha: '2025-09-12', mosaic: 33.65, teck: 41.80, pg: 157.90, spy: 655.59, label: '12-Sep' },
    { fecha: '2025-09-19', mosaic: 33.98, teck: 39.24, pg: 156.04, spy: 663.70, label: '19-Sep' },
    { fecha: '2025-09-26', mosaic: 35.32, teck: 41.44, pg: 152.50, spy: 661.82, label: '26-Sep' }
  ];

  // Datos solo para septiembre (excluyendo agosto)
  const septemberData = data.filter(item => item.fecha.startsWith('2025-09'));

  const monthlyReturns = [
    { asset: 'The Mosaic Co. (MOS)', return: 6.48, comparison: 'Outperformed the market' },
    { asset: 'Teck Resources (TECK)', return: 21.45, comparison: 'Outperformed the market' },
    { asset: 'Procter & Gamble (PG)', return: -2.89, comparison: 'Underperformed the market' },
    { asset: 'S&P 500 (SPY)', return: 2.88, comparison: 'Benchmark' }
  ];

  const formatPrice = (price) => `$${price.toFixed(2)}`;
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const getPriceChange = (current, previous) => {
    if (!previous) return null;
    const change = ((current - previous) / previous) * 100;
    return change;
  };

  const PriceCell = ({ price, prevPrice }) => {
    const change = getPriceChange(price, prevPrice);
    return (
      <td className="px-6 py-4 text-right font-medium">
        <div className="flex flex-col items-end">
          <span className="text-gray-900">{formatPrice(price)}</span>
          {change !== null && (
            <span className={`text-xs font-semibold ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
            </span>
          )}
        </div>
      </td>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border-2 border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-700">{payload[0].payload.label}</p>
          <p className="text-lg font-bold text-blue-600">{formatPrice(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = (props) => {
    const { x, y, value } = props;
    return (
      <text 
        x={x} 
        y={y - 10} 
        fill="#666" 
        textAnchor="middle" 
        fontSize={12}
        fontWeight="600"
      >
        ${value.toFixed(2)}
      </text>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Adjusted Close Prices
            </h1>
          </div>
          <p className="text-gray-600 text-lg">September 2025 - Prices in USD</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>Source: Yahoo Finance</span>
          </div>
        </div>

        {/* Table 1: Price History */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <th className="px-6 py-5 text-left text-sm font-bold text-white uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-5 text-right text-sm font-bold text-white uppercase tracking-wider">
                    The Mosaic Co.
                  </th>
                  <th className="px-6 py-5 text-right text-sm font-bold text-white uppercase tracking-wider">
                    Teck Resources
                  </th>
                  <th className="px-6 py-5 text-right text-sm font-bold text-white uppercase tracking-wider">
                    Procter & Gamble
                  </th>
                  <th className="px-6 py-5 text-right text-sm font-bold text-white uppercase tracking-wider">
                    S&P 500 (SPY)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((row, index) => (
                  <tr 
                    key={row.fecha}
                    className={`transition-colors hover:bg-blue-50 ${
                      index === 0 ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-semibold text-gray-900">
                          {formatDate(row.fecha)}
                        </span>
                        {index === 0 && (
                          <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                            Base
                          </span>
                        )}
                      </div>
                    </td>
                    <PriceCell 
                      price={row.mosaic} 
                      prevPrice={index > 0 ? data[index - 1].mosaic : null}
                    />
                    <PriceCell 
                      price={row.teck} 
                      prevPrice={index > 0 ? data[index - 1].teck : null}
                    />
                    <PriceCell 
                      price={row.pg} 
                      prevPrice={index > 0 ? data[index - 1].pg : null}
                    />
                    <PriceCell 
                      price={row.spy} 
                      prevPrice={index > 0 ? data[index - 1].spy : null}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'The Mosaic Co.', start: data[0].mosaic, end: data[data.length - 1].mosaic },
                { label: 'Teck Resources', start: data[0].teck, end: data[data.length - 1].teck },
                { label: 'Procter & Gamble', start: data[0].pg, end: data[data.length - 1].pg },
                { label: 'S&P 500 (SPY)', start: data[0].spy, end: data[data.length - 1].spy }
              ].map((item, i) => {
                const totalChange = ((item.end - item.start) / item.start) * 100;
                return (
                  <div key={i} className="text-center">
                    <p className="text-xs text-gray-600 mb-1">{item.label}</p>
                    <p className={`text-lg font-bold ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)}%
                    </p>
                    <p className="text-xs text-gray-500">Total Change</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Table 2: Monthly Returns Summary */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">Monthly Return (September 2025)</h2>
            </div>
            <p className="text-purple-100 text-sm mt-1">
              Using last business day of August as base and last Friday of September as close
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Return
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Comparison vs. S&P 500
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {monthlyReturns.map((row, index) => {
                  const isBenchmark = row.comparison === 'Benchmark';
                  const isOutperformer = row.comparison === 'Outperformed the market';
                  
                  return (
                    <tr 
                      key={index}
                      className={`transition-colors hover:bg-purple-50 ${
                        isBenchmark ? 'bg-blue-50/50' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-900">{row.asset}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <span className={`text-2xl font-bold ${
                            row.return >= 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {row.return >= 0 ? '+' : ''}{row.return.toFixed(2)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {isBenchmark ? (
                            <>
                              <BarChart3 className="w-5 h-5 text-blue-600" />
                              <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                                {row.comparison}
                              </span>
                            </>
                          ) : isOutperformer ? (
                            <>
                              <Trophy className="w-5 h-5 text-green-600" />
                              <span className="text-sm font-medium text-green-700 bg-green-100 px-3 py-1 rounded-full">
                                {row.comparison}
                              </span>
                            </>
                          ) : (
                            <>
                              <TrendingDown className="w-5 h-5 text-red-600" />
                              <span className="text-sm font-medium text-red-700 bg-red-100 px-3 py-1 rounded-full">
                                {row.comparison}
                              </span>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section Header */}
        <div className="text-center pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <LineChart className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Price Evolution Charts
            </h2>
          </div>
          <p className="text-gray-600">September 2025 - Individual Stock Performance</p>
        </div>

        {/* Chart 1: The Mosaic Co. (MOS) */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">Price Evolution of MOS - September 2025</h3>
            <p className="text-sm text-gray-600">The Mosaic Co. Adjusted Close Price (USD)</p>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={septemberData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="label" 
                label={{ value: 'Date', position: 'insideBottom', offset: -5 }}
                tick={{ fill: '#666' }}
              />
              <YAxis 
                label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft' }}
                tick={{ fill: '#666' }}
                domain={['dataMin - 1', 'dataMax + 1']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Line 
                type="linear" 
                dataKey="mosaic" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 6 }}
                activeDot={{ r: 8 }}
                name="MOS - The Mosaic Co."
                label={renderCustomLabel}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 2: Teck Resources (TECK) */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">Price Evolution of TECK - September 2025</h3>
            <p className="text-sm text-gray-600">Teck Resources Adjusted Close Price (USD)</p>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={septemberData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="label" 
                label={{ value: 'Date', position: 'insideBottom', offset: -5 }}
                tick={{ fill: '#666' }}
              />
              <YAxis 
                label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft' }}
                tick={{ fill: '#666' }}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Line 
                type="linear" 
                dataKey="teck" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 6 }}
                activeDot={{ r: 8 }}
                name="TECK - Teck Resources"
                label={renderCustomLabel}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 3: Procter & Gamble (PG) */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">Price Evolution of PG - September 2025</h3>
            <p className="text-sm text-gray-600">Procter & Gamble Adjusted Close Price (USD)</p>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={septemberData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="label" 
                label={{ value: 'Date', position: 'insideBottom', offset: -5 }}
                tick={{ fill: '#666' }}
              />
              <YAxis 
                label={{ value: 'Price (USD)', angle: -90, position: 'insideLeft' }}
                tick={{ fill: '#666' }}
                domain={['dataMin - 3', 'dataMax + 3']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Line 
                type="linear" 
                dataKey="pg" 
                stroke="#a855f7" 
                strokeWidth={3}
                dot={{ fill: '#a855f7', r: 6 }}
                activeDot={{ r: 8 }}
                name="PG - Procter & Gamble"
                label={renderCustomLabel}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>

        {/* Comparative Performance Chart */}
        <div className="text-center pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Comparative Performance Chart
            </h2>
          </div>
          <p className="text-gray-600">Normalized to 100 on August 29, 2025</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800">Monthly Performance Comparison - September 2025</h3>
            <p className="text-sm text-gray-600">All stocks normalized to 100 at base date (Aug 29, 2025)</p>
          </div>
          <ResponsiveContainer width="100%" height={450}>
            <RechartsLineChart 
              data={data.map(item => ({
                label: item.label,
                MOS: (item.mosaic / data[0].mosaic) * 100,
                TECK: (item.teck / data[0].teck) * 100,
                PG: (item.pg / data[0].pg) * 100,
                SPY: (item.spy / data[0].spy) * 100
              }))} 
              margin={{ top: 50, right: 30, left: 60, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="label" 
                label={{ value: 'Date', position: 'insideBottom', offset: -5 }}
                tick={{ fill: '#666' }}
              />
              <YAxis 
                label={{ value: 'Normalized (Base = 100)', angle: -90, position: 'insideLeft' , style: { textAnchor: 'middle'}, offset: -10, dx: -20}}
                tick={{ fill: '#666' }}
                domain={[95, 125]}
              />
              <Tooltip 
                formatter={(value) => value.toFixed(2)}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Legend 
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              <Line 
                type="linear" 
                dataKey="TECK" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 6 }}
                activeDot={{ r: 8 }}
                name="TECK - Teck Resources"
              />
              <Line 
                type="linear" 
                dataKey="MOS" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 6 }}
                activeDot={{ r: 8 }}
                name="MOS - The Mosaic Co."
              />
              <Line 
                type="linear" 
                dataKey="SPY" 
                stroke="#ef4444" 
                strokeWidth={3}
                strokeDasharray="5 5"
                dot={{ fill: '#ef4444', r: 6 }}
                activeDot={{ r: 8 }}
                name="SPY - S&P 500 (Market Benchmark)"
              />
              <Line 
                type="linear" 
                dataKey="PG" 
                stroke="#a855f7" 
                strokeWidth={3}
                dot={{ fill: '#a855f7', r: 6 }}
                activeDot={{ r: 8 }}
                name="PG - Procter & Gamble"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
          
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Key Insights:
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <Trophy className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span><strong className="text-green-700">TECK</strong> is the clear winner, showing the strongest growth throughout the month.</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingUp className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span><strong className="text-blue-700">MOS</strong> clearly outperformed the market benchmark (SPY).</span>
              </li>
              <li className="flex items-start gap-2">
                <TrendingDown className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span><strong className="text-purple-700">PG</strong> finished below its starting point, underperforming the market.</span>
              </li>
              <li className="flex items-start gap-2">
                <BarChart3 className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span><strong className="text-red-700">SPY</strong> (red dashed line) marks the market performance, which was exceeded by two of the stocks.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="text-green-600 font-bold">▲</span>
            <span>Increase</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold">▼</span>
            <span>Decrease</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>Prices in USD</span>
          </div>
        </div>
      </div>
    </div>
  );
}