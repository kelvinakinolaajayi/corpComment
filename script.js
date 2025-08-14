// - - GLOBAL - -
const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');

// - - COUNTER COMPONENT - - //
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
const submitHandler = event => {
    // Prevent the default browser action (Submitting form data to the 'action'-address and refreshing page)
    event.preventDefault();
    
    // Get text from text area
    const text = textareaEl.value;
    
    // Validate text (e.g. check if hashtag is present and the text is long enough)
    if (text.includes('#') && text.length >= 5) {
        // Show the valid form submission visual indicator
        formEl.classList.add('form--valid');

        //Remove the valid form submission visual indicator
        setTimeout(() => {
            formEl.classList.remove('form--valid');
        }, 2000);
    } else {
        // Show the invalid form submission visual indicator
        formEl.classList.add('form--invalid');

        setTimeout(() => {
            //Remove the invalid form submission visual indicator
            formEl.classList.remove('form--invalid');
        }, 2000);

        // Focus on the text area again
        textareaEl.focus();

        // Stop the function exectution
        return;
    }

    // We have text, now we need to extract other info from the text
    const hashtag = text.split(' ').find(word => word.includes('#'));
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase;
    const upvoteCount = 0;
    const days Ago = 0;

    
};

formEl.addEventListener('submit', submitHandler);