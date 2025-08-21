// - - GLOBAL - -
const MAX_CHARS = 150;
const BASE_API_URL = 'https://bytegrad.com/course-assets/js/1/api';


const textareaEl = document.querySelector('.form__textarea');
const counterEl = document.querySelector('.counter');
const formEl = document.querySelector('.form');
const feedbackListEl  = document.querySelector('.feedbacks');
const submitBtnEl  = document.querySelector('.submit-btn');
const spinnerEl  = document.querySelector('.spinner');
const hastagListEl  = document.querySelector('.hashtags');

const renderFeedbackItem = feedbackItem => {
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
};

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

    // Render feedback item in list
    const feedbackItem = {
        upvoteCount,
        company,
        badgeLetter,
        daysAgo,
        text
    };
    renderFeedbackItem(feedbackItem);

    // Send feedback items to the server
    fetch(`${BASE_API_URL}/feedbacks`, {
        method: 'POST',
        body: JSON.stringify(feedbackItem),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            console.log('Something went wrong');
            return;
        } 
        
        console.log('Sucessfully submitted');
    }).catch(error => console.log(error));

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
const clickHandler = event => {
    // Get the HTML element which has been clicked
    const clickedEl = event.target;

    // Determine if user intended to upvote or epand the comment
    const upvoteIntention = clickedEl.className.includes('upvote');

    // Run the appropriate logic for the two options above
    if (upvoteIntention) {
        // Get the closest upvote button
        const upvoteBtnEl = clickedEl.closest('.upvote');

        // Disable upvote button (prevents double clicks, spam)
        upvoteBtnEl.disabled = true;

        // Select the upvote count element within the upvote button
        const upvoteCountEl = upvoteBtnEl.querySelector('.upvote__count');

        // Get the current displayed upvote count number
        let upvoteCount = +upvoteCountEl.textContent;

        // Set upvote count incremented by 1
        upvoteCountEl.textContent = ++upvoteCount;

        console.log(typeof upvoteCount);
    } else {
        // Expand the clicked feedback Item - A way to target specific list items
        clickedEl.closest('.feedback').classList.toggle('feedback--expand');
    }

};

feedbackListEl.addEventListener('click', clickHandler);

fetch(`${BASE_API_URL}/feedbacks`)
    .then(response => response.json())
    .then(data => {
        // Removing the loading spinner animation
        spinnerEl.remove();

        // Iterate over each element in the feedbacks array and render it in list
        data.feedbacks.forEach(feedbackItem => renderFeedbackItem(feedbackItem));

})
.catch(error => {
    feedbackListEl.textContent = `Failed to fetch feedback items. Error message: ${error.message}`;
})

// - - HASHTAG LIST COMPONENT - - 
const clickHandler2 = event => {
    // Get the clicked element
    const clickedEl = event.target;

    // Stop function if click happens in list, but not outside buttons
    if (clickedEl.className === 'hashtags') return;

    // Extract the actual company name that was clicked
    const companyNameFromHashtag = clickedEl.textContent.substring(1).toLowerCase().trim();

    // Iterate over each feedback item in the list
    feedbackListEl.childNodes.forEach(childNode => {
        // Stop this iteration if it's a text node
        if (childNode.nodeType === 3) return;

        // Extract company name from the li
        const companyNameFromFeedbackItem = childNode.querySelector('.feedback__company').textContent.toLowerCase().trim();

        // Remove feedback items from list if company names are not equal
        if (companyNameFromHashtag !== companyNameFromFeedbackItem) {
            childNode.remove();
        }
    });

    console.log(clickedEl);
};

hastagListEl.addEventListener('click', clickHandler2)