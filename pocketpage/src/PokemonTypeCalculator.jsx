import React, { useState, useEffect } from 'react';
import './PokemonTypeCalculator.css';

const typeEffectiveness = {
  노말: {노말: 1, 불: 1, 물: 1, 풀: 1, 전기: 1, 얼음: 1, 격투: 1, 독: 1, 땅: 1, 비행: 1, 에스퍼: 1, 벌레: 1, 바위: 0.5, 고스트: 0, 드래곤: 1, 악: 1, 강철: 0.5, 페어리: 1},
  불: {노말: 1, 불: 0.5, 물: 0.5, 풀: 2, 전기: 1, 얼음: 2, 격투: 1, 독: 1, 땅: 1, 비행: 1, 에스퍼: 1, 벌레: 2, 바위: 0.5, 고스트: 1, 드래곤: 0.5, 악: 1, 강철: 2, 페어리: 1},
  물: {노말: 1, 불: 2, 물: 0.5, 풀: 0.5, 전기: 1, 얼음: 1, 격투: 1, 독: 1, 땅: 2, 비행: 1, 에스퍼: 1, 벌레: 1, 바위: 2, 고스트: 1, 드래곤: 0.5, 악: 1, 강철: 1, 페어리: 1},
  풀: {노말: 1, 불: 0.5, 물: 2, 풀: 0.5, 전기: 1, 얼음: 1, 격투: 1, 독: 0.5, 땅: 2, 비행: 0.5, 에스퍼: 1, 벌레: 0.5, 바위: 2, 고스트: 1, 드래곤: 0.5, 악: 1, 강철: 0.5, 페어리: 1},
  전기: {노말: 1, 불: 1, 물: 2, 풀: 0.5, 전기: 0.5, 얼음: 1, 격투: 1, 독: 1, 땅: 0, 비행: 2, 에스퍼: 1, 벌레: 1, 바위: 1, 고스트: 1, 드래곤: 0.5, 악: 1, 강철: 1, 페어리: 1},
  얼음: {노말: 1, 불: 0.5, 물: 0.5, 풀: 2, 전기: 1, 얼음: 0.5, 격투: 1, 독: 1, 땅: 2, 비행: 2, 에스퍼: 1, 벌레: 1, 바위: 1, 고스트: 1, 드래곤: 2, 악: 1, 강철: 0.5, 페어리: 1},
  격투: {노말: 2, 불: 1, 물: 1, 풀: 1, 전기: 1, 얼음: 2, 격투: 1, 독: 0.5, 땅: 1, 비행: 0.5, 에스퍼: 0.5, 벌레: 0.5, 바위: 2, 고스트: 0, 드래곤: 1, 악: 2, 강철: 2, 페어리: 0.5},
  독: {노말: 1, 불: 1, 물: 1, 풀: 2, 전기: 1, 얼음: 1, 격투: 1, 독: 0.5, 땅: 0.5, 비행: 1, 에스퍼: 1, 벌레: 1, 바위: 0.5, 고스트: 0.5, 드래곤: 1, 악: 1, 강철: 0, 페어리: 2},
  땅: {노말: 1, 불: 2, 물: 1, 풀: 0.5, 전기: 2, 얼음: 1, 격투: 1, 독: 2, 땅: 1, 비행: 0, 에스퍼: 1, 벌레: 0.5, 바위: 2, 고스트: 1, 드래곤: 1, 악: 1, 강철: 2, 페어리: 1},
  비행: {노말: 1, 불: 1, 물: 1, 풀: 2, 전기: 0.5, 얼음: 1, 격투: 2, 독: 1, 땅: 1, 비행: 1, 에스퍼: 1, 벌레: 2, 바위: 0.5, 고스트: 1, 드래곤: 1, 악: 1, 강철: 0.5, 페어리: 1},
  에스퍼: {노말: 1, 불: 1, 물: 1, 풀: 1, 전기: 1, 얼음: 1, 격투: 2, 독: 2, 땅: 1, 비행: 1, 에스퍼: 0.5, 벌레: 1, 바위: 1, 고스트: 1, 드래곤: 1, 악: 0, 강철: 0.5, 페어리: 1},
  벌레: {노말: 1, 불: 0.5, 물: 1, 풀: 2, 전기: 1, 얼음: 1, 격투: 0.5, 독: 0.5, 땅: 1, 비행: 0.5, 에스퍼: 2, 벌레: 1, 바위: 1, 고스트: 0.5, 드래곤: 1, 악: 2, 강철: 0.5, 페어리: 0.5},
  바위: {노말: 1, 불: 2, 물: 1, 풀: 1, 전기: 1, 얼음: 2, 격투: 0.5, 독: 1, 땅: 0.5, 비행: 2, 에스퍼: 1, 벌레: 2, 바위: 1, 고스트: 1, 드래곤: 1, 악: 1, 강철: 0.5, 페어리: 1},
  고스트: {노말: 0, 불: 1, 물: 1, 풀: 1, 전기: 1, 얼음: 1, 격투: 1, 독: 1, 땅: 1, 비행: 1, 에스퍼: 2, 벌레: 1, 바위: 1, 고스트: 2, 드래곤: 1, 악: 0.5, 강철: 1, 페어리: 1},
  드래곤: {노말: 1, 불: 1, 물: 1, 풀: 1, 전기: 1, 얼음: 1, 격투: 1, 독: 1, 땅: 1, 비행: 1, 에스퍼: 1, 벌레: 1, 바위: 1, 고스트: 1, 드래곤: 2, 악: 1, 강철: 0.5, 페어리: 0},
  악: {노말: 1, 불: 1, 물: 1, 풀: 1, 전기: 1, 얼음: 1, 격투: 0.5, 독: 1, 땅: 1, 비행: 1, 에스퍼: 2, 벌레: 1, 바위: 1, 고스트: 2, 드래곤: 1, 악: 0.5, 강철: 1, 페어리: 0.5},
  강철: {노말: 1, 불: 0.5, 물: 0.5, 풀: 1, 전기: 0.5, 얼음: 2, 격투: 1, 독: 1, 땅: 1, 비행: 1, 에스퍼: 1, 벌레: 1, 바위: 2, 고스트: 1, 드래곤: 1, 악: 1, 강철: 0.5, 페어리: 2},
  페어리: {노말: 1, 불: 0.5, 물: 1, 풀: 1, 전기: 1, 얼음: 1, 격투: 2, 독: 0.5, 땅: 1, 비행: 1, 에스퍼: 1, 벌레: 1, 바위: 1, 고스트: 1, 드래곤: 2, 악: 2, 강철: 0.5, 페어리: 1}
};

const types = Object.keys(typeEffectiveness);

const typeColors = {
  노말: '#A8A878', 불: '#F08030', 물: '#6890F0', 풀: '#78C850', 전기: '#F8D030',
  얼음: '#98D8D8', 격투: '#C03028', 독: '#A040A0', 땅: '#E0C068', 비행: '#A890F0',
  에스퍼: '#F85888', 벌레: '#A8B820', 바위: '#B8A038', 고스트: '#705898', 드래곤: '#7038F8',
  악: '#705848', 강철: '#B8B8D0', 페어리: '#EE99AC'
};

const PokemonTypeCalculator = () => {
  const [attackingType, setAttackingType] = useState('');
  const [defendingType1, setDefendingType1] = useState('');
  const [defendingType2, setDefendingType2] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    calculateEffectiveness();
  }, [attackingType, defendingType1, defendingType2]);

  const calculateEffectiveness = () => {
    if (!attackingType || !defendingType1) {
      setResult(null);
      return;
    }

    let effectiveness = typeEffectiveness[attackingType][defendingType1];
    if (defendingType2 && defendingType2 !== defendingType1) {
      effectiveness *= typeEffectiveness[attackingType][defendingType2];
    }

    const newResult = {
      attackingType,
      defendingType1,
      defendingType2,
      effectiveness,
      label: getEffectivenessLabel(effectiveness)
    };
    setResult(newResult);
  };

  const getEffectivenessLabel = (effectiveness) => {
    if (effectiveness === 0) return '효과 없음';
    if (effectiveness < 1) return '효과가 별로 없음';
    if (effectiveness > 1) return '효과가 굉장함';
    return '보통 효과';
  };

  const handleCalculate = () => {
    if (result) {
      setHistory(prevHistory => [result, ...prevHistory.slice(0, 4)]);
    }
  };

  return (
    <div className="pokemon-type-calculator">
      <h1>포켓몬 타입 계산기</h1>
      <div className="main-content">
        <div className="calculator-container">
          <div className="type-selectors">
            <div className="type-selector">
              <h2>공격 타입</h2>
              <div className="type-buttons">
                {types.map((type) => (
                  <button
                    key={type}
                    className={`type-button ${attackingType === type ? 'selected' : ''}`}
                    style={{backgroundColor: attackingType === type ? typeColors[type] : ''}}
                    onClick={() => setAttackingType(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="type-selector">
              <h2>방어 타입 1</h2>
              <div className="type-buttons">
                {types.map((type) => (
                  <button
                    key={type}
                    className={`type-button ${defendingType1 === type ? 'selected' : ''}`}
                    style={{backgroundColor: defendingType1 === type ? typeColors[type] : ''}}
                    onClick={() => setDefendingType1(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="type-selector">
              <h2>방어 타입 2 (선택사항)</h2>
              <div className="type-buttons">
                <button
                  className={`type-button ${defendingType2 === '' ? 'selected' : ''}`}
                  onClick={() => setDefendingType2('')}
                >
                  없음
                </button>
                {types.map((type) => (
                  <button
                    key={type}
                    className={`type-button ${defendingType2 === type ? 'selected' : ''}`}
                    style={{backgroundColor: defendingType2 === type ? typeColors[type] : ''}}
                    onClick={() => setDefendingType2(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button className="calculate-button" onClick={handleCalculate}>기록에 추가</button>
        </div>
        <div className="result-and-history">
          {result && (
            <div className="result">
              <h2>결과:</h2>
              <div className={`effectiveness ${result.label.replace(/ /g, '-')}`}>
                {result.label} ({result.effectiveness}배)
              </div>
            </div>
          )}
          <div className="history">
            <h2>기록</h2>
            {history.map((item, index) => (
              <div key={index} className="history-item">
                <span>{item.attackingType} vs {item.defendingType1}{item.defendingType2 ? `/${item.defendingType2}` : ''}</span>
                <span className={item.label.replace(/ /g, '-')}>{item.label} ({item.effectiveness}배)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonTypeCalculator;