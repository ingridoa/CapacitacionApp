import React, { useState } from 'react';
import { Course } from '../types';

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCourseCreated: (newCourse: Course) => void;
}

export const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  isOpen,
  onClose,
  onCourseCreated,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Seguridad TI');
  const [description, setDescription] = useState('');
  const [durationHours, setDurationHours] = useState(8);
  const [mandatory, setMandatory] = useState(true);
  const [senceCode, setSenceCode] = useState('#SENCE-2025');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newCourse: Course = {
      id: `course-${Date.now()}`,
      code: `CORP-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      category,
      description: description || 'Programa corporativo para colaboradores con acreditación oficial.',
      status: 'publicado',
      mandatory,
      mandatoryLabel: mandatory ? 'Obligatorio' : 'Optativo',
      progressPercent: 0,
      rating: 5.0,
      reviewCount: 1,
      durationHours: Number(durationHours) || 8,
      durationLabel: `${durationHours} hrs lectivas`,
      modulesCount: 3,
      videosCount: 6,
      quizzesCount: 2,
      enrolledCount: 45,
      senceCode,
      coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaAH1DOizGGKZ5l9eab_I89YaM2n3hSt5cTUn7GeDFy_J4mqQ8OcuhdUJX1fW523qw21bHk3_VbHJhhvXNcG_PxUNgyW4JfbSrXyeMYXuza_k8B5xkyuR_K1TFFwECmRZhb5HAGreyAlUmZfGE-cI2LlCpPJfGq5GpX_9E6tZNvItY0jVqVZaM-1pR0cmY1H4TX-_EQC4LD_CUyHG6faiEB0YtH0EirPlgB4jCQCSC0f5brvpIoW4m',
      deadline: '30 días restantes',
    };

    onCourseCreated(newCourse);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Crear Nuevo Curso Corporativo</h3>
              <p className="text-xs text-slate-500">Módulo de producción formativa</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Título del Curso</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Prevención de Fraude Bancario y Criptoseguridad"
              className="w-full h-10 px-3 border border-slate-300 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
              >
                <option value="Seguridad TI">Seguridad TI</option>
                <option value="Compliance & Legal">Compliance & Legal</option>
                <option value="Finanzas & Tributario">Finanzas & Tributario</option>
                <option value="Metodologías Ágiles">Metodologías Ágiles</option>
                <option value="Liderazgo Corporativo">Liderazgo Corporativo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Horas Acreditadas</label>
              <input
                type="number"
                min={1}
                max={120}
                value={durationHours}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                className="w-full h-10 px-3 border border-slate-300 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Código SENCE / Franquicia</label>
            <input
              type="text"
              value={senceCode}
              onChange={(e) => setSenceCode(e.target.value)}
              placeholder="#SENCE-4892"
              className="w-full h-10 px-3 border border-slate-300 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Descripción Breve</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Objetivos de aprendizaje y alcance corporativo..."
              className="w-full p-2.5 border border-slate-300 rounded-lg text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
            ></textarea>
          </div>

          <label className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={mandatory}
              onChange={(e) => setMandatory(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
            />
            <div className="text-xs">
              <span className="font-bold text-slate-800 block">Curso de Acreditación Obligatoria</span>
              <span className="text-slate-500">Se asignará automáticamente a las cuadrillas seleccionadas</span>
            </div>
          </label>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg shadow-sm"
            >
              Guardar y Publicar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
