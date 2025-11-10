export default function Tip() {
  return (
    <div className="bg-linear-to-br from-purple-900/20 to-blue-900/20 border border-purple-800/30 rounded-xl p-6">
      <h3 className="text-sm font-semibold text-purple-300 mb-3">Consejos</h3>
      <ul className="space-y-2 text-xs text-gray-400">
        <li className="flex items-start gap-2">
          <span className="text-purple-400 mt-0.5">•</span>
          <span>Usa un título claro y descriptivo</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-purple-400 mt-0.5">•</span>
          <span>La descripción aparecerá en las vistas previas</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-purple-400 mt-0.5">•</span>
          <span>Usa imágenes de alta calidad para la portada</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-purple-400 mt-0.5">•</span>
          <span>Formatea el contenido para mejor legibilidad</span>
        </li>
      </ul>
    </div>
  );
}
