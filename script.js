'use strict';

class fishingGame {
    constructor(maxTimer = 10000, maxFish = 10) {
        this.maxFish = maxFish;
        this.maxTimer = maxTimer;
        this.fishList = [];
        this.field = {
            timer: document.getElementById('timer'),
            username: document.getElementById('username'),
            userscore: document.getElementById('userscore'),
            pool: document.getElementById('pool'),
            pool_W: document.getElementById('pool').offsetWidth,
            pool_H: document.getElementById('pool').offsetHeight,
        };
    }
    start() {
        this.fishList = [...this.createFish(3)];
        this.user = {
            name: prompt('Введите имя пользователя'),
            score: 0,
        }
        let time = this.maxTimer;

        this.field.username.innerHTML = `Имя: ${this.user.name ? this.user.name : 'неизвестный'}`;

        const gameInterval = setInterval(() => {
            time -= 1000;
            this.field.timer.innerHTML = `До конца: ${time / 1000} сек.`;
            this.fishList.push(...this.createFish(12));
            
            if(time < 0) {
                clearInterval(gameInterval)
                const restart = confirm(`
                Игра закончена! Ваш счет: ${this.user.score}
                Сыграть еще раз?
                `);
                if(restart) this.start();
                else this.end();
            };
        }, 1000);
    }
    end() {
        this.fishList = [];
        alert('Игра закончена');
    }
    createFish(n) {
        let newFishes = [];
        for(let i = 1; i <= n; i++) {
            let fishNode = document.createElement('div');
            let rect = fishNode.getBoundingClientRect();
            fishNode.classList.add('fish');
            this.field.pool.append(fishNode);
            newFishes.push(fishNode);

            fishNode.style.top = (Math.random() * this.field.pool_H - fishNode.offsetWidth) + 'px';
            fishNode.style.left = (Math.random() * this.field.pool_W - fishNode.offsetHeight) + 'px';

            fishNode.onclick = () => {
                fishNode.remove();
                this.userscore++;
                this.field.userscore.innerHTML = `Ваш счет: ${++this.user.score}`;
            };
        }
        return newFishes;
    }
}

const newGame = new fishingGame();
newGame.start();