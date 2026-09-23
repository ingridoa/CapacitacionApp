import React, { useState } from 'react';

interface OfficialCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName?: string;
  courseTitle?: string;
  score?: number;
  hours?: number;
  senceCode?: string;
}

export const OfficialCertificateModal: React.FC<OfficialCertificateModalProps> = ({
  isOpen,
  onClose,
  studentName = 'Ingrid Oyarzún',
  courseTitle = 'Nueva Ley de Protección de Datos Personales N° 21.719 en Chile',
  score = 98,
  hours = 16,
  senceCode = '4892-CL',
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-400 text-[20px]">verified</span>
            <span className="text-sm font-bold tracking-tight">Certificado Oficial Acreditado SENCE</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Certificate Canvas / Frame */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1 bg-slate-50 flex flex-col items-center">
          <div className="w-full bg-white p-6 sm:p-8 rounded-xl border-4 border-double border-slate-300 shadow-md relative overflow-hidden text-center max-w-xl">
            {/* Watermark / Seal Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <span className="material-symbols-outlined text-[320px]">corporate_fare</span>
            </div>

            {/* Header / Logos */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
              <div className="text-left">
                <span className="text-base font-extrabold text-slate-900 block leading-tight">Viatech Capacita</span>
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">OTEC Registro N° 98231-CL</span>
              </div>
              <div className="text-right">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Código SENCE #{senceCode}
                </span>
                <p className="text-[10px] text-slate-400 mt-0.5">Vigencia Oficial 2026</p>
              </div>
            </div>

            <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-1">
              Certificado de Aprobación & Suficiencia
            </p>
            <p className="text-xs text-slate-600 mb-4">Se certifica por el presente documento que:</p>

            {/* Student Name */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-serif italic mb-2">
              {studentName}
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              R.U.T. 16.482.910-K • Banco de Chile / Legal & Compliance Corporativo
            </p>

            <p className="text-xs text-slate-700 leading-relaxed max-w-md mx-auto mb-4">
              Ha completado y aprobado satisfactoriamente con nota de excelencia el programa de formación corporativa:
            </p>

            {/* Course Title */}
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-lg mb-5">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                {courseTitle}
              </h3>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 border-y border-slate-200 py-3 mb-6 text-center">
              <div>
                <p className="text-xs text-slate-400">Puntaje Final</p>
                <p className="text-lg font-extrabold text-slate-900">{score}%</p>
              </div>
              <div className="border-x border-slate-200">
                <p className="text-xs text-slate-400">Horas Acreditadas</p>
                <p className="text-lg font-extrabold text-slate-900">{hours} hrs</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Asistencia</p>
                <p className="text-lg font-extrabold text-emerald-600">100%</p>
              </div>
            </div>

            {/* Signatures & Security Hash */}
            <div className="flex items-end justify-between pt-2">
              <div className="text-center w-36">
                <div className="border-b border-slate-400 mb-1 pb-1">
                  <span className="font-serif italic text-xs text-slate-700">Dr. Roberto Valenzuela</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">Director Académico Viatech</p>
              </div>

              {/* QR Verification Seal */}
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-slate-900 text-white p-1 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[32px]">qr_code_2</span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 mt-1">Hash: #9a4f-21719</span>
              </div>

              <div className="text-center w-36">
                <div className="border-b border-slate-400 mb-1 pb-1">
                  <span className="font-serif italic text-xs text-slate-700">Eduardo Peña</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">Dirección de Formación TI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all active:scale-95"
            >
              {downloading ? (
                <>
                  <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                  <span>Generando PDF...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Descargar Certificado Oficial (PDF)</span>
                </>
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              <span>Imprimir</span>
            </button>
          </div>

          {downloadSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              ¡PDF descargado con éxito!
            </span>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 font-medium text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
