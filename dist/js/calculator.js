
const btns = $('.btn');

// .btn-num (0-9)
// .btn-no-num (, AC % +-)
// .btn-operador (+ - x /)
// .btn-champions
// .play (class for champions and equals to play sound?)
// .btn-audio (on/off sound)

const championsAudio = new Audio("/madrid-calculator/intro-uefa-champions-league.mp3");
const siuAudio = new Audio("/madrid-calculator/siuuu.mp3");
const resultPrompt = $('#result-prompt');
const prevResultPrompt = $('#prev-opp');
const championsBtn = $('#champions');
const equalsBtn = $('#equals');
const audioBtn = $('.btn-audio');

let promptText = '';
let result = 0;
let firstOperand = 0;
let secondOperand = 0;
let operands = 0;
let prevClick = '';
let operationData = [];

btns.on('click', (e) => {

  if ($(e.target).hasClass('btn-num'))
  {
    if (operands === 0)
    {
      if (firstOperand === 0)
      {
        firstOperand = $(e.target).attr('value');
        promptText = $(e.target).attr('value');
      }
      else
      {
        firstOperand += $(e.target).attr('value');
        promptText += $(e.target).attr('value');
      }
      resultPrompt.html(promptText);
    }
    else if (operands  > 0)
    {
      if (secondOperand === 0)
      {
        secondOperand = $(e.target).attr('value');
        promptText += $(e.target).attr('value');
      }
      else
      {
        secondOperand += $(e.target).attr('value');
        promptText += $(e.target).attr('value');
      }
      resultPrompt.html(promptText);
    }
  }
  else if ($(e.target).hasClass('btn-operator'))
  {
    if (operationData.length === 0)
    {
      operationData.push(parseInt(firstOperand));
      operationData.push(e.target.id);
      promptText += testOperator(e.target.id);
      resultPrompt.html(promptText);
      operands++;
    }
    else if (operationData.length === 1)
    {
      operationData.push(e.target.id);
      promptText += testOperator(e.target.id);
      resultPrompt.html(promptText);
      operands++;
    }
    else if (operationData.length > 1)
    {
      operationData.push(parseInt(secondOperand));
      prevResultPrompt.html(resolveCalc(operationData));
      firstOperand = result;
      promptText = result + testOperator(e.target.id);
      resultPrompt.html(promptText);

      operationData[0] = firstOperand;
      operationData[1] = e.target.id;
      secondOperand = 0;
      operationData.pop();
      operands++;
    }
  }
  else if ($(e.target).hasClass('btn-no-num'))
  {
    if (e.target.id === 'clear')
    {
      promptText = 0;
      result = 0;
      firstOperand = 0;
      secondOperand = 0;
      operands = 0;
      prevClick = 0;
      operationData = [];
      resultPrompt.html(promptText);
      prevResultPrompt.html('');
    }
    else if (e.target.id === 'equals')
    {
      if (equalsBtn.hasClass('play'))
      {
        siuAudio.play();
      }
      operationData.push(parseInt(secondOperand));
      prevResultPrompt.html(resolveCalc(operationData));
      firstOperand = result;
      promptText = result;
      resultPrompt.html(result);

      secondOperand = 0;
      operationData[0] = result;
      operationData.splice(1,2);
    }
  }
  else if (e.target.id === "champions") 
  {
    if (championsBtn.hasClass('play'))
    {
      championsAudio.play();
    }
    if (operands === 0)
    {
      firstOperand = 15;
      operationData.push(firstOperand);
      promptText = firstOperand;
      resultPrompt.html(firstOperand);
    }
    else
    {
      secondOperand = 15;
      operationData.push(parseInt(secondOperand));
      prevResultPrompt.html(resolveCalc(operationData));
      firstOperand = result;
      promptText = result;
      resultPrompt.html(result);

      secondOperand = 0;
      operationData[0] = result;
      operationData.splice(1,2);
    }
  }
  else if (e.target.id === 'audio-button')
  {
    console.log("this is audio Button");
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
  }
});

function testOperator(opp)
{
  if (opp == 'add')
  {
    return '\u002B';
  }
  else if (opp == 'subtract')
  {
    return '\u2212';
  }
  else if (opp == 'multiply')
  {
    return '\u00D7';
  }
  else if (opp == 'divide')
  {
    return '\u00F7';
  }
}


function resolveCalc([num1, calc, num2])
{
  if (calc == 'add')
  {
    result = num1 + num2;
    return num1 + ' \u002B ' + num2 + ' = ' + result;
  }
  else if (calc == 'subtract')
  {
    result = num1 - num2;
    return num1 + ' \u2212 ' + num2 + ' = ' + result;
  }
  else if (calc == 'multiply')
  {
    result = num1 * num2;
    return num1 + ' \u00D7 ' + num2 + ' = ' + result;
  }
  else if (calc == 'divide')
  {
    result = num1 / num2;
    return num1 + ' \u00F7 ' + num2 + ' = ' + result;
  }
}
