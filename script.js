// - - GLOBAL - -
const MAX_CHARS = 150;

const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl  = document.querySelector('.feedbacks');
const submitBtnEl  = document.querySelector('.submit-btn');
const spinnerEl  = document.querySelector('.spinner');

// - - COUNTER COMPONENT - - //
const inputHandler = () => {
    // Determine the maxmimum number of characters
    const maxNrsChars = MAX_CHARS;

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


// - - FORM COMPONENT - - //

const showVisualIndicator = (textCheck) => {
    const className = textCheck === 'valid' ? 'form--valid' : 'form--invalid';

    // Show the valid form submission visual indicator
    formEl.classList.add(className);

    //Remove the valid form submission visual indicator
    setTimeout(() => {
        formEl.classList.remove(className);
    }, 2000);
};

const submitHandler = event => {
    // Prevent the default browser action (Submitting form data to the 'action'-address and refreshing page)
    event.preventDefault();
    
    // Get text from text area
    const text = textareaEl.value;
    
    // Validate text (e.g. check if hashtag is present and the text is long enough)
    if (text.includes('#') && text.length >= 5) {
        showVisualIndicator('valid');
    } else {
        showVisualIndicator('invalid');

        // Focus on the text area again
        textareaEl.focus();

        // Stop the function exectution
        return;
    }

    // We have text, now we need to extract other info from the text
    const hashtag = text.split(' ').find(word => word.includes('#'));
    const company = hashtag.substring(1);
    const badgeLetter = company.substring(0, 1).toUpperCase();
    const upvoteCount = 0;
    const daysAgo = 0;

    // New feedback item HTML
    const feedbackItemHTML = `
        <li class="feedback">
            <button class="upvote">
                <i class="fa-solid fa-caret-up upvote__icon"></i>
                <span class="upvote__count">${upvoteCount}</span>
            </button>
            <section class="feedback__badge">
                <p class="feedback__letter">${badgeLetter}</p>
            </section>
            <div class="feedback__content">
                <p class="feedback__company">${company}</p>
                <p class="feedback__text">${text}</p>
            </div>
            <p class="feedback__date">${daysAgo === 0 ? 'NEW' : `${daysAgo}d`}</p>
        </li>

    `;

    // Insert the HTML item into the unordered list
    feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);

    // Clear the text area after submission
    textareaEl.value = '';

    // Blur the submit button after submission
    submitBtnEl.blur();

    // Reset the counter after submission
    counterEl.textContent = MAX_CHARS;

    console.log(counterEl);
};

formEl.addEventListener('submit', submitHandler);

// - - FEEDBACK LIST COMPONENT -- //
fetch('https://bytegrad.com/course-assets/js/1/api/feedbacks')
    .then(response => response.json())
    .then(data => {
        // Removing the loading spinner animation
        spinnerEl.remove();

        // Iterate over each element in the feedbacks array and render it in list
        data.feedbacks.forEach(feedbackItem => {
            // New feedback item HTML
            const feedbackItemHTML = `
            <li class="feedback">
                <button class="upvote">
                    <i class="fa-solid fa-caret-up upvote__icon"></i>
                    <span class="upvote__count">${feedbackItem.upvoteCount}</span>
                </button>
                <section class="feedback__badge">
                    <p class="feedback__letter">${feedbackItem.badgeLetter}</p>
                </section>
                <div class="feedback__content">
                    <p class="feedback__company">${feedbackItem.company}</p>
                    <p class="feedback__text">${feedbackItem.text}</p>
                </div>
                <p class="feedback__date">${feedbackItem.daysAgo === 0 ? 'NEW' : `${feedbackItem.daysAgo}d`}</p>
            </li>
    
        `;
    
        // Insert the HTML item into the unordered list
        feedbackListEl.insertAdjacentHTML('beforeend', feedbackItemHTML);
        
    });

})
.catch(error => {
    feedbackListEl.textContent = `Failed to fetch feedback items. Error message: ${error.message}`;
})

