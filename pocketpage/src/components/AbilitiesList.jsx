import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import './AbilitiesList.css';

function AbilitiesList({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAndSortedData = useMemo(() => {
    let result = Object.entries(data);

    if (searchTerm) {
      result = result.filter(([_, ability]) =>
        ability.ability_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ability.ability_description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortColumn) {
      result.sort(([, a], [, b]) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchTerm, sortColumn, sortDirection]);

  const pageCount = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const displayedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ column }) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  return (
    <div className="abilities-list">
      <div className="search-container">
        <Search size={20} />
        <input
          type="text"
          placeholder="특성 이름 또는 설명 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('ability_name')}>
                특성 이름 <SortIcon column="ability_name" />
              </th>
              <th onClick={() => handleSort('ability_description')}>
                설명 <SortIcon column="ability_description" />
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map(([key, ability]) => (
              <tr key={key}>
                <td>{ability.ability_name}</td>
                <td>{ability.ability_description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
          disabled={currentPage === 1}
        >
          이전
        </button>
        <span>{currentPage} / {pageCount}</span>
        <button
          onClick={() => setCurrentPage(page => Math.min(pageCount, page + 1))}
          disabled={currentPage === pageCount}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default AbilitiesList;