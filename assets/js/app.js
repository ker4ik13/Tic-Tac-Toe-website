const body = document.body;
const container = document.querySelector('.container');

let userInfo = {
    firstLogin: true,
    darkTheme: false,
    victories: 0,
    losses: 0,
};

function getResponse(){
    if(localStorage.getItem('userInfo')){
        let userLocalInfo = localStorage.getItem('userInfo');
        userInfo = JSON.parse(userLocalInfo);
    }

    if(userInfo.darkTheme){
        body.classList.add('dark-theme');
    } else {
        return;
    }
    
    console.log(userInfo);

};

getResponse();
preloader()

function preloader(){
    body.innerHTML += `
    <div class="preloader invisible">
        <div class="loader">loading</div>
    </div>`;
    let preloader = body.querySelector('.preloader');

    setTimeout(() => {
        preloader.classList.remove('invisible');
    }, 1000);
    setTimeout(() => {
        preloader.classList.add('invisible');
    }, 3000);

    const container = body.querySelector('.container');

    if(userInfo.firstLogin){
        setTimeout(function modal() {
            container.innerHTML = `
            <div class="modal hello-modal invisible">
                <p class="modal__title">Здравствуйте</p>
                <p class="modal__text">Добро пожаловать в игру "Крестики - Нолики"</p>
                <button class="button modal__button" id="next">Продолжить</button>
            </div>
            `;
    
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
    
        }, 4000);
    } else {
        createGame(container);
    }
};

// Отрисовка игрового интерфейса

function createGame(container){

    let header = document.createElement('header');
    header.className = 'header';
    header.innerHTML = `
    <button class="button" id="dark-theme-button">Темная тема</button>
    <button class="button" id="result-button">Ваши результаты</button>
    `;
    container.innerHTML ='';
    container.appendChild(header);
    darkTheme();

    let section = document.createElement('section');
    section.className = 'game transform';
    section.id = 'game';
    container.appendChild(section);
    setTimeout(() => {
        section.classList.remove('transform')
    }, 200);
    createFields(section);
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

            bot(field, 1, 10);


            // Проверка на выигрыш / проигрыш
            if((field[1] == 'cross' && field[2] == 'cross' && field[3] == 'cross')){
                result = 'win';
                again(result);
            } else if ((field[4] == 'cross' && field[5] == 'cross' && field[6] == 'cross')){
                result = 'win';
                again(result);
            } else if ((field[7] == 'cross' && field[8] == 'cross' && field[9] == 'cross')){
                result = 'win';
                again(result);
            } else if ((field[1] == 'cross' && field[4] == 'cross' && field[7] == 'cross')){
                result = 'win';
                again(result);
            } else if ((field[2] == 'cross' && field[5] == 'cross' && field[8] == 'cross')){
                result = 'win';
                again(result);
            } else if ((field[3] == 'cross' && field[6] == 'cross' && field[9] == 'cross')){
                result = 'win';
                again(result);
            } else if ((field[1] == 'cross' && field[5] == 'cross' && field[9] == 'cross')){
                result = 'win';
                again(result);
            } else if ((field[3] == 'cross' && field[5] == 'cross' && field[7] == 'cross')){
                result = 'win';
                again(result);
            } else if((field[1] == 'circle' && field[2] == 'circle' && field[3] == 'circle')){
                result = 'lose';
                again(result);
            } else if ((field[4] == 'circle' && field[5] == 'circle' && field[6] == 'circle')){
                result = 'lose';
                again(result);
            } else if ((field[7] == 'circle' && field[8] == 'circle' && field[9] == 'circle')){
                result = 'lose';
                again(result);
            } else if ((field[1] == 'circle' && field[4] == 'circle' && field[7] == 'circle')){
                result = 'lose';
                again(result);
            } else if ((field[2] == 'circle' && field[5] == 'circle' && field[8] == 'circle')){
                result = 'lose';
                again(result);
            } else if ((field[3] == 'circle' && field[6] == 'circle' && field[9] == 'circle')){
                result = 'lose';
                again(result);
            } else if ((field[1] == 'circle' && field[5] == 'circle' && field[9] == 'circle')){
                result = 'lose';
                again(result);
            } else if ((field[3] == 'circle' && field[5] == 'circle' && field[7] == 'circle')){
                result = 'lose';
                again(result);
            } 

            // доделать ничью

        });
    };
};

// бот
function bot(field, min, max){
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
    const game = document.querySelector('.game');
    gameFields = game.querySelectorAll('.game-field');
    gameFields.forEach(field => {
        if (field.id == botChoise) {
            setTimeout(() => {
                field.innerHTML = `<svg class="circle"><use xlink:href="#circle"></use></svg>`
            }, 200);
        }
    });

    
};


// темная тема

function darkTheme(){
    const darkThemeButton = document.querySelector('#dark-theme-button');
    darkThemeButton.addEventListener('click', () => {

        body.classList.toggle('dark-theme');

        if(body.classList.contains('dark-theme')){
            userInfo.darkTheme = true;
        } else {
            userInfo.darkTheme = false;
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    });
};

function again(result){
    const container = document.querySelector('.container');
    const header = container.querySelector('.header');
    const game = container.querySelector('.game');
    setTimeout(() => {
        header.classList.add('invisible');
        game.classList.add('invisible');
    }, 1000);
    setTimeout(() => {
        container.innerHTML = '';
        if(result == 'win'){
            container.innerHTML = `
                <div class="modal again-modal invisible">
                    <p class="modal__title">Вы победили</p>
                    <p class="modal__text">Начать заного?</p>
                    <button class="button modal__button" id="again">Заного</button>
                </div>`         
        } else if(result == 'lose') {
            container.innerHTML = `
                <div class="modal again-modal invisible">
                    <p class="modal__title">Вы проиграли</p>
                    <p class="modal__text">Начать заного?</p>
                    <button class="button modal__button" id="again">Заного</button>
                </div>`
        } else if(result == 'nobody'){
            container.innerHTML = `
            <div class="modal again-modal invisible">
                <p class="modal__title">Ничья</p>
                <p class="modal__text">Начать заного?</p>
                <button class="button modal__button" id="again">Заного</button>
            </div>`
        }


    }, 1200);
    let modal;
    setTimeout(() => {
        modal = container.querySelector('.modal');
        modal.classList.remove('invisible');
    }, 1300);
    setTimeout(() => {
        let againButton = document.querySelector('#again');
        
        againButton.addEventListener('click', () => {
            modal.classList.add('invisible');
            setTimeout(createGame(container), 600);
        });
    }, 1500);
}