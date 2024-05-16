
// Gets all Buttons
const btns = $('.btn');

// Audios to be played
const championsAudio = new Audio("/madrid-calculator/intro-uefa-champions-league.mp3");
const siuAudio = new Audio("/madrid-calculator/siuuu.mp3");

// Result Divs, one for previous operation and one for current prompt
const resultPrompt = $('#result-prompt');
const prevResultPrompt = $('#prev-opp');

// Buttons for audios, needed to turn on/off audio feature
const championsBtn = $('#champions');
const equalsBtn = $('#equals');
const audioBtn = $('.btn-audio');

// Variables for calculations and display
let promptText = '';
let firstOperand = 0;
let secondOperand = 0;
let operationData = [];
let result = 0;
let numOperations = 0;
let prevClick = '';

btns.on('click', (e) => {

  // Evaluates if button pressed is a num-button
  if ($(e.target).hasClass('btn-num'))
  {
    // Checks to see if any  operations have been done yet, if not then we bgein with firstOperand
    if (numOperations === 0)
    {
      // checks to see if any digits have been concatenated to firstOperand. If not, then firstOperando becomes val of button pressed, and if there are digits, are concatenated on.
      if (firstOperand === 0)
      {
        if ($(e.target).attr('value') != 0)
        {
          firstOperand = $(e.target).attr('value');
        }
      }
      else
      {
        firstOperand += $(e.target).attr('value');
      }
      // Displays firstOperand
      promptText = firstOperand;
      resultPrompt.html(promptText);
    }
    // if there has been any operations clicked, then we are working with the secondOperand as frstOperand has been set to the result of previous operation
    else if (numOperations  > 0)
    {
      // Same logic as with firstOperand
      if (secondOperand === 0)
      {
        if ($(e.target).attr('value') != 0)
        {
          secondOperand = $(e.target).attr('value');
        }
      }
      else
      {
        secondOperand += $(e.target).attr('value');
      }
      // Displays whatever the entire prompt text is (firstOperand + operation + secondOperand in construction)
      if (secondOperand < 0)
      {
        promptText = firstOperand + getOperationSymbol(operationData[1]) + '(' + secondOperand + ')';
      }
      else
      {
        promptText = firstOperand + getOperationSymbol(operationData[1]) + secondOperand;
      }
      resultPrompt.html(promptText);
    }
  }
  // Evaluates if button pressed is an operator (+ - * /)
  else if ($(e.target).hasClass('btn-operator'))
  {
    // Evaluates if this is first operation of sequence
    if (operationData.length === 0)
    {
      // pushes whatever was in firstOperand to data Array, then pushes the calculation (as text)
      operationData.push(parseInt(firstOperand));
      operationData.push(e.target.id);

      // Concatenates the symbol for operation clicked to promptText for display
      promptText += getOperationSymbol(e.target.id);
      resultPrompt.html(promptText);

      // Increases operations count
      numOperations++;
    }
    // If a calculation has already been done, no need to push firstOperand to Array as the result from previous operation already occupies that value. Only need to push new operation to Array and display that in propmtText. operationData -> [prevResult]
    else if (operationData.length === 1)
    {
      operationData.push(e.target.id);
      promptText += getOperationSymbol(e.target.id);
      resultPrompt.html(promptText);
      numOperations++;
    }
    // Because when clicking an operator completes any running operation, we test to see if operationData already has the operation value. operationData -> [prevResult, 'operation']. We then push the secondOperand which is now complete and preform the operation
    else if (operationData.length > 1)
    {
      
      // pushes the secondOperand then resolves calculation, returning result and setting the entire calculation as display text as prevResultPrompt
      operationData.push(parseInt(secondOperand));
      prevResultPrompt.html(resolveCalc(operationData));

      // set firstOperand to the result of calculation and display new firstOperand with new calc symbol concatenated as promptText
      firstOperand = result;
      promptText = result + getOperationSymbol(e.target.id);
      resultPrompt.html(promptText);

      // Before moving on, update values in operationData, length now at 2. Set secondOperand to 0 and remove seocondOperand from Array.
      operationData[0] = firstOperand;
      operationData[1] = e.target.id;
      secondOperand = 0;
      operationData.pop();

      // Up operations count
      numOperations++;
    }
  }
  else if ($(e.target).hasClass('btn-no-num'))
  {
    // Evaluates if button clicked is AC and resets all calculation and display variables
    if (e.target.id === 'clear')
    {
      promptText = '';
      firstOperand = 0;
      secondOperand = 0;
      operationData = [];
      result = 0;
      numOperations = 0;
      prevClick = '';
      resultPrompt.html(promptText);
      prevResultPrompt.html('');
    }
    // Evaluates if button clicked is equals button. Behaves very similar as when an operator button is clicked and the Array already as [firstOperand, 'operation']. Only does not add new calculation straight away
    else if (e.target.id === 'equals')
    {
      // If audio is activated with 'play' class, then siuuAudio plays
      if (equalsBtn.hasClass('play'))
      {
        siuAudio.play();
      }

      // pushes the secondOperand then resolves calculation, returning result and setting the entire calculation as display text as prevResultPrompt
      operationData.push(parseInt(secondOperand));
      prevResultPrompt.html(resolveCalc(operationData));

      // set firstOperand to the result of calculation and display new firstOperand with NO operationn symbol concatenated
      firstOperand = result;
      promptText = result;
      resultPrompt.html(result);

      // Updates operationData, setting firstOperando to result from calculation, then removes last two values, operation and secondOperando. Also resets secondOperando to 0.
      secondOperand = 0;
      operationData[0] = result;
      operationData.splice(1,2);
    }

    // Plus minus
    else if (e.target.id === 'pos-neg')
    {
      console.log("plus minus button clicked")
      if (operationData.length === 0 && firstOperand != 0)
      {
        firstOperand *= -1;
        promptText = firstOperand;
        resultPrompt.html(promptText);
      }
      else if (operationData.length === 2 && secondOperand != 0)
      {
        secondOperand *= -1
        if (secondOperand < 0)
        {
          promptText = firstOperand + getOperationSymbol(operationData[1]) + '(' + secondOperand + ')';
        }
        else 
        {
          promptText = firstOperand + getOperationSymbol(operationData[1]) + secondOperand;
        }
        resultPrompt.html(promptText);
      }
    }
  }

  // Very similar to equalsBtn and a second operation with added implications if it is first button pressed.
  else if (e.target.id === "champions") 
  {
    // If audio is activated with 'play' class, then championsAudio plays
    if (championsBtn.hasClass('play'))
    {
      championsAudio.play();
    }

    // Evaluates if any operations have been done. If not, then firstOperand becomes 15, is displayed in promptText and updated in operationData Array
    if (numOperations === 0)
    {
      firstOperand = 15;
      operationData.push(firstOperand);
      promptText = firstOperand;
      resultPrompt.html(firstOperand);
    }

    // Otherwise it acts as the equals button, with secondOperand becoming 15.
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

  // Evaluates if audio button is clicked and activates/deactivates play feature by toggling 'play' class on equals and chamions button
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

// Returns symbol for display in rexultDivs depending on which operation was clicked
function getOperationSymbol(opp)
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

// Resolves calculation, saving result in global result variable accessed in other parts of file. Returns string representing entire operation to be display in the top part of resulDiv
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


// Hamburger-menu for calculator page only
const hamburgerToggle = $('#hamburger-toggler');
const hamburgerMenu = $('#hamburger-menu');
const hamburgerNav = $('nav#hamburger-menu ul');

// First menu slides in then display Nav ul
function showHamburgerNav()
{
  return new Promise((resolve) => 
  {
    setTimeout(() =>
    {
      resolve(hamburgerNav.css('display', 'flex'));
    }, 400);
  });
}

async function showHamburgerMenu() {

  hamburgerMenu.css('display', 'block');
  hamburgerMenu.animate({width: '100%'}, 200);
  await showHamburgerNav();
}

// First Display none Nav ul then menu slides out
function hideHamburgerMenu() {

  return new Promise((resolve) => 
    {
      setTimeout(() =>
      {
        resolve(hamburgerMenu.animate({width: '0'}, 200));
      }, 200);
    });
}

async function hideHamburgerNav()
{
  hamburgerNav.css('display', 'none');
  await hideHamburgerMenu();
}

hamburgerToggle.on('click', (e) => {

  console.log("Toggle Clicked");
  hamburgerToggle.toggleClass('open');
  if ($(e.target).hasClass('open'))
  {
    console.log("Has Hamburger Class");
    showHamburgerMenu()
  }
  else
  {
    hideHamburgerNav();
  }
})
