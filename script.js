'use strict';

class FishingGame {
    constructor(maxTimer = 60000, maxFishes = 50) {
        this.maxTimer = maxTimer;
        this.maxFishes = maxFishes;
        this.field = {
            timer: document.getElementById('timer_value'),
            username: document.getElementById('username_value'),
            userscore: document.getElementById('userscore_value'),
            pool: document.getElementById('pool'),
            fishes: document.getElementsByClassName('fish'),
            pool_W: document.getElementById('pool').offsetWidth,
            pool_H: document.getElementById('pool').offsetHeight,
        };
    }
    start() {
        this.clearField();
        this.user = {
            name: prompt('Введите имя пользователя'),
            score: 0,
        }
        let time = this.maxTimer;

        this.field.username.innerText = `${this.user.name ? this.user.name : 'неизвестный'}`;

        const gameInterval = setInterval(() => {
            time -= 1000;
            this.field.timer.innerText = `${time / 1000} сек.`;
            this.createFish(3);
            
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
        this.clearField();
        alert('Игра окончена!');
    }
    clearField() {
        this.field.username.innerText = '';
        this.field.userscore.innerText = '0';
        this.field.timer.innerText = '0';
        this.field.pool.replaceChildren();
    }
    createFish(n) {
        for(let i = 1; i <= n; i++) {
            if(document.getElementsByClassName('fish').length < this.maxFishes) {
                let fish = document.createElement('div')
                fish.classList.add('fish');
                this.field.pool.append(fish);
                fish.onclick = () => {this.onClick(fish)};
                
                this.setFish(fish);
            }  
        }
    }
    setFish(fish) {
        let fishTop = Math.random() * this.field.pool_H - fish.offsetHeight;
        fish.style.top = ((fishTop < 0) ? 0 : fishTop) + 'px';
        
        let times = 0;
        function go() {
            console.log('GO');
            if(times % 2) {
                fish.style.left = '0px';
                fish.style.transform = 'scaleX(1)';
            } else {
                fish.style.left = 'calc(100% - 80px)'
                fish.style.transform = 'scaleX(-1)';
            }
        }
        go();
        fish.addEventListener('transitionend', function(event) {
            times++;
            go();
        });
    }
    onClick(fish) {
        fish.remove();
        this.userscore++;
        this.field.userscore.innerText = `${++this.user.score}`;
    }
}

const fishingGame = new FishingGame(60000, 10);
fishingGame.start();