const DEBUG = true;

const championsAudio = new Audio("/madrid-calculator/intro-uefa-champions-league.mp3");
const siuAudio = new Audio("/madrid-calculator/siuuu.mp3");

const championsBtn = $('#champions');
const equalsBtn = $('#equals');
const audioBtn = $('.btn-audio');
const audioBtnClick = $('#audio-button');

let promptNumber = 0;
let firstOperand = 0;
let secondOperand = 0;
let operation = 'sub';

championsBtn.on('click', (e) => {

  if (e.target.classList.contains('play')) {
    if (DEBUG)
    {
      //do nothing
    }
    else
    {
      championsAudio.play();
    }
    
  }
});

equalsBtn.on('click', (e) => {

  if (e.target.classList.contains('play')) {    
    if (DEBUG)
      {
        //do nothing
      }
      else
      {
        siuAudio.play();
      }
    
  }
});

audioBtn.on('click', () => {

  championsBtn.toggleClass('play');
  equalsBtn.toggleClass('play');
  audioBtn.toggleClass('off');
  if (audioBtn.hasClass('off'))
  {
    audioBtn.html('&#128263');
  }
  else
  {
    audioBtn.html('&#128362');
  }
});

function pushNumber(number)
{
  let result = $('#result').html();
  if (promptNumber == 0)
  {
    promptNumber = number;
    $('#result').html(promptNumber);
  }
  else
  {
    length = result.length;
    result = result + number;
    promptNumber = parseInt(result);
    $('#result').html(result);
  }
}

function twoValueOperationClicked(opp)
{
  firstOperand = $('#result').html();
  $('#result').html('0');
  promptNumber = 0;  
  console.log(opp);
  operation = opp;
}

function equalClicked()
{
  let secondOperand = $('#result').html();  
  if (operation == 'add')
  {    
    let a = parseInt(firstOperand)
    let b = parseInt(secondOperand)
    console.log(parseInt(firstOperand));
    console.log(parseInt(secondOperand));
    let res = a + b;
    console.log(res);
    $('#result').html(res);
  }
  else if (operation == 'sub')
  {
    let a = parseInt(firstOperand)
    let b = parseInt(secondOperand)
    console.log(parseInt(firstOperand));
    console.log(parseInt(secondOperand));
    let res = a - b;
    console.log(res);
    $('#result').html(res);
  }
  else if (operation == 'mult')
    {
      let a = parseInt(firstOperand)
      let b = parseInt(secondOperand)
      console.log(parseInt(firstOperand));
      console.log(parseInt(secondOperand));
      let res = a * b;
      console.log(res);
      $('#result').html(res);
    }
    else if (operation == 'div')
      {
        let a = parseInt(firstOperand)
        let b = parseInt(secondOperand)
        console.log(parseInt(firstOperand));
        console.log(parseInt(secondOperand));
        let res = a / b;
        console.log(res);
        $('#result').html(res);
      }
  firstOperand = 0;
  secondOperand = 0;
  promptNumber = 0;

}

function changeSign()
{
  
  promptNumber = promptNumber * -1;
  console.log(promptNumber);
  $('#result').html(promptNumber);    
}

function championClicked()
{
  promptNumber = 15;
  $('#result').html(promptNumber);
}



