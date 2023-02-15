'use strict';

const fishList = [];
const maxFish = 10;
const field = {
    timer: document.getElementById('timer'),
    username: document.getElementById('username'),
    userScore: document.getElementById('userscore'),
    pool: document.getElementById('pool'),
    pool_W: document.getElementById('pool').clientWidth,
    pool_H: document.getElementById('pool').clientHeight,
};

function createFish(n) {
    for(let i = 1; i <= n; i++) {
        let fishNode = document.createElement('div');
        fishNode.classList.add('fish');
        fishNode.style.top = (Math.random() * field.pool_H - fishNode.clientWidth) + 'px';
        fishNode.style.left = (Math.random() * field.pool_W - fishNode.clientHeight) + 'px';
        fishList.push(fishNode);
        field.pool.append(fishNode);
        console.log(fishNode);
        console.log(fishList);
    }
    return fishList;
}

function main() {
    let timer = 10000;

    const user = {
        name: prompt('Введите имя пользователя'),
        score: 0,
    }

    field.username.innerHTML = `Имя: ${user.name ? user.name : 'неизвестный'}`;

    const gameInterval = setInterval(() => {
        field.timer.innerHTML = `До конца: ${timer / 1000} сек.`;
        timer -= 1000;
        createFish(1);
    }, 1000);
    
    setTimeout(()=>{
        clearInterval(gameInterval)
        confirm(`
        Игра закончена! Ваш счет: ${user.score}
        Сыграть еще раз?
        `);
    }, timer);
}

main();