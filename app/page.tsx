{results.map((item) => (
  <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-indigo-500/50 transition">
    {/* Wrapped image in an anchor tag to open full-size in a new tab */}
    <a href={item.image} target="_blank" rel="noopener noreferrer" className="h-40 bg-slate-900 overflow-hidden block">
      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
    </a>
    <div className="p-4 flex flex-col flex-1 justify-between">
      <div>
        <span className="text-[10px] uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-900">{item.category}</span>
        <h3 className="text-sm font-semibold mt-2 text-slate-200">{item.title}</h3>
      </div>
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-900 text-xs">
        <span className="text-slate-500">Match Score:</span>
        <span className="text-emerald-400 font-bold">{(item.score * 100).toFixed(0)}%</span>
      </div>
    </div>
  </div>
))}