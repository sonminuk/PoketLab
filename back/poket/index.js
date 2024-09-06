// Firebase 설정 객체
const firebaseConfig = {
    apiKey: "AIzaSyBpkNcOOgCGxJEe9Yft41nYnr1tY1JGLEQ",
    authDomain: "poketlab-590f5.firebaseapp.com",
    databaseURL: "https://poketlab-590f5-default-rtdb.firebaseio.com",
    projectId: "poketlab-590f5",
    storageBucket: "poketlab-590f5.appspot.com",
    messagingSenderId: "1074824942472",
    appId: "1:1074824942472:web:4bc917cc5180ab93d8203d",
    measurementId: "G-4Q6XF2ZHV3"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);

// 데이터베이스 참조
const database = firebase.database();

// 데이터 표시 함수 정의
function displayPokemon(data) {
    const pokemonTableBody = document.getElementById('pokemonTable').getElementsByTagName('tbody')[0];
    pokemonTableBody.innerHTML = '';
    Object.keys(data).forEach(key => {
        const pokemon = data[key];
        const row = pokemonTableBody.insertRow();
        row.innerHTML = `
            <td><img class="item-image" src="${pokemon.img_href}" alt="${pokemon.name}"></td>
            <td>${pokemon.name}</td>
            <td>${pokemon.types}</td>
            <td>${pokemon.abilities}</td>
            <td>${pokemon.hp}</td>
            <td>${pokemon.attack}</td>
            <td>${pokemon.defense}</td>
            <td>${pokemon.sp_attack}</td>
            <td>${pokemon.sp_defense}</td>
            <td>${pokemon.speed}</td>
            <td>${pokemon.total}</td>
        `;
    });
}

function displayMoves(data) {
    const movesTableBody = document.getElementById('movesTable').getElementsByTagName('tbody')[0];
    movesTableBody.innerHTML = '';
    Object.keys(data).forEach(key => {
        const move = data[key];
        const row = movesTableBody.insertRow();
        row.innerHTML = `
            <td>${move.move_name}</td>
            <td>${move.move_type}</td>
            <td><img class="item-image" src="${move.move_class_img}" alt="class image"></td>
            <td>${move.move_power}</td>
            <td>${move.move_accuracy}</td>
            <td>${move.move_pp}</td>
            <td>${move.move_description}</td>
        `;
    });
}

function displayAbilities(data) {
    const abilitiesTableBody = document.getElementById('abilitiesTable').getElementsByTagName('tbody')[0];
    abilitiesTableBody.innerHTML = '';
    Object.keys(data).forEach(key => {
        const ability = data[key];
        const row = abilitiesTableBody.insertRow();
        row.innerHTML = `
            <td>${ability.ability_name}</td>
            <td>${ability.ability_description}</td>
        `;
    });
}

// 데이터 가져오기 및 표시
database.ref('pokemon').on('value', snapshot => {
    const data = snapshot.val();
    console.log("Fetched pokemon data (limited and ordered):", data);
    displayPokemon(data);
});

database.ref('moves').on('value', snapshot => {
    const data = snapshot.val();
    console.log("Fetched moves data (limited and ordered):", data);
    displayMoves(data);
});

database.ref('abilities').on('value', snapshot => {
    const data = snapshot.val();
    console.log("Fetched abilities data (limited and ordered):", data);
    displayAbilities(data);
});
