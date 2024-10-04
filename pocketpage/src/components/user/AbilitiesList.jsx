// src/components/AbilitiesList.js
import React from 'react';

function AbilitiesList({ data }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>특성 이름</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => {
            const ability = data[key];
            return (
              <tr key={key}>
                <td>{ability.ability_name}</td>
                <td>{ability.ability_description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AbilitiesList;
