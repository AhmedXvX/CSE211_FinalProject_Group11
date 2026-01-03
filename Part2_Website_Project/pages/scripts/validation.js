class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.inputs = this.form.querySelectorAll('input, select, textarea');
        this.inputs.forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    validateField(input) {
        const value = input.value.trim();
        const errorSpan = input.nextElementSibling;
        let isValid = true;
        let errorMessage = '';

        if (input.hasAttribute('required') && value === '') {
            isValid = false;
            errorMessage = 'This field is required.';
        } else if (input.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
        } else if (input.type === 'number') {
            const min = input.getAttribute('min');
            const max = input.getAttribute('max');
            if (min && parseInt(value) < parseInt(min)) {
                isValid = false;
                errorMessage = `Value must be at least ${min}.`;
            }
            if (max && parseInt(value) > parseInt(max)) {
                isValid = false;
                errorMessage = `Value must be at most ${max}.`;
            }
        }

        if (errorSpan && errorSpan.classList.contains('error-message')) {
            if (!isValid) {
                errorSpan.textContent = errorMessage;
                errorSpan.style.display = 'block';
                input.style.borderColor = '#ef4444';
            } else {
                errorSpan.style.display = 'none';
                input.style.borderColor = '#cbd5e1';
            }
        }

        return isValid;
    }

    handleSubmit(e) {
        let isFormValid = true;
        this.inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            e.preventDefault();
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new FormValidator('registrationForm');
    new FormValidator('contactForm');
});
