// =========================
// ЗАГРУЗОЧНЫЙ ЭКРАН
// =========================

window.onload=()=>{

const intro=document.getElementById("introScreen");

const title=document.getElementById("introText");

const sub=document.getElementById("introSub");

setTimeout(()=>{

title.innerHTML="Надень наушники 🎧";

sub.innerHTML="";

},3000);

setTimeout(()=>{

title.innerHTML="И приготовься увидеть...";

sub.innerHTML="насколько сильно я люблю тебя ❤️";

},6500);

setTimeout(()=>{

title.innerHTML="Для моей единственной";

sub.innerHTML="Дианы";

},10500);

setTimeout(()=>{

intro.style.opacity="0";

setTimeout(()=>{

intro.remove();

},1500);

},14000);

}

// =========================
// ПОЯВЛЕНИЕ БЛОКОВ
// =========================

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:0.15});

document.querySelectorAll(".hidden").forEach(el=>observer.observe(el));

// =========================
// ОТКРЫТИЕ ПИСЬМА
// =========================

const envelope=document.getElementById("openLetter");

const flap=document.querySelector(".envelope-top");

const paper=document.querySelector(".paper");

let opened = false;

envelope.onclick = () => {

    if (opened) return;

    opened = true;

    flap.style.transform = "rotateX(180deg)";

    setTimeout(() => {

        paper.style.bottom = "18px";
        paper.style.opacity = "1";
        paper.style.transform =
            "translateX(-50%) rotate(-2deg)";

    }, 350);

};

// =========================
// СЧЕТЧИК
// =========================

const startDate=new Date("2025-08-18T00:00:00");

function updateCounter(){

const now=new Date();

const diff=now-startDate;

const days=Math.floor(diff/(1000*60*60*24));

const hours=Math.floor(diff/(1000*60*60)%24);

const minutes=Math.floor(diff/(1000*60)%60);

const seconds=Math.floor(diff/1000%60);

document.getElementById("days").innerText=days;

document.getElementById("hours").innerText=hours;

document.getElementById("minutes").innerText=minutes;

document.getElementById("seconds").innerText=seconds;

}

setInterval(updateCounter,1000);

updateCounter();

// =========================
// СЕРДЦА
// =========================

const canvas=document.getElementById("heartCanvas");

const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;

canvas.height=window.innerHeight;

});

let hearts=[];

function Heart(){

this.x=Math.random()*canvas.width;

this.y=canvas.height+50;

this.size=12+Math.random()*25;

this.speed=1+Math.random()*2;

this.alpha=1;

this.rotation=Math.random()*360;

}

Heart.prototype.draw=function(){

ctx.save();

ctx.translate(this.x,this.y);

ctx.rotate(this.rotation*Math.PI/180);

ctx.globalAlpha=this.alpha;

ctx.fillStyle="#ff4d7d";

ctx.font=this.size+"px serif";

ctx.fillText("❤",0,0);

ctx.restore();

};

Heart.prototype.update=function(){

this.y-=this.speed;

this.rotation+=0.3;

this.alpha-=0.003;

};

function animateHearts(){

ctx.clearRect(0,0,canvas.width,canvas.height);

hearts.forEach((heart,index)=>{

heart.update();

heart.draw();

if(heart.alpha<=0){

hearts.splice(index,1);

}

});

requestAnimationFrame(animateHearts);

}

animateHearts();

// =========================
// КНОПКА
// =========================

const loveButton=document.getElementById("loveButton");

if(loveButton){

loveButton.onclick=()=>{

for(let i=0;i<300;i++){

setTimeout(()=>{

hearts.push(new Heart());

},i*15);

}

};
}

// =========================
// КНОПКА СТАРТА
// =========================

const startButton=document.getElementById("startButton");

if(startButton){

startButton.onclick=()=>{

document.getElementById("intro").scrollIntoView({

behavior:"smooth"

});

};

}

// =========================
// ПОКАЗАТЬ ВСЕ ПРИЧИНЫ
// =========================

const more=document.getElementById("moreReasons");

if(more){

more.onclick=()=>{

const grid=document.querySelector(".reasonsGrid");

for(let i=11;i<=100;i++){

const div=document.createElement("div");

div.className="reason";

div.innerHTML="❤️ Причина №"+i+" — Потому что я люблю в тебе всё.";

grid.appendChild(div);

}

more.remove();

};

}
// =========================
// ЗВЕЗДНОЕ НЕБО (Зрелищная версия)
// =========================

const starsContainer = document.querySelector(".stars");

// 1. Создаем мелкие мерцающие звезды (разного цвета)
const starColors = ["#ffffff", "#ffd369", "#ff4d88", "#a8c0ff"];
for (let i = 0; i < 250; i++) {
    const star = document.createElement("span");
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    
    const size = Math.random() * 3 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";
    
    // Добавляем случайный цвет и мерцание с разной скоростью
    star.style.background = starColors[Math.floor(Math.random() * starColors.length)];
    star.style.animationDuration = (2 + Math.random() * 5) + "s";
    star.style.animationDelay = Math.random() * 5 + "s";
    star.style.boxShadow = `0 0 ${size * 3}px ${star.style.background}`; // Мягкое свечение звезды
    
    starsContainer.appendChild(star);
}

// 2. Создаем эффект Падающих звезд (Метеориты)
function createShootingStar() {
    const star = document.createElement("span");
    const x = Math.random() * 100;
    const y = Math.random() * 50; // Появляются в верхней половине экрана
    
    star.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: 3px;
        height: 3px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 0 0 4px 2px rgba(255, 255, 255, 0.5);
        animation: shoot 1.5s linear forwards;
        z-index: 5;
    `;
    starsContainer.appendChild(star);

    // Удаляем звезду после анимации
    setTimeout(() => {
        star.remove();
    }, 1500);
}

// Создаем метеориты каждые 2-5 секунд
setInterval(() => {
    createShootingStar();
}, 2500 + Math.random() * 3000);

// Добавляем стили для метеорита (в CSS через JS, чтобы не лезть в файл)
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes shoot {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        70% {
            opacity: 1;
        }
        100% {
            transform: translate(-400px, 400px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styleSheet);

// 3. Создаем Мягкие Галактические Облака (для глубины)
function createNebula() {
    const nebula = document.createElement("div");
    const size = 200 + Math.random() * 400;
    const colors = ["rgba(255, 60, 120, 0.05)", "rgba(168, 192, 255, 0.04)", "rgba(255, 211, 105, 0.04)"];
    
    nebula.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]} 0%, transparent 70%);
        border-radius: 50%;
        filter: blur(60px);
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: floatNebula ${30 + Math.random() * 20}s ease-in-out infinite alternate;
        pointer-events: none;
        z-index: 0;
    `;
    starsContainer.appendChild(nebula);
}

// Создаем 5-6 туманностей для объема
for(let i=0; i<6; i++) {
    createNebula();
}

// Анимация для туманностей
const nebulaStyle = document.createElement("style");
nebulaStyle.textContent = `
    @keyframes floatNebula {
        0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
        100% { transform: translate(50px, -30px) scale(1.2); opacity: 1; }
    }
`;
document.head.appendChild(nebulaStyle);
document.getElementById("loveButton").onclick = () => {
    
    // 1. Делаем музыку громче
    const music = document.getElementById("bgMusic");
    if (music) {
        music.volume = 0.2; 
        music.play().catch(() => {});
        let volume = 0.2;
        const fade = setInterval(() => {
            volume += 0.02;
            music.volume = Math.min(volume, 0.8); 
            if (volume >= 0.8) clearInterval(fade);
        }, 120);
    }

    // 2. Создаем финальный экран
    const finalDiv = document.createElement("div");
    finalDiv.style.cssText = `
        position: fixed; inset: 0; z-index: 999999; 
        background: radial-gradient(circle at center, #1a0000 0%, #000000 100%); 
        display: flex; flex-direction: column; justify-content: center; 
        align-items: center; overflow: hidden;
    `;
    
    finalDiv.insertAdjacentHTML("beforeend", `
        <canvas id="heartCanvasFinal" style="position:absolute; inset:0; width:100%; height:100%;"></canvas>
        <div class="finalWords" style="position:relative; z-index:10; text-align:center; opacity:0; transform:translateY(40px); transition:1.5s cubic-bezier(0.2, 0.9, 0.3, 1); pointer-events:none; background: rgba(0,0,0,0.3); backdrop-filter: blur(8px); padding: 50px 60px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.1);">
    <h1 style="font-size:90px; margin-bottom:15px; color:#ffffff; font-family:'Cormorant Garamond', serif;">
        Диана <span style="font-size:70px;">❤️</span>
    </h1>
    <p style="font-size:28px; line-height:1.8; color:#f0f0f0; margin-bottom:35px; font-family:'Montserrat', sans-serif;">
        Я люблю тебя больше,<br>
        чем способны описать любые слова.
    </p>
    <span style="font-size:28px; color: #f7d884; font-family:'Montserrat', sans-serif; letter-spacing:2px;">18.08.2025 ∞</span>
</div>
    `);

    document.body.appendChild(finalDiv);

    // 3. НОВАЯ ОТРИСОВКА СЕРДЦА (Более реалистичная)
    const canvas = document.getElementById("heartCanvasFinal");
    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    canvas.width = width;
    canvas.height = height;

    // Функция для рисования красивого сердца
    function drawRealisticHeart(progress, time) {
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2 - 60; // Чуть выше центра
        const scale = Math.min(width, height) / 310; // Адаптация под размер экрана
        const beat = Math.sin(time * 0.002) * 0.02 + 1.0; // Легкое биение

        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(scale * beat, scale * beat);

        // Рисуем форму сердца
        ctx.beginPath();
        ctx.moveTo(0, -50);
        ctx.bezierCurveTo(-100, -150, -250, 50, 0, 220);
        ctx.bezierCurveTo(250, 50, 100, -150, 0, -50);
        ctx.closePath();

        // ==========================================
        // 3D ЭФФЕКТ (Градиент + Блик)
        // ==========================================
        
        // 1. Внутренний градиент для объема (свет сверху-слева, тень снизу-справа)
        const gradient = ctx.createRadialGradient(-50, -60, 20, 0, 50, 250);
        gradient.addColorStop(0, "#ffb3cc");  // Самый светлый центр (блик)
        gradient.addColorStop(0.3, "#ff4d88"); // Яркий неон
        gradient.addColorStop(0.7, "#cc0044"); // Переход в тень
        gradient.addColorStop(1, "#55001a");   // Глубокий край для объема

        ctx.fillStyle = gradient;
        ctx.shadowColor = "#ff1a66";
        ctx.shadowBlur = 60; // Мощное внешнее свечение
        ctx.fill();

        // 2. Добавляем второй слой (прозрачный контур) для сияния краев
        ctx.shadowBlur = 90;
        ctx.shadowColor = "#ff4d88";
        ctx.strokeStyle = "rgba(255, 100, 150, 0.5)";
        ctx.lineWidth = 5;
        ctx.stroke();

        // 3. Рисуем БЛИК (самая важная часть 3D) — отражение света
        ctx.shadowBlur = 0; // Убираем тень, чтобы не мешала блику
        ctx.shadowColor = "transparent";
        
        // Большой овальный блик сверху слева (эффект глянца)
        ctx.beginPath();
        ctx.ellipse(-40, -40, 45, 20, -0.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.fill();

        // Маленький блик (ближе к центру)
        ctx.beginPath();
        ctx.ellipse(-10, -70, 20, 10, -0.3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
        ctx.fill();

        // Мягкий световой ореол сверху
        ctx.beginPath();
        ctx.ellipse(-60, -90, 60, 30, -0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 200, 220, 0.08)";
        ctx.fill();

        ctx.restore();
        
        // Отрисовка маленьких блесток (эффект волшебства)
        for(let i=0; i<50; i++) {
            const angle = Math.random() * Math.PI * 2;
            const rad = 150 + Math.random() * 200;
            const x = Math.cos(angle) * rad;
            const y = Math.sin(angle) * rad;
            
            ctx.beginPath();
            ctx.arc(x, y, Math.random() * 1.5 + 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 200, 220, ${Math.random() * 0.5})`;
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#ff1a66";
            ctx.fill();
        }
    }

    // 4. Анимация с лепестками (добавим эффект падающих лепестков)
    const petals = [];
    for (let i = 0; i < 40; i++) {
        petals.push({
            x: Math.random() * width,
            y: Math.random() * height - height,
            size: 5 + Math.random() * 8,
            speedX: (Math.random() - 0.5) * 1.2,
            speedY: 0.5 + Math.random() * 1.2,
            rotation: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 0.04,
            opacity: 0.6 + Math.random() * 0.4,
            color: Math.random() > 0.5 ? '#ff4d88' : '#ff9999'
        });
    }

    let startTime = Date.now();
    let heartProgress = 0;
    
    function animateFinal() {
        const time = Date.now() - startTime;
        
        // Медленное появление сердца
        if (heartProgress < 1) heartProgress += 0.015; 

        // Рисуем само сердце
        drawRealisticHeart(heartProgress, time);

        // Рисуем падающие лепестки
        petals.forEach(p => {
            p.x += p.speedX + Math.sin(time / 1000 + p.y / 100) * 0.5;
            p.y += p.speedY;
            p.rotation += p.rotSpeed;

            // Если лепесток упал вниз, возвращаем его наверх
            if (p.y > height + 50) {
                p.y = -50;
                p.x = Math.random() * width;
            }

            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.globalAlpha = p.opacity;
            
            // Рисуем лепесток в виде овала
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size, p.size / 2.2, 0, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.fill();
            
            ctx.restore();
        });

        requestAnimationFrame(animateFinal);
    }
    animateFinal();

    // 5. Плавно показываем текст через 2 секунды
    setTimeout(() => {
        const words = finalDiv.querySelector(".finalWords");
        words.style.opacity = "1";
        words.style.transform = "translateY(0)";
    }, 2000);
}
// Автоматический запуск музыки при первом взаимодействии с сайтом
document.addEventListener('click', function() {
    let audio = document.getElementById('bgMusic');
    if (audio.paused) {
        audio.play().catch(e => console.log('Ошибка воспроизведения:', e));
    }
});

// Или если хочешь, чтобы включалась при прокрутке (скролле):
document.addEventListener('scroll', function() {
    let audio = document.getElementById('bgMusic');
    if (audio.paused) {
        audio.play().catch(e => console.log('Ошибка воспроизведения:', e));
    }
});
