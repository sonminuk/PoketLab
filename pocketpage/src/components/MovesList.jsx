import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import './MovesList.css';

function MovesList({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredAndSortedData = useMemo(() => {
    let result = Object.entries(data);

    if (searchTerm) {
      result = result.filter(([_, move]) =>
        move.move_name.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="moves-list-container">
      <div className="search-container">
        <Search size={20} />
        <input
          type="text"
          placeholder="기술 이름 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('move_name')}>
                기술 이름 <SortIcon column="move_name" />
              </th>
              <th onClick={() => handleSort('move_type')}>
                타입 <SortIcon column="move_type" />
              </th>
              <th>분류</th>
              <th onClick={() => handleSort('move_power')}>
                위력 <SortIcon column="move_power" />
              </th>
              <th onClick={() => handleSort('move_accuracy')}>
                명중 <SortIcon column="move_accuracy" />
              </th>
              <th onClick={() => handleSort('move_pp')}>
                PP <SortIcon column="move_pp" />
              </th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map(([key, move]) => (
              <tr key={key}>
                <td>{move.move_name}</td>
                <td>{move.move_type}</td>
                <td>
                  <img className="move-class-image" src={move.move_class_img} alt="class image" />
                </td>
                <td>{move.move_power}</td>
                <td>{move.move_accuracy}</td>
                <td>{move.move_pp}</td>
                <td>{move.move_description}</td>
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

export default MovesList;