import React, { useState } from 'react';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newDigits = [...digits];
    newDigits[index] = val.slice(-1);
    setDigits(newDigits);
    setError(false);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join('');
    if (code.length < 6) {
      setError(true);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSuccess();
      onClose();
    }, 600);
  };

  const handleFillDemoCode = () => {
    setDigits(['8', '4', '9', '2', '1', '0']);
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">pin</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Código de 6 Dígitos</h3>
        <p className="text-xs text-slate-500 mt-1 mb-5">
          Ingresa la clave temporal dinámica generada por tu token corporativo o app móvil Viatech.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between gap-1.5">
            {digits.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`w-11 h-12 text-center text-xl font-bold font-mono rounded-lg border focus:outline-none transition-all ${
                  error
                    ? 'border-red-500 bg-red-50/50 text-red-700 focus:ring-2 focus:ring-red-200'
                    : 'border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900'
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-xs text-red-600 font-medium">Por favor ingresa los 6 dígitos completos.</p>
          )}

          <div className="flex items-center justify-between text-xs pt-1">
            <button
              type="button"
              onClick={handleFillDemoCode}
              className="text-blue-600 hover:underline font-semibold"
            >
              Autocompletar clave demo
            </button>
            <span className="text-slate-400">Validez: 3 min</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>
                <span>Verificando puesto...</span>
              </>
            ) : (
              <>
                <span>Validar & Vincular Sesión</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
