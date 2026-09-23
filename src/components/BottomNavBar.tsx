import React from 'react';
import { AppView, UserRole } from '../types';

interface BottomNavBarProps {
  currentView: AppView;
  currentRole: UserRole;
  onNavigate: (view: AppView) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentView,
  currentRole,
  onNavigate,
}) => {
  // Hide in login screen
  if (currentView === 'login') return null;

  const items = [
    {
      id: currentRole === 'admin' ? 'admin' : 'dashboard',
      label: 'Inicio',
      icon: 'home',
      active: currentView === 'dashboard' || currentView === 'admin',
    },
    {
      id: 'catalogo',
      label: 'Cursos',
      icon: 'school',
      active: currentView === 'catalogo' || currentView === 'leccion',
    },
    {
      id: 'certificados',
      label: 'Certificados',
      icon: 'verified',
      active: currentView === 'certificados',
    },
    {
      id: 'perfil',
      label: 'Perfil',
      icon: 'person',
      active: currentView === 'perfil',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const isActive = item.active;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.id as AppView)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-all duration-150 active:scale-95 ${
                isActive ? 'text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className={`material-symbols-outlined text-[22px] ${
                    isActive ? 'material-symbols-fill' : ''
                  }`}
                >
                  {item.icon}
                </span>
              </div>
              <span className="text-[11px] tracking-tight mt-0.5">{item.label}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
