// Set max date to today for both inputs
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('birthDate').max = today;
    document.getElementById('calculateAt').max = today;
    document.getElementById('calculateAt').value = today;
    
    // Auto-calculate on page load with example
    setTimeout(calculateAge, 100);
});

document.getElementById('calculateBtn').addEventListener('click', calculateAge);
document.getElementById('todayBtn').addEventListener('click', setToToday);

// Share functionality
document.getElementById('shareBtn').addEventListener('click', shareApp);

function calculateAge() {
    const birthDate = new Date(document.getElementById('birthDate').value);
    const calculateAt = new Date(document.getElementById('calculateAt').value);
    
    if (!birthDate.getTime()) {
        alert("Please select your birth date!");
        return;
    }
    
    if (birthDate > calculateAt) {
        alert("Birth date cannot be in the future!");
        return;
    }
    
    let years = calculateAt.getFullYear() - birthDate.getFullYear();
    let months = calculateAt.getMonth() - birthDate.getMonth();
    let days = calculateAt.getDate() - birthDate.getDate();
    
    // Adjust for negative days/months
    if (days < 0) {
        months--;
        // Get days in previous month
        const prevMonth = new Date(calculateAt.getFullYear(), calculateAt.getMonth(), 0);
        days += prevMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Update display
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    
    // Calculate totals
    const totalDays = Math.floor((calculateAt - birthDate) / (1000 * 60 * 60 * 24));
    const totalMonths = Math.floor(totalDays / 30.44);
    
    document.getElementById('totalDays').textContent = totalDays.toLocaleString();
    document.getElementById('totalMonths').textContent = totalMonths.toLocaleString();
    
    // Calculate next birthday
    const nextBirthday = getNextBirthday(birthDate, calculateAt);
    document.getElementById('nextBirthday').textContent = `Next birthday in: ${nextBirthday} days`;
    
    // Get zodiac sign
    const zodiac = getZodiacSign(birthDate);
    document.getElementById('zodiacSign').textContent = `Zodiac: ${zodiac}`;
    
    // Get day of birth
    const birthDay = birthDate.toLocaleDateString('en-US', { weekday: 'long' });
    document.getElementById('birthDay').textContent = `Born on: ${birthDay}`;
}

function getNextBirthday(birthDate, currentDate) {
    const currentYear = currentDate.getFullYear();
    let nextBirthday = new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    
    if (nextBirthday < currentDate) {
        nextBirthday.setFullYear(currentYear + 1);
    }
    
    const diffTime = nextBirthday - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

function getZodiacSign(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    
    if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) return "Capricorn ♑";
    if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) return "Aquarius ♒";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces ♓";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) return "Aries ♈";
    if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) return "Taurus ♉";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini ♊";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer ♋";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo ♌";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo ♍";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra ♎";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 22)) return "Scorpio ♏";
    if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) return "Sagittarius ♐";
    return "Unknown";
}

function setToToday() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('calculateAt').value = today;
    calculateAge();
}

function shareApp() {
    const shareData = {
        title: 'Age Calculator App',
        text: 'Check out this cool Age Calculator app! Calculate your exact age in years, months, and days.',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData)
            .then(() => console.log('App shared successfully'))
            .catch((error) => console.log('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert('Link copied to clipboard! Send it to your friends.'))
            .catch(() => {
                // Final fallback
                prompt('Copy this link to share:', window.location.href);
            });
    }
}

// Optional: Add to Home Screen functionality
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    // You can show an install button here
    console.log('App can be installed on home screen');
});