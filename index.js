document.addEventListener('DOMContentLoaded', function() {
    //  DOMELEMENTS
    const dayInput = document.getElementById('day');
    const monthSelect = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const calculateBtn = document.getElementById('calculate-btn');
    const resetBtn = document.getElementById('reset-btn');

    // RESULTS OF ELEMENTS
    const yearsDisplay = document.getElementById('years');
    const monthsDisplay = document.getElementById('months');
    const daysDisplay = document.getElementById('days');




    // error messages
    const dayError = document.getElementById('day-error');
    const monthError = document.getElementById('month-error');
    const yearError = document.getElementById('year-error');



    // events
    calculateBtn.addEventListener('click', calculatedAge);
    resetBtn.addEventListener('click', resetCalculator);

    // real-time validation
    dayInput.addEventListener('input', validateDay);
    yearInput.addEventListener('input', validateYear);
    monthSelect.addEventListener('change', validateMonth);

    // day validation function 
    function validateDay() {
        const day = parseInt(dayInput.value);

        if (isNaN(day) || day < 1 || day > 31) {
            dayError.textContent = "enter a valid day (1-31)";
            dayInput.style.borderColor = " #e74c3c";
            return false;
        }

        // Validation based on selected month 
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearInput.value);

        if (!isNaN(month) && !isNaN(year)) {
            const daysInMonth = getDaysInMonth(month, year);
            if (day > daysInMonth) {
                dayError.textContent = `the month selected only has ${ daysInMonth } days`;
                dayInput.style.borderColor = " #e74c3c";
                return false;
            }
        }

        dayError.textContent = " ";
        dayInput.style.borderColor = " #2ecc71";
        return true;
    }

    // validation function of month
    function validateMonth() {
        const month = monthSelect.value;

        if (month === "") {
            monthError.textContent = "please select a month";
            monthSelect.style.borderColor = " #e74c3c";
            return false;
        }

        monthError.texteContent = "";
        monthSelect.style.borderColor = " #2ecc71";

        // Validete the day after selectimg the month
        if (dayInput.value) {
            validateDay();
        }

        return true;
    }

    // validation function of year 
    function validateYear() {
        const year = parseInt(yearInput.value);
        const currentYear = new Date().getFullYear();

        if (isNaN(year) || year < 1900 || year > currentYear) {
            yearError.textContent = `please entre a valid year (1900- ${ currentYear } )`;
            yearInput.style.borderColor = " #e74c3c";
            return false;
        }

        yearError.textContent = " ";
        yearInput.style.borderColor = " #2ecc71";

        // Validete the day after updating the year 
        if (dayInput.value) {
            validateDay();
        }

        return true;
    }

    // Function to obtain the number of days in a month
    function getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    }

    // principal function to calculate theage
    function calculatedAge() {
        // Validation of entries
        const isDayValid = validateDay();
        const isMonthValid = validateMonth();
        const isYearValid = validateYear();

        if (!isDayValid || !isMonthValid || !isYearValid) {
            alert("please correct all errors before  calculating.");
            return;
        }

        // Reception of values entered by users
        const day = parseInt(dayInput.value);
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearInput.value);

        // Date of birth
        const birth_date = new Date(year, month, day);
        const today = new Date();

        // Vérification the your birthday is not in the future
        if (birth_date > today) {
            alert("the date of  birth cannot be in the future !");
            return;
        }

        // Calculation of age
        let years = today.getFullYear() - birth_date.getFullYear();
        let months = today.getMonth() - birth_date.getMonth();
        let days = today.getDate() - birth_date.getDate();

        // Ajustements if days are negative
        if (day < 0) {
            month--;
            // Obtain the number of days in the precedent month
            const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            day += lastMonth.getDate();
        }

        // Ajustements if the months are negative
        if (months < 0) {
            years--;
            months += 12;
        }

        // display the results
        yearsDisplay.textContent = years;
        monthsDisplay.textContent = months;
        daysDisplay.textContent = days;



        // Animation des résultats
        animateResults();
    }







    // Function to animate the results
    function animateResults() {
        const ageBoxes = document.querySelectorAll('.age-box');

        ageBoxes.forEach(box => {
            box.style.transform = 'scale(1.05)';
            setTimeout(() => {
                box.style.transform = 'scale(1)';
            }, 300);
        });
    }

    // Function to reset the calculator
    function resetCalculator() {
        dayInput.value = ' ';
        monthSelect.value = ' ';
        yearInput.value = ' ';

        dayError.textContent = ' ';
        monthError.textContenu = '';
        yearError.textContent = ' ';

        dayInput.style.borderColor = ' #ddd ';
        monthSelect.style.borderColor = ' #ddd ';
        yearInput.style.borderColor = ' #ddd ';

        yearsDisplay.textContenu = '--';
        monthsDisplay.textContenu = '--';
        daysDisplay.textContenu = '--';



    }

    // Initialization using a default date  (optionnel)
    function initDefaultDate() {
        // define a default date  (30 years ago )
        const defaultDate = new Date();
        defaultDate.setFullYear(defaultDate.getFullYear() - 30);

        dayInput.value = defaultDate.getDate();
        monthSelect.value = defaultDate.getMonth();
        yearInput.value = defaultDate.getFullYear();

        // Validate all enteries
        validateDay();
        validateMonth();
        validateYear();
    }


});
