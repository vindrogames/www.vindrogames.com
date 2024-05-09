const championsAudio = new Audio("/madrid-calculator/intro-uefa-champions-league.mp3");
const siuAudio = new Audio("/madrid-calculator/siuuu.mp3")

const championsBtn = $('#champions');
const equalsBtn = $('#equals');
const audioBtn = $('.btn-audio');

let promptNumber = 0;
let firstOperand = 0;
let secondOperand = 0;
let operation = 'sub'

championsBtn.on('click', (e) => {

  if (e.target.classList.contains('play')) {
    championsAudio.play();
  }
});

equalsBtn.on('click', (e) => {

  if (e.target.classList.contains('play')) {
    siuAudio.play();
  }
});

audioBtn.on('click', () => {

  championsBtn.toggleClass('play');
  equalsBtn.toggleClass('play');
  audioBtn.toggleClass('off');
});

function pushNumber(number)
{
  let result = $('#result').html();
  if (promptNumber == 0)
  {
    promptNumber = number;
    $('#result').html(promptNumber)
  }
  else
  {
    length = result.length
    result = result + number
    $('#result').html(result)
  }
}

function twoValueOperationClicked(opp)
{
  firstOperand = $('#result').html();
  $('#result').html('0');
  promptNumber = 0;  
  console.log(opp)
  operation = opp
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



