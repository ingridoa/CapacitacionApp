import React, { useState, useEffect } from 'react';
import { AppView, UserRole, UserProfile, Course, AreaDistribution } from './types';
import { INGRID_USER, EDUARDO_ADMIN, INITIAL_COURSES, INITIAL_AREAS } from './data/mockData';
import { NavigationHeader } from './components/NavigationHeader';
import { BottomNavBar } from './components/BottomNavBar';
import { SiteMapModal } from './components/SiteMapModal';
import { OfficialCertificateModal } from './components/OfficialCertificateModal';

import { LoginView } from './views/LoginView';
import { QrSyncView } from './views/QrSyncView';
import { DashboardView } from './views/DashboardView';
import { CatalogView } from './views/CatalogView';
import { LessonView } from './views/LessonView';
import { CertificateView } from './views/CertificateView';
import { AdminView } from './views/AdminView';
import { ProfileView } from './views/ProfileView';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('login');
  const [currentRole, setCurrentRole] = useState<UserRole>('colaborador');
  const [user, setUser] = useState<UserProfile>(INGRID_USER);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [areas] = useState<AreaDistribution[]>(INITIAL_AREAS);
  const [isSiteMapOpen, setIsSiteMapOpen] = useState<boolean>(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);

  // Sync with browser hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as AppView;
      const validViews: AppView[] = [
        'login',
        'qr-sync',
        'dashboard',
        'catalogo',
        'leccion',
        'certificados',
        'admin',
        'perfil',
      ];
      if (validViews.includes(hash)) {
        setCurrentView(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view: AppView, role?: UserRole) => {
    setCurrentView(view);
    window.location.hash = view;
    if (role && role !== currentRole) {
      handleSetRole(role);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSetRole = (role: UserRole) => {
    setCurrentRole(role);
    if (role === 'admin') {
      setUser(EDUARDO_ADMIN);
    } else {
      setUser(INGRID_USER);
    }
  };

  const handleToggleRole = () => {
    const nextRole: UserRole = currentRole === 'colaborador' ? 'admin' : 'colaborador';
    handleSetRole(nextRole);
    if (nextRole === 'admin' && currentView === 'dashboard') {
      navigateTo('admin', 'admin');
    } else if (nextRole === 'colaborador' && currentView === 'admin') {
      navigateTo('dashboard', 'colaborador');
    }
  };

  const handleLogin = (role: UserRole) => {
    handleSetRole(role);
    if (role === 'admin') {
      navigateTo('admin');
    } else {
      navigateTo('dashboard');
    }
  };

  const handleLogout = () => {
    navigateTo('login');
  };

  const handleCourseCreated = (newCourse: Course) => {
    setCourses((prev) => [newCourse, ...prev]);
  };

  const handleCompleteCourse = () => {
    // Mark Course 1 as 100% completed
    setCourses((prev) =>
      prev.map((c) =>
        c.id === 'course-1'
          ? { ...c, progressPercent: 100 }
          : c
      )
    );
    setUser((prev) => ({
      ...prev,
      annualProgress: 100,
      completedCourses: prev.completedCourses + 1,
      inProgressCourses: Math.max(0, prev.inProgressCourses - 1),
      certifiedHours: prev.certifiedHours + 8,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col">
      {/* Top Application Header */}
      <NavigationHeader
        currentView={currentView}
        currentRole={currentRole}
        user={user}
        onNavigate={navigateTo}
        onToggleRole={handleToggleRole}
        onOpenSiteMap={() => setIsSiteMapOpen(true)}
      />

      {/* Main View Router */}
      <div className="flex-1">
        {currentView === 'login' && (
          <LoginView
            onLogin={handleLogin}
            onNavigate={navigateTo}
            onOpenSiteMap={() => setIsSiteMapOpen(true)}
          />
        )}

        {currentView === 'qr-sync' && (
          <QrSyncView
            onBack={() => navigateTo(currentRole === 'admin' ? 'admin' : 'dashboard')}
            onAuthorized={() => navigateTo('dashboard', 'colaborador')}
            onOpenSiteMap={() => setIsSiteMapOpen(true)}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            user={user}
            courses={courses}
            onNavigate={navigateTo}
            onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
          />
        )}

        {currentView === 'catalogo' && (
          <CatalogView
            courses={courses}
            onNavigate={navigateTo}
            onSelectCourse={() => {}}
          />
        )}

        {currentView === 'leccion' && (
          <LessonView
            onBack={() => navigateTo('dashboard')}
            onNavigate={navigateTo}
            onCompleteCourse={handleCompleteCourse}
          />
        )}

        {currentView === 'certificados' && (
          <CertificateView
            user={user}
            courses={courses}
            onNavigate={navigateTo}
            onBack={() => navigateTo('dashboard')}
          />
        )}

        {currentView === 'admin' && (
          <AdminView
            courses={courses}
            areas={areas}
            onCourseCreated={handleCourseCreated}
            onNavigate={navigateTo}
            onSwitchToStudent={() => navigateTo('dashboard', 'colaborador')}
          />
        )}

        {currentView === 'perfil' && (
          <ProfileView
            user={user}
            currentRole={currentRole}
            onToggleRole={handleToggleRole}
            onNavigate={navigateTo}
            onLogout={handleLogout}
          />
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar
        currentView={currentView}
        currentRole={currentRole}
        onNavigate={navigateTo}
      />

      {/* Floating Quick Links Hub Button */}
      {currentView !== 'login' && (
        <aside aria-label="Navegador de Enlaces" className="fixed bottom-20 right-3.5 z-40">
          <button
            onClick={() => setIsSiteMapOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold shadow-xl border border-slate-700 transition-all hover:scale-105 active:scale-95 group"
            title="Ver todas las páginas enlazadas y cambiar de vista"
          >
            <span className="material-symbols-outlined text-[17px] text-blue-400 group-hover:rotate-45 transition-transform">
              account_tree
            </span>
            <span className="hidden sm:inline">Páginas Enlazadas</span>
          </button>
        </aside>
      )}

      {/* Interactive Site Map and Route Flow Diagram Modal */}
      <SiteMapModal
        isOpen={isSiteMapOpen}
        onClose={() => setIsSiteMapOpen(false)}
        currentView={currentView}
        currentRole={currentRole}
        onNavigate={navigateTo}
      />

      {/* Official SENCE Certificate Modal */}
      <OfficialCertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        studentName={user.name}
      />
    </div>
  );
}
