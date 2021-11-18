;(function(){

    const i1 = document.querySelector('.i1')
    const i2 = document.querySelector('.i2')
    const scope = document.querySelector('.scope')
    const guess = document.querySelector('.guess')
    const guessInput = document.getElementById('guessInput')
    const guessBtn = document.querySelector('.guess button')
    const rand = document.getElementById('rand')
    const view = document.querySelector('.view')
    
    const numberTest = /^0-9$/
    
    const inputMin = document.getElementById('inputMin') 
    const inputMax = document.getElementById('inputMax')
    let strMax
    let strMin
    // 轉換後小的數字
    let numberMin;
    // 轉換後大得數字 
    let numberMax;
    // 介於大的數字
    let answerMax;
    // 介於小的數字
    let answerMin;
    // 猜多少次
    let count = 0;
    // 答案
    let answer;
    // 監聽Enter
    inputMin.addEventListener('keypress',function(event){
        if(event.key === 'Enter'){
            randRun()
        }
    })
    // 監聽Enter
    inputMax.addEventListener('keypress',function(event){
        if(event.key === 'Enter'){
            randRun()
        }
    })

    let strAnswerMin //view最小數字
    let strAnswerMax //view最大數字

    rand.addEventListener('click',randRun)

    function randRun(){
        numberMin = inputMin.value
        numberMin = parseInt(numberMin,10)
        numberMax = inputMax.value
        numberMax = parseInt(numberMax,10)
        answerMax = numberMax;
        answerMin = numberMin;
        
        if(numberMin >= numberMax){
            err()
        }else if(numberMin === 0 && numberMax === 0){
        }else if(isNaN(inputMin.value) || isNaN(inputMax.value)){
            err()
        }else if(inputMin.value === '' || inputMax.value === ''){
            err()
        }else if(!numberTest.test(numberMin)&&!numberTest.test(numberMax)){ 
            // console.log('ok')
            scope.style.display = 'block';
            i1.classList.remove('error')
            i2.classList.remove('error')
            inputMin.classList.remove('input_error')
            inputMax.classList.remove('input_error')
            guessInput.value='';
            answer = numberGet(numberMin,numberMax);
            strMax = String(numberMax).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            strMin = String(numberMin).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            strAnswerMin = strMin;
            strAnswerMax = strMax;
            scope.innerHTML=
            `
                <span>答案介於${strMin}至${strMax}之間</span>
            `
            // 清空
            view.innerHTML=
            `
                
            `
            count =0;
            guess.style.display = 'flex';
            rand.style.bottom = '-10px';
            i1.style.marginBottom = '5px'
            i2.style.marginBottom = '0'
        }else{
            // console.log('else')
            err()
        }
    }



    function numberGet(min, max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function err(){
        i1.classList.add('error')
        i2.classList.add('error')
        inputMin.classList.add('input_error')
        inputMax.classList.add('input_error')
        scope.innerHTML=
        `
        
        `
        guess.style.display = 'none';
        view.innerHTML=
        `
            
        `
        const now_width = document.documentElement.scrollWidth;
        if(now_width <= 1023){
            rand.style.bottom = '-20px';
        }
        i1.style.marginBottom = '100px'
        i2.style.marginBottom = '100px'
    }
    guessInput.addEventListener('keypress',function(event){
        if(event.key === 'Enter'){
            guessRun()
        }
    })
    guessBtn.addEventListener('click',guessRun)
    function guessRun(){
        // 猜的數字
        let v = guessInput.value;
        // 轉換為數字型態
        v = parseInt(v,10);
        // console.log(v)
        if(v === answer){
            count +=1;
            let strAns = String(answer).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            view.innerHTML=
            `
                <span>答案是:${strAns}，你一共答了 <span style="font-size:40px;color:#55ff0f">${count}</span> 次!(含本次)</span><br>
                <span>再次產生新的亂數可以重新遊玩</span>
            `
            guess.style.display = 'none';
            scope.style.display = 'none';
            if(count === 1){
                view.innerHTML+=`<br><span style="color:#c9fc64;font-weight:900">太扯了，竟然一次就猜中。如果你不是把範圍設非常小的話，那你今天的運氣一定非常好!</span>`
            }
        }else if(v < answerMin || v > answerMax){
            view.innerHTML=
            `
                <span>輸入的數字錯誤!<br>輸入的數字應為${strAnswerMin}至${strAnswerMax}之間</span>
            `
        }else if(v > answer){
            answerMax = v;
            count +=1;
            strAnswerMax = String(answerMax).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            view.innerHTML=
            `
                <span>猜的數字太高了，試著稍微降低吧!<br>答案介於${strAnswerMin}至${strAnswerMax}之間</span>
            `
        }else if(v < answer){
            answerMin = v;
            count +=1;
            strAnswerMin = String(answerMin).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            view.innerHTML=
            `
                <span>猜的數字太低了，試著稍微提高吧!<br>答案介於${strAnswerMin}至${strAnswerMax}之間</span>
            `
        }else{
            view.innerHTML=
            `
                <span>發生未預期錯誤，請確認輸入是否為數字。</span>
            `
        }

    }
})()