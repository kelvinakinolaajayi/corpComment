// - - COUNTER COMPONENT - - //

const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');

const inputHandler = () => {
    // Determine the maxmimum number of characters
    const maxNrsChars = 150;

    // Determine the number of characters currently typed
    const nrCharsTyped = textareaEl.value.length;

    // Calculate the number of characters left (maxium minus currently typed)
    const charsLeft = maxNrsChars - nrCharsTyped;

    // Remember to always save the JavaScript file to see the changes in your app
    // console.log(charsLeft);

    // Show number of characters left
    counterEl.textContent = charsLeft; 
};

textareaEl.addEventListener('input', inputHandler);


// - - SUBMIT COMPONENT - - //
const formEl = document.querySelector('.form');

const submitHandler = () => {
    console.log(1);
}

formEl.addEventListener('submit', submitHandler);