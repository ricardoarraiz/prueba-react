import './PokemonStats.css'

export default function PokemonStats({ stats }) {
  return (
    <div className="pokedex-block stats-block">
      <div className="block-header">
        <h2>
          <span className="block-icon">📊</span>
          Estadísticas Base
        </h2>
        <p className='att'>Atributos principales de combate</p>
      </div>

      {stats && stats.length > 0 ? (
        <div className="stats-list">
          {stats.map(s => {
            const statKey = s.stat.name.toLowerCase();
            const percentage = Math.min((s.base_stat / 255) * 100, 100);

            return (
              <div key={s.stat.name} className={`stat-row stat-${statKey}`}>
                <div className="stat-info">
                  <span className="stat-name">
                    {s.stat.name.replace('-', ' ').toUpperCase()}
                  </span>
                  <span className="stat-value">{s.base_stat}</span>
                </div>

                <div className="stat-bar-track">
                  <div
                    className="stat-bar-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="no-data">Sin estadísticas disponibles</p>
      )}
    </div>
  );
}