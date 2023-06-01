const body = document.body;
const container = document.querySelector('.container');
const darkMeta = document.querySelector('meta[name="theme-color"]');

let userInfo = {
    firstLogin: true,
    darkTheme: false,
    victories: 0,
    losses: 0,
};

getResponse();

function getResponse(){
    if(localStorage.getItem('userInfo')){
        let userLocalInfo = localStorage.getItem('userInfo');
        userInfo = JSON.parse(userLocalInfo);

    }

    if(userInfo.darkTheme){
        body.classList.add('dark-theme');
        darkMeta.content = '#111111';
    } else {
        return;
    }
};

// прелоадер

preloader(userInfo)
function preloader(userInfo){
    body.innerHTML += `
    <div class="preloader invisible">
        <div class="loader">loading</div>
    </div>`;
    let preloader = body.querySelector('.preloader');

    setTimeout(() => {
        preloader.classList.remove('invisible');
    }, 200);
    setTimeout(() => {
        preloader.classList.add('invisible');
    }, 2000);
    const container = body.querySelector('.container');

    if(userInfo.firstLogin){
        setTimeout(modal, 3000);
    } else {
        setTimeout(createGame, 3000);
    }
};

// модальное окно приветствия

function modal() {
    const container = body.querySelector('.container');
    container.innerHTML = `
    <div class="modal hello-modal invisible">
        <p class="modal__title">Здравствуйте</p>
        <p class="modal__text">Добро пожаловать в игру</p>
        <p class="modal__title">"Крестики - Нолики"</p>
        <button class="button modal__button" id="next">Продолжить</button>
    </div>`;

    setTimeout(() => {
        container.querySelector('.hello-modal').classList.remove('invisible');
    }, 200);

    const nextButton = container.querySelector('#next');
    nextButton.addEventListener('click', (event) => {
        userInfo.firstLogin = false;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        
        container.querySelector('.hello-modal').classList.add('invisible');
        createGame(container);
    });
};

// Отрисовка игрового интерфейса

function createGame(){
    const container = body.querySelector('.container');
    let header = document.createElement('header');
    header.className = 'header invisible';
    header.innerHTML = `
    <button class="button" id="dark-theme-button">Темная тема</button>
    <button class="button" id="result-button">Ваши результаты</button>
    `;
    container.innerHTML ='';
    container.appendChild(header);
    setTimeout(() => {
        header.classList.remove('invisible');
    }, 200);
    darkTheme();
    modalResult();
    let section = document.createElement('section');
    section.className = 'game transform';
    section.id = 'game';
    container.appendChild(section);
    setTimeout(() => {
        section.classList.remove('transform')
    }, 200);
    createFields(section);
};


// подсчет побед

function userWinOrLose(result){
    if(result == 'win'){
        userInfo.victories++;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else if (result == 'lose'){
        userInfo.losses++;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else{
        return;
    }
};


// отрисовка полей

function createFields(section){
    let field = {
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
        7: '',
        8: '',
        9: '',
    };
    for(let i = 1; i <= 9; i++){
        let div = document.createElement('div');
        div.className = 'game-field transform';
        div.id = i;
        section.appendChild(div);
        element = div;
        setTimeout(() => {
            div.classList.remove('transform');
        }, 800);
    
        div.addEventListener('click', (event, element) => {
            let currentField = event.target.id;
            field[currentField] = 'cross';

            if(!div.innerHTML){
                div.innerHTML = '<svg class="cross"><use xlink:href="#cross"></use></svg>';
            } else {
                return;
            }

            
            let result;
            let gameOver = false;

            // Проверка на победу / проигрыш

            if((field[1] == 'cross' && field[2] == 'cross' && field[3] == 'cross')){
                result = 'win';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[4] == 'cross' && field[5] == 'cross' && field[6] == 'cross')){
                result = 'win';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[7] == 'cross' && field[8] == 'cross' && field[9] == 'cross')){
                result = 'win';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[1] == 'cross' && field[4] == 'cross' && field[7] == 'cross')){
                result = 'win';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[2] == 'cross' && field[5] == 'cross' && field[8] == 'cross')){
                result = 'win';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[3] == 'cross' && field[6] == 'cross' && field[9] == 'cross')){
                result = 'win';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[1] == 'cross' && field[5] == 'cross' && field[9] == 'cross')){
                result = 'win';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[3] == 'cross' && field[5] == 'cross' && field[7] == 'cross')){
                result = 'win';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if((field[1] == 'circle' && field[2] == 'circle' && field[3] == 'circle')){
                result = 'lose';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[4] == 'circle' && field[5] == 'circle' && field[6] == 'circle')){
                result = 'lose';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[7] == 'circle' && field[8] == 'circle' && field[9] == 'circle')){
                result = 'lose';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[1] == 'circle' && field[4] == 'circle' && field[7] == 'circle')){
                result = 'lose';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[2] == 'circle' && field[5] == 'circle' && field[8] == 'circle')){
                result = 'lose';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[3] == 'circle' && field[6] == 'circle' && field[9] == 'circle')){
                result = 'lose';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[1] == 'circle' && field[5] == 'circle' && field[9] == 'circle')){
                result = 'lose';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            } else if ((field[3] == 'circle' && field[5] == 'circle' && field[7] == 'circle')){
                result = 'lose';
                gameOver = true;
                userWinOrLose(result);
                again(result);
            }
            botAi(field, 1, 10, gameOver);
            // доделать ничью

        });
    };
};

// бот

function botAi(field, min, max, gameOver){
    let botChoise = Math.floor( Math.random() * (max - min) + min);

    console.log(botChoise);

    for (let i = 1; i <= 100; i++){
        if(field[botChoise] != ''){
            botChoise = Math.floor( Math.random() * (max - min) + min);
            console.log(botChoise);
        }
    }
    field[botChoise] = 'circle';

    //отрисовка кругов бота 
    if(gameOver){
        botChoise = '';
        console.log('Игра закончена');
    } else {
        const game = document.querySelector('.game');
        gameFields = game.querySelectorAll('.game-field');
        gameFields.forEach(field => {
            if (field.id == botChoise) {
                setTimeout(() => {
                    field.innerHTML = `<svg class="circle"><use xlink:href="#circle"></use></svg>`
                }, 200);
            }
        });
    }
    

    
};


// модальное окно результатов

function modalResult(){
    const resultButton = document.querySelector('#result-button');
    const container = document.querySelector('.container');

    resultButton.addEventListener('click', () => {
        // создание модалки
        const div = document.createElement('div');
        div.className = 'modal result-modal invisible';
        div.innerHTML = `
                <p class="modal__title">Ваша статистика</p>
                <div class="modal__div">
                    <p class="modal__text winners">Побед: ${userInfo.victories}</p>
                    <p class="modal__text losses">Поражений: ${userInfo.losses}</p>
                </div>
                <div class="modal__div">
                    <button class="button modal__button"id="close">Закрыть</button>
                    <button class="button modal__button reset__button" id="reset">Сбросить статистику</button>
                </div>`;
        container.appendChild(div);
        if(container.querySelector('.result-modal')){
            setTimeout(() => {
                container.querySelector('.result-modal').classList.remove('invisible');
            }, 200);
        }
        if(container.querySelector('.game')){
            container.querySelector('.game').classList.add('invisible');
        }

        // Закрыть модалку

        function closeResultModal(){
            const closeButton = container.querySelector('#close');
            closeButton.addEventListener('click', (event) => {
                container.querySelector('.result-modal').classList.add('invisible');
                container.querySelector('.game').classList.remove('invisible');
                setTimeout(() => {
                    div.remove();
                }, 600);
            });
        }
        closeResultModal();

        // сброс статистики

        const resetButton = document.querySelector('#reset');
        resetButton.addEventListener('click', () => {
            userInfo.victories = 0;
            userInfo.losses = 0;
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            div.innerHTML = `
                <p class="modal__title">Ваша статистика</p>
                <div class="modal__div">
                    <p class="modal__text winners">Побед: ${userInfo.victories}</p>
                    <p class="modal__text losses">Поражений: ${userInfo.losses}</p>
                </div>
                <div class="modal__div">
                    <button class="button modal__button"id="close">Закрыть</button>
                    <button class="button modal__button reset__button" id="reset">Сбросить статистику</button>
                </div>`;

            closeResultModal();
        });
    });
};



// темная тема

function darkTheme(){
    const darkThemeButton = document.querySelector('#dark-theme-button');
    darkThemeButton.addEventListener('click', () => {

        body.classList.toggle('dark-theme');

        if(body.classList.contains('dark-theme')){
            userInfo.darkTheme = true;
            darkMeta.content = '#111111';
        } else {
            userInfo.darkTheme = false;
            darkMeta.content = '#ffffff';
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    });
};

function again(result){
    const container = document.querySelector('.container');
    const header = container.querySelector('.header');
    const game = container.querySelector('.game');
    // добавление невидимости
    setTimeout(() => {
        header.classList.add('invisible');
        game.classList.add('invisible');
    }, 1000);
    // создание модалки
    setTimeout(() => {
        container.innerHTML = '';
        if(result == 'win'){
            container.innerHTML = `
                <div class="modal again-modal invisible">
                    <p class="modal__title">Вы победили</p>
                    <p class="modal__text">Начать заново?</p>
                    <button class="button modal__button" id="again">Заново</button>
                </div>`         
        } else if(result == 'lose') {
            container.innerHTML = `
                <div class="modal again-modal invisible">
                    <p class="modal__title">Вы проиграли</p>
                    <p class="modal__text">Начать заново?</p>
                    <button class="button modal__button" id="again">Заново</button>
                </div>`
        } else if(result == 'nobody'){
            container.innerHTML = `
            <div class="modal again-modal invisible">
                <p class="modal__title">Ничья</p>
                <p class="modal__text">Начать заново?</p>
                <button class="button modal__button" id="again">Заново</button>
            </div>`
        }
    }, 1200);
    // удаление невидимости
    let modal;
    setTimeout(() => {
        modal = container.querySelector('.modal');
        modal.classList.remove('invisible');
    }, 1300);

    // Кнопка заного
    setTimeout(() => {
        let againButton = document.querySelector('#again');
        againButton.addEventListener('click', () => {
            setTimeout(() => {
                modal.classList.add('invisible');
            }, 100);
            setTimeout(createGame, 600);
        });
    }, 1500);
};

