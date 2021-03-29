'use strict'
{
  const level = 6;
  const container= document.getElementById('container');
  const PANEL_WIDTH =90;
  const BOARD_PADDING=10;
  container.style.width=  PANEL_WIDTH * level + BOARD_PADDING * 2 +'px';
  const loading= document.getElementById('loading');
  const finish= document.getElementById('finish');
  finish.classList.add('finished');
  const excellent= document.getElementById('excellent');
  excellent.classList.add('finished');
  let clearCount=0;
  let total= document.getElementById('total');
  const result= document.getElementById('result');
  

  // パネル要素を作る
  const panels=[];
  for(let i = 0; i<level**2; i++){
    const el=document.createElement('li');
   
    panels.push(el);
   
  }
  
  // ボードにパネル要素を追加
  const board = document.getElementById('board');
  panels.forEach(panel=>{
    board.appendChild(panel);
  })
  
  // どれか一つのパネルをずらす
  function Game(){
    if(clearCount===5){
      excellent.classList.remove('finished');
      clearTimeout(timeoutId);
      setTimeout(()=>{
        result.classList.remove('hidden')
      },1000) ;
    }  
    total.textContent=`${clearCount} / 5`;

    setTimeout(()=>{
       loading.classList.add('loaded');
     },100);
     
     const source = [];
     for(let i =0;i<level**2;i++){
       source[i]=i;
     }
     console.log(source);

    const num = source.splice(Math.floor(Math.random()*level**2),1)[0];
    console.log(num)
    const nextnum = num+1;
    const exception = [];
      for(let i =0;i<level+1;i++){
        exception.push(level*i-1);
      }
    const target = panels[num];
    const nexttarget = panels[nextnum];
    target.classList.add('target');
    if(!exception.includes(num)){
      panels[nextnum].classList.add('nexttarget');
    }

    target.addEventListener('click',()=>{
      clearCount++;

      if(!exception.includes(num)){
        nexttarget.classList.remove('nexttarget');
        target.classList.remove('target');
        loading.classList.remove('loaded');
        Game();      
      }else{
        target.classList.remove('target');
        loading.classList.remove('loaded');
        Game();
      }
  });
  }
  
  let startTime;
  let timeoutId;
  let limit =30;

  // ボタンを押す
  const btn = document.getElementById('btn');
  let startCount=0;
  const end = limit * 1000;
  btn.addEventListener('click',()=>{
    if(startCount===0){
      startTime=Date.now();
      runTimer();
      Game();
      startCount++;
      btn.style.visibility='hidden';
      
      setTimeout(()=>{

      if(clearCount<5){
        finish.classList.remove('finished');
      }
      },end);
      setTimeout(()=>{
        result.classList.remove('hidden')
      },end+1000) ;
    }
  });
  
   function runTimer(){   
   const timer =document.getElementById('timer');
   
   let restTime= limit- Math.floor(((Date.now()-startTime)/1000)).toFixed(0);
    timer.textContent=restTime;      
    timeoutId =  setTimeout(()=>{
    runTimer();
    // console.log(restTime);
    },10);
    if(restTime===0){
      clearTimeout(timeoutId);
    }    
    }

}