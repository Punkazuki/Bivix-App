import React, { useState } from 'react';

const AppLayout = () => {
  const[activeTab, setActiveTab] = useState('home');

  // Mocks de Usuario y Mercado BIVIX
  const user = { balance: 145.20, commissionBalance: 12.50, streak: 4 };
  const market =[
    { symbol: 'BTC', price: '64,230.50', change: '+1.2%', color: 'text-[#00FF88]' },
    { symbol: 'ETH', price: '3,450.10', change: '-0.5%', color: 'text-red-500' },
    { symbol: 'SOL', price: '145.20', change: '+4.5%', color: 'text-[#00FF88]' },
    { symbol: 'TON', price: '5.80', change: '+0.1%', color: 'text-[#00FF88]' },
  ];

  return (
    <div className="h-screen bg-[#050505] text-white font-sans flex flex-col">
      {/* HEADER / TOP BAR BIVIX */}
      <div className="p-5 pb-2">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="font-mono font-bold tracking-widest text-[#00FF88] text-2xl">BIVIX</h1>
            <p className="text-[#E5E7EB] text-[10px] uppercase tracking-wider mt-1">Learn the Market, Trade the Future.</p>
          </div>
          {/* Botón de Soporte Anónimo BIVIX */}
          <a href="https://t.me/BIVIXSupport" target="_blank" rel="noreferrer" className="text-[#E5E7EB] hover:text-[#00FF88] transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
          </a>
        </div>

        {/* BALANCE BIVIX */}
        <div className="text-center py-4 mt-2 relative">
          <div className="absolute top-0 right-0 bg-[#1A1A1A] border border-[#00FF88]/30 px-2 py-1 rounded text-[#00FF88] text-xs font-mono">
            🔥 BIVIX Streak: {user.streak} Días
          </div>
          <p className="text-[#E5E7EB] text-sm mb-1 uppercase tracking-widest">Balance Total</p>
          <h2 className="text-4xl font-bold font-mono">
            $ {user.balance.toFixed(2)} <span className="text-sm text-[#00FF88]">USDT</span>
          </h2>
        </div>

        {/* ACCIONES RÁPIDAS */}
        <div className="flex gap-3 mt-4">
          <button className="flex-1 bg-[#00FF88] text-black font-bold py-2.5 rounded-lg hover:bg-green-400 transition shadow-[0_0_15px_rgba(0,255,136,0.3)]">
            Depositar
          </button>
          <button className="flex-1 bg-[#1A1A1A] border border-gray-800 text-[#E5E7EB] font-bold py-2.5 rounded-lg hover:border-[#00FF88] hover:text-[#00FF88] transition">
            Retirar
          </button>
        </div>
      </div>

      {/* ÁREA DE CONTENIDO DINÁMICO */}
      <div className="flex-1 overflow-y-auto px-5 pb-20">
        
        {activeTab === 'home' && (
          <>
            {/* BIVIX Care (Transparencia Anónima) */}
            <div className="mt-4 mb-6 bg-gradient-to-r from-[#00FF88]/10 to-[#050505] border border-[#00FF88]/30 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:border-[#00FF88] transition">
              <div>
                <h3 className="text-sm font-bold text-[#00FF88] flex items-center gap-2">
                  <span>🌍</span> BIVIX Care
                </h3>
                <p className="text-[11px] text-[#E5E7EB] mt-1">Comisión BIVIX Care (4%) para donaciones escolares.</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 uppercase font-mono">Aportado</p>
                <p className="font-mono text-[#00FF88] font-bold">$1,250.40</p>
              </div>
            </div>

            {/* Mercados BIVIX */}
            <h3 className="text-[#E5E7EB] text-sm uppercase tracking-widest mb-3 font-mono">Mercado Activo</h3>
            <div className="space-y-3">
              {market.map((coin) => (
                <div key={coin.symbol} className="bg-[#0A0A0A] border border-gray-800 rounded-lg p-3 flex justify-between items-center hover:border-gray-600 transition">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-xs font-bold text-[#E5E7EB]">{coin.symbol[0]}</div>
                    <span className="font-bold text-[#E5E7EB]">{coin.symbol}/USDT</span>
                  </div>
                  <div className="text-right font-mono">
                    <p className="text-white">${coin.price}</p>
                    <p className={`text-xs ${coin.color}`}>{coin.change}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Tab BIVIX Academy */}
        {activeTab === 'academy' && (
          <div className="mt-4">
             <h2 className="text-xl font-bold mb-2 text-[#00FF88] font-mono">BIVIX Academy 🎓</h2>
             <p className="text-sm text-[#E5E7EB] mb-6">Valida tus conocimientos y gana rendimientos.</p>
             <div className="bg-[#0A0A0A] border border-gray-800 rounded-xl p-5 mb-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#00FF88] text-black text-[10px] font-bold px-2 py-1 rounded-bl-lg">LISTO</div>
                <h3 className="font-bold text-lg">Módulo 1: Análisis de Tendencia</h3>
                <p className="text-xs text-[#E5E7EB] mt-1 mb-4">Recompensa: +$0.80 USDT</p>
                <button className="w-full bg-[#1A1A1A] border border-[#00FF88] text-[#00FF88] py-2 rounded-lg font-bold hover:bg-[#00FF88] hover:text-black transition">
                  INICIAR EVALUACIÓN
                </button>
             </div>
          </div>
        )}

        {/* Tab BIVIX Team (Referidos) */}
        {activeTab === 'team' && (
          <div className="mt-4">
             <h2 className="text-xl font-bold mb-2 text-[#00FF88] font-mono">BIVIX Team 🤝</h2>
             <p className="text-sm text-[#E5E7EB] mb-6">Gana hasta en 3 niveles de profundidad (3% - 2% - 1%).</p>
             <div className="bg-[#0A0A0A] border border-gray-800 rounded-xl p-5 flex flex-col items-center">
                <p className="text-[#E5E7EB] text-sm mb-2">Comisiones Disponibles</p>
                <h3 className="text-2xl font-bold font-mono text-[#00FF88] mb-4">${user.commissionBalance.toFixed(2)} USDT</h3>
                <button className="w-full bg-[#1A1A1A] border border-[#00FF88] text-[#00FF88] py-2 rounded-lg font-bold hover:bg-[#00FF88] hover:text-black transition">
                  RETIRAR COMISIONES
                </button>
             </div>
          </div>
        )}
      </div>

      {/* BOTTOM TABS BIVIX */}
      <div className="fixed bottom-0 w-full bg-[#050505] border-t border-[#1A1A1A] flex justify-around items-center py-4 pb-6 px-2">
        {[
          { id: 'home', icon: '📊', name: 'Exchange' },
          { id: 'academy', icon: '🎓', name: 'Academy' },
          { id: 'wallet', icon: '💳', name: 'Wallet' },
          { id: 'team', icon: '🤝', name: 'Team' }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 ${activeTab === tab.id ? 'text-[#00FF88]' : 'text-gray-500'}`}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${activeTab === tab.id ? 'bg-[#00FF88]/10' : ''}`}>
              {tab.icon}
            </div>
            <span className="text-[10px] uppercase tracking-wider font-bold">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppLayout;
