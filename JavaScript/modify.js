// First donation card handler
donationHandle(
    'noakhali-donate-btn', 
    'noakhali-donate-amount', 
    'noakhali-amount', 
    'total-amount', 
    'history-section', 
    'noakhali-heading'
);

// Second donation card handler
donationHandle(
    'feni-donate-btn', 
    'feni-donate-amount', 
    'feni-amount', 
    'total-amount', 
    'history-section', 
    'feni-heading'
);

// Third donation card handler
donationHandle(
    'protest-donate-btn', 
    'protest-donate-amount', 
    'protest-amount', 
    'total-amount', 
    'history-section', 
    'quota-heading'
);

//  navigating to blog page
document.getElementById('blog-btn').addEventListener('click', function () {
    window.location.href = "blog.html";
});





//o get input value as a number
function getInputAsNumber(id) {
    const inputValue = document.getElementById(id).value;
    const inputValueAsNumber = Number(inputValue);
    return inputValueAsNumber;
}

// get text value as a number
function getTextAsNumber(id) {
    const textValue = document.getElementById(id).innerText;
    const textValueAsNumber = Number(textValue);
    return textValueAsNumber;
}

// Donation view and history view
const donationButton = document.getElementById('donation-btn');
const historyButton = document.getElementById('history-btn');
const footerDiv = document.getElementById('footer-div');

historyButton.addEventListener('click', function () {
    historyButton.classList.add('bg-primary-color');
    historyButton.classList.remove('bg-white');
    donationButton.classList.remove('bg-primary-color');
    donationButton.classList.add('bg-white');
    
    document.getElementById('card-section').classList.add('hidden');
    document.getElementById('history-section').classList.remove('hidden');
    footerDiv.classList.remove('hidden'); 
});

donationButton.addEventListener('click', function () {
    donationButton.classList.add('bg-primary-color');
    donationButton.classList.remove('bg-white');
    historyButton.classList.remove('bg-primary-color');
    historyButton.classList.add('bg-white');
    
    document.getElementById('card-section').classList.remove('hidden');
    document.getElementById('history-section').classList.add('hidden');
    footerDiv.classList.remove('hidden'); 
});

// handle donation logic for each card
function donationHandle(buttonId, donationInputNumberId, totalDonationId, totalAmountId, historySection, titleId) {
    document.getElementById(buttonId).addEventListener('click', function () {
        let donateAmount = getInputAsNumber(donationInputNumberId);
        let currentDonationAmount = getTextAsNumber(totalDonationId);
        let totalAmount = getTextAsNumber(totalAmountId);

        if (isNaN(donateAmount) || donateAmount <= 0) {
            document.getElementById(donationInputNumberId).value = '';
            alert('Please enter a valid donation amount.');
            return;
        }

        if (donateAmount > totalAmount) {
            document.getElementById(donationInputNumberId).value = '';
            alert("Insufficient balance to make the donation.");
            return;
        }

        //  current donation and total available amounts
        currentDonationAmount += donateAmount;
        document.getElementById(totalDonationId).innerText = currentDonationAmount.toFixed(2);
        document.getElementById(donationInputNumberId).value = '';

        totalAmount -= donateAmount;
        document.getElementById(totalAmountId).innerText = totalAmount.toFixed(2);

        //  new donation history entry
        let title = document.getElementById(titleId).textContent;
        let history = document.getElementById(historySection);
        let newHistory = document.createElement('div');

        newHistory.innerHTML = `
            <div class="flex flex-col p-5 bg-white border border-border-color rounded-2xl">
                <h3 class="text-lg font-bold">
                    ${donateAmount.toFixed(2)} Taka donated for ${title}
                </h3>
                <p id="history-date" class="text-sm md:text-base text-paragraph-color">
                </p>
            </div>
        `;

        history.insertBefore(newHistory, history.firstChild);

        //  new history entry
        const date = new Date();
        newHistory.querySelector("#history-date").innerText = "Date: " + date.toString();

        // Display confirmation modal
        const displayModal = document.getElementById('my_modal_1');
        displayModal.showModal();
    });
};

// background change on scroll
const siteHeader = document.getElementById('header');

function scrollHeaderStyle() {
    if (window.scrollY > 50) {
        siteHeader.classList.add('backdrop-blur-lg', 'bg-white/30');
    } else {
        siteHeader.classList.remove('backdrop-blur-lg', 'bg-white/30');
    }
}

window.addEventListener('scroll', scrollHeaderStyle);
