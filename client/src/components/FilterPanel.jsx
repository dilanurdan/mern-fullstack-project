import "./FilterPanel.css";

function FilterPanel({
  category,
  setCategory,
  level,
  setLevel,
  sort,
  setSort,
  categories
}) {
  return (
    <div className="filter-panel">
      
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Tümü">Tüm Kategoriler</option>

        {categories?.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="Tümü">Tüm Seviyeler</option>
        <option value="Başlangıç">Başlangıç</option>
        <option value="Orta">Orta</option>
        <option value="İleri">İleri</option>
      </select>

      
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Varsayılan Sıralama</option>
        <option value="price-asc">Fiyat (Artan)</option>
        <option value="price-desc">Fiyat (Azalan)</option>
        <option value="rating-desc">
          Puan (Yüksekten Düşüğe)
        </option>
      </select>

    </div>
  );
}

export default FilterPanel;