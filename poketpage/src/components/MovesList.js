// src/components/MovesList.js
import React from 'react';

function MovesList({ data }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>기술 이름</th>
            <th>타입</th>
            <th>분류</th>
            <th>위력</th>
            <th>명중</th>
            <th>PP</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key) => {
            const move = data[key];
            return (
              <tr key={key}>
                <td>{move.move_name}</td>
                <td>{move.move_type}</td>
                <td><img className="item-image" src={move.move_class_img} alt="class image" /></td>
                <td>{move.move_power}</td>
                <td>{move.move_accuracy}</td>
                <td>{move.move_pp}</td>
                <td>{move.move_description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MovesList;
