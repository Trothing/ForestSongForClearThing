const cat = document.querySelector('.cat');
const style = window.getComputedStyle(cat);
const btn = document.getElementById('StartButton');
const catSpeed = 138;

let lastX = 0;
let lastY = 0;
let fisrtBool = 1;

let moveTimeout, sitFinalfun, aa1;
let veryVEL = false;

moveCatRandomly();

function moveCatRandomly() {
      if (veryVEL){
        clearTimeout(moveTimeout);
        return;
    }
    if (fisrtBool){
        firstStep();
        return;
    }
    const shouldSit = Math.random() < 0.3; 

    if (shouldSit) {
        cat.classList.remove('run');
        cat.classList.add('sit');
        clearTimeout(moveTimeout);

        setTimeout(() => {
            cat.classList.remove('sit');
            cat.classList.add('run');
            moveCatRandomly();
            }, 3000);
        
            return;
    }
    const shouldYmuva = Math.random()<0.3;

    if (shouldYmuva){
        cat.classList.remove('run');
        cat.classList.add('ymuva');
        clearTimeout(moveTimeout);

        setTimeout(() => {
            cat.classList.remove('ymuva');
            cat.classList.add('run');
            moveCatRandomly();
        }, 6000)

        return;
    }
    

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const maxX = screenWidth - cat.offsetWidth;
    const maxY = screenHeight - cat.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    const dx = randomX - lastX;
    const dy = randomY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const time = distance / catSpeed;

    if( randomX < lastX) {
        cat.style.transform = 'scaleX(-1)';
    } else if (randomX > lastX) {
        cat.style.transform = 'scaleX(1)';
    }
    

    
    cat.style.transition = `left ${time}s linear, top ${time}s linear`;
    cat.style.left = `${randomX}px`;
    cat.style.top = `${randomY}px`;


    moveTimeout = setTimeout(moveCatRandomly, (time * 1000)+40); 
}



function firstStep(){
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const maxX = screenWidth - cat.offsetWidth;
    const maxY = screenHeight - cat.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    const dx = randomX - lastX;
    const dy = randomY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const time = distance / catSpeed;
    if( randomX < lastX) {
        cat.style.transform = 'scaleX(-1)';
    } else if (randomX > lastX) {
        cat.style.transform = 'scaleX(1)';
    }
    if (dx>600 || dy > 600){
        firstStep();
        return;
    }
    
    cat.style.transition = `left ${time}s linear, top ${time}s linear`;
    cat.style.left = `${randomX}px`;
    cat.style.top = `${randomY}px`;
    lastX = randomX;
    lastY = randomY;
    fisrtBool = false;
    console.log(lastX, lastY)

    moveTimeout = setTimeout(moveCatRandomly, (time * 1000)+40);
}


/*///////////////////Button///////////////////////*/


btn.addEventListener('click', () => {
    btn.classList.add('hide');
    veryVEL = true;
    aa1 = setTimeout(final, 10);
});

/*----------------------------*/
function final(){
    clearTimeout(moveTimeout);
    clearTimeout(moveTimeout);
    aa1 = setInterval(clearTimeout(moveTimeout), 500);
    cat.classList.add('start');
    cat.classList.remove('run');
    cat.classList.remove('sit');
    cat.classList.remove('ymuvah');
    
    const centerX = (window.innerWidth) / 2;
    const centerY = (window.innerHeight) / 2;

    console.log(window.innerWidth, window.innerHeight)

    cat.style.left = `${centerX - 100}px`;
    cat.style.top = `${centerY}px`;

    /*sitFinalfun = setTimeout(finalsit, 2000)*/
}
/*function finalsit(){
    clearTimeout(aa1);
    cat.classList.add('finalsit');
    cat.classList.remove('start');
}*/
cat.addEventListener('transitionend', (e) => {
  if (e.propertyName === 'top' && cat.classList.contains('start')) {
    cat.classList.remove('start');
    cat.classList.add('finalsit');
    
    showDialog("Приві! Я - кіт. Сподіваюся ти досягла успіхів у своїх цілях. Я завжди вважав, що для досягнення мети головне мати людей, які будуть тебе мотивувати до роботи і завжди підтримають. (Лісова мудрість)");
  }
});


function showDialog(text, speed =130) {
  const dialog = document.getElementById('dialog');
  dialog.transform = 'scaleX(1)';
  dialog.style.display = 'block';
  dialog.innerHTML = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      dialog.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}
