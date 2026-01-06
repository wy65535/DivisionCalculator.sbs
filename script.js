// Long Division Calculator JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const dividendInput = document.getElementById('dividend');
    const divisorInput = document.getElementById('divisor');
    const chainDividendInput = document.getElementById('chainDividend');
    const chainDivisorsInput = document.getElementById('chainDivisors');
    const calculateBtn = document.getElementById('calculateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const exampleBtn = document.getElementById('exampleBtn');
    const modeButtons = document.querySelectorAll('.mode-btn');
    const simpleModeDiv = document.getElementById('simpleMode');
    const chainModeDiv = document.getElementById('chainMode');
    const quickTabs = document.querySelectorAll('.quick-tab');
    const quickSimpleDiv = document.getElementById('quickSimple');
    const quickChainDiv = document.getElementById('quickChain');
    const showStepsCheckbox = document.getElementById('showSteps');
    const showDecimalsCheckbox = document.getElementById('showDecimals');
    const showAnimationCheckbox = document.getElementById('showAnimation');
    const resultContainer = document.getElementById('result');
    const visualizationContainer = document.getElementById('visualization');
    const historyList = document.getElementById('historyList');
    const clearHistoryBtn = document.getElementById('clearHistory');
    const quickCalcButtons = document.querySelectorAll('.quick-calc-btn');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // History array
    let calculationHistory = JSON.parse(localStorage.getItem('divisionHistory')) || [];
    
    // Current mode
    let currentMode = 'simple'; // 'simple' or 'chain'

    // Initialize
    init();

    function init() {
        // Event listeners
        calculateBtn.addEventListener('click', performCalculation);
        clearBtn.addEventListener('click', clearInputs);
        exampleBtn.addEventListener('click', loadExample);
        clearHistoryBtn.addEventListener('click', clearHistory);
        
        // Mode switcher
        modeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const mode = this.dataset.mode;
                switchMode(mode);
            });
        });
        
        // Quick calc tabs
        quickTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabType = this.dataset.tab;
                switchQuickTab(tabType);
            });
        });
        
        // Quick calculation buttons - simple
        quickCalcButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                switchMode('simple');
                dividendInput.value = this.dataset.dividend;
                divisorInput.value = this.dataset.divisor;
                performCalculation();
            });
        });
        
        // Quick calculation buttons - chain
        document.querySelectorAll('.quick-calc-btn-chain').forEach(btn => {
            btn.addEventListener('click', function() {
                switchMode('chain');
                chainDividendInput.value = this.dataset.dividend;
                chainDivisorsInput.value = this.dataset.divisors;
                performCalculation();
            });
        });

        // Enter key to calculate
        dividendInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performCalculation();
        });
        divisorInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performCalculation();
        });
        chainDividendInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performCalculation();
        });
        chainDivisorsInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') performCalculation();
        });

        // Mobile menu toggle
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
            });
        }

        // FAQ accordion
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Load history
        displayHistory();
    }

    function switchMode(mode) {
        currentMode = mode;
        
        // Update mode buttons
        modeButtons.forEach(btn => {
            if (btn.dataset.mode === mode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update mode divs
        if (mode === 'simple') {
            simpleModeDiv.classList.add('active');
            chainModeDiv.classList.remove('active');
        } else {
            simpleModeDiv.classList.remove('active');
            chainModeDiv.classList.add('active');
        }
        
        // Clear results
        resultContainer.classList.remove('active');
        visualizationContainer.classList.remove('active');
    }
    
    function switchQuickTab(tabType) {
        // Update tabs
        quickTabs.forEach(tab => {
            if (tab.dataset.tab === tabType) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
        
        // Update content
        if (tabType === 'simple') {
            quickSimpleDiv.style.display = 'grid';
            quickChainDiv.style.display = 'none';
        } else {
            quickSimpleDiv.style.display = 'none';
            quickChainDiv.style.display = 'grid';
        }
    }

    function performCalculation() {
        if (currentMode === 'simple') {
            performSimpleDivision();
        } else {
            performChainDivision();
        }
    }
    
    function performSimpleDivision() {
        const dividend = parseFloat(dividendInput.value);
        const divisor = parseFloat(divisorInput.value);

        // Validation
        if (isNaN(dividend) || isNaN(divisor)) {
            showError('Please enter valid numbers');
            return;
        }

        if (divisor === 0) {
            showError('Cannot divide by zero!');
            return;
        }

        if (dividend < 0 || divisor < 0) {
            showError('Please enter positive numbers');
            return;
        }

        // Perform calculation
        const result = calculateLongDivision(dividend, divisor);
        displayResult(result);

        // Add to history
        addToHistory(dividend, divisor, result);

        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function performChainDivision() {
        const startNumber = parseFloat(chainDividendInput.value);
        const divisorsText = chainDivisorsInput.value.trim();
        
        // Validation
        if (isNaN(startNumber)) {
            showError('Please enter a valid starting number');
            return;
        }
        
        if (!divisorsText) {
            showError('Please enter divisors (separated by commas or spaces)');
            return;
        }
        
        // Parse divisors
        const divisors = divisorsText
            .split(/[,\s]+/)
            .map(d => parseFloat(d.trim()))
            .filter(d => !isNaN(d));
        
        if (divisors.length === 0) {
            showError('Please enter valid divisors');
            return;
        }
        
        // Check for zeros
        if (divisors.some(d => d === 0)) {
            showError('Cannot divide by zero!');
            return;
        }
        
        if (startNumber < 0 || divisors.some(d => d < 0)) {
            showError('Please enter positive numbers');
            return;
        }
        
        // Perform chain calculation
        const result = calculateChainDivision(startNumber, divisors);
        displayChainResult(result);
        
        // Add to history
        addChainToHistory(startNumber, divisors, result);
        
        // Scroll to result
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function calculateLongDivision(dividend, divisor) {
        const quotient = Math.floor(dividend / divisor);
        const remainder = dividend % divisor;
        const decimalResult = dividend / divisor;
        
        // Generate steps
        const steps = generateDivisionSteps(dividend, divisor);

        return {
            dividend: dividend,
            divisor: divisor,
            quotient: quotient,
            remainder: remainder,
            decimal: decimalResult,
            steps: steps
        };
    }

    function generateDivisionSteps(dividend, divisor) {
        const steps = [];
        let currentDividend = Math.floor(dividend);
        const dividendStr = currentDividend.toString();
        let workingNumber = 0;
        let quotientStr = '';

        for (let i = 0; i < dividendStr.length; i++) {
            workingNumber = workingNumber * 10 + parseInt(dividendStr[i]);
            
            if (workingNumber >= divisor) {
                const timesItGoes = Math.floor(workingNumber / divisor);
                const product = timesItGoes * divisor;
                const newRemainder = workingNumber - product;
                
                steps.push({
                    step: steps.length + 1,
                    working: workingNumber,
                    divisor: divisor,
                    times: timesItGoes,
                    product: product,
                    remainder: newRemainder,
                    description: `${divisor} goes into ${workingNumber} ${timesItGoes} time(s). ${timesItGoes} × ${divisor} = ${product}. Subtract: ${workingNumber} - ${product} = ${newRemainder}`
                });
                
                quotientStr += timesItGoes;
                workingNumber = newRemainder;
            } else {
                if (quotientStr.length > 0) {
                    quotientStr += '0';
                    steps.push({
                        step: steps.length + 1,
                        working: workingNumber,
                        divisor: divisor,
                        times: 0,
                        product: 0,
                        remainder: workingNumber,
                        description: `${divisor} does not go into ${workingNumber}. Write 0 in quotient.`
                    });
                }
            }
        }

        return steps;
    }

    function calculateChainDivision(startNumber, divisors) {
        const steps = [];
        let current = startNumber;
        
        divisors.forEach((divisor, index) => {
            const quotient = Math.floor(current / divisor);
            const remainder = current % divisor;
            const decimal = current / divisor;
            
            steps.push({
                step: index + 1,
                dividend: current,
                divisor: divisor,
                quotient: quotient,
                remainder: remainder,
                decimal: decimal,
                description: `Step ${index + 1}: ${current} ÷ ${divisor} = ${quotient}${remainder > 0 ? ` remainder ${remainder}` : ''}`
            });
            
            current = quotient; // Use quotient for next division
        });
        
        return {
            startNumber: startNumber,
            divisors: divisors,
            steps: steps,
            finalResult: current,
            expression: `${startNumber} ÷ ${divisors.join(' ÷ ')} = ${current}`
        };
    }
    
    function displayChainResult(result) {
        const showSteps = showStepsCheckbox.checked;
        const showDecimals = showDecimalsCheckbox.checked;
        const animate = showAnimationCheckbox.checked;
        
        let html = '<div class="result-summary">';
        html += result.expression;
        html += '</div>';
        
        html += '<div class="result-details">';
        html += '<h3>📊 Chain Division Summary</h3>';
        html += `<p><strong>Starting Number:</strong> ${result.startNumber}</p>`;
        html += `<p><strong>Divisors:</strong> ${result.divisors.join(', ')}</p>`;
        html += `<p><strong>Final Result:</strong> ${result.finalResult}</p>`;
        html += `<p><strong>Complete Expression:</strong> ${result.expression}</p>`;
        html += '</div>';
        
        if (showSteps) {
            html += '<div class="result-details">';
            html += '<h3>📝 Step-by-Step Chain Division</h3>';
            html += '<div class="division-steps">';
            
            result.steps.forEach((step, index) => {
                const delay = animate ? index * 500 : 0;
                const stepHtml = `
                    <div class="step-item">
                        <span class="step-number">${step.step}</span>
                        <div style="flex: 1;">
                            <strong>${step.description}</strong>
                            ${showDecimals && step.remainder > 0 ? `<div style="margin-top: 0.5rem; color: var(--text-light);">As decimal: ${step.decimal.toFixed(4)}</div>` : ''}
                            <div style="margin-top: 0.5rem; color: var(--text-light);">
                                Verification: ${step.quotient} × ${step.divisor} + ${step.remainder} = ${step.dividend} ✓
                            </div>
                        </div>
                    </div>
                `;
                
                if (animate) {
                    setTimeout(() => {
                        const stepsContainer = document.querySelector('.division-steps');
                        if (stepsContainer) {
                            stepsContainer.insertAdjacentHTML('beforeend', stepHtml);
                        }
                    }, delay);
                } else {
                    html += stepHtml;
                }
            });
            
            html += '</div>';
            html += '</div>';
        }
        
        // Add visual representation
        html += '<div class="result-details">';
        html += '<h3>🔢 Chain Division Process</h3>';
        html += '<div style="font-family: monospace; background: var(--light-color); padding: 1.5rem; border-radius: 8px; overflow-x: auto;">';
        
        let current = result.startNumber;
        result.steps.forEach((step, index) => {
            if (index === 0) {
                html += `<div style="margin-bottom: 0.5rem;"><strong>${current}</strong></div>`;
            }
            html += `<div style="margin-bottom: 0.5rem; padding-left: ${index * 20}px;">`;
            html += `÷ ${step.divisor} = <strong>${step.quotient}</strong>`;
            if (step.remainder > 0) {
                html += ` (remainder: ${step.remainder})`;
            }
            html += `</div>`;
        });
        
        html += `<div style="margin-top: 1rem; padding-top: 1rem; border-top: 2px solid var(--primary-color); font-size: 1.125rem;">`;
        html += `<strong>Final Answer: ${result.finalResult}</strong>`;
        html += `</div>`;
        
        html += '</div>';
        html += '</div>';
        
        resultContainer.innerHTML = html;
        resultContainer.classList.add('active');
        visualizationContainer.classList.remove('active');
    }

    function displayResult(result) {
        const showSteps = showStepsCheckbox.checked;
        const showDecimals = showDecimalsCheckbox.checked;
        const animate = showAnimationCheckbox.checked;

        let html = '<div class="result-summary">';
        html += `${result.dividend} ÷ ${result.divisor} = ${result.quotient}`;
        
        if (result.remainder > 0) {
            html += ` R${result.remainder}`;
        }
        
        if (showDecimals && result.remainder > 0) {
            html += ` (or ${result.decimal.toFixed(6)})`;
        }
        
        html += '</div>';

        html += '<div class="result-details">';
        html += '<h3>📊 Division Summary</h3>';
        html += `<p><strong>Dividend:</strong> ${result.dividend}</p>`;
        html += `<p><strong>Divisor:</strong> ${result.divisor}</p>`;
        html += `<p><strong>Quotient:</strong> ${result.quotient}</p>`;
        html += `<p><strong>Remainder:</strong> ${result.remainder}</p>`;
        
        if (showDecimals) {
            html += `<p><strong>Decimal Result:</strong> ${result.decimal}</p>`;
        }

        // Verification
        const verification = (result.quotient * result.divisor) + result.remainder;
        html += `<p><strong>Verification:</strong> (${result.quotient} × ${result.divisor}) + ${result.remainder} = ${verification} ✓</p>`;
        html += '</div>';

        if (showSteps && result.steps.length > 0) {
            html += '<div class="result-details">';
            html += '<h3>📝 Step-by-Step Solution</h3>';
            html += '<div class="division-steps">';
            
            result.steps.forEach((step, index) => {
                const delay = animate ? index * 500 : 0;
                setTimeout(() => {
                    const stepHtml = `
                        <div class="step-item">
                            <span class="step-number">${step.step}</span>
                            <span>${step.description}</span>
                        </div>
                    `;
                    if (animate) {
                        const stepsContainer = document.querySelector('.division-steps');
                        if (stepsContainer) {
                            stepsContainer.insertAdjacentHTML('beforeend', stepHtml);
                        }
                    }
                }, delay);
            });

            if (!animate) {
                result.steps.forEach(step => {
                    html += `
                        <div class="step-item">
                            <span class="step-number">${step.step}</span>
                            <span>${step.description}</span>
                        </div>
                    `;
                });
            }
            
            html += '</div>';
            html += '</div>';
        }

        resultContainer.innerHTML = html;
        resultContainer.classList.add('active');

        // Display visual representation
        if (showSteps) {
            displayVisualization(result);
        }
    }

    function displayVisualization(result) {
        let visual = '<div class="long-division-visual">';
        visual += '<pre>';
        visual += `         ${result.quotient}\n`;
        visual += `      ________\n`;
        visual += `${result.divisor} | ${result.dividend}\n`;
        visual += '\n';
        visual += 'Long division visualization:\n';
        visual += `${result.dividend} ÷ ${result.divisor} = ${result.quotient} remainder ${result.remainder}\n`;
        visual += '</pre>';
        visual += '</div>';

        visualizationContainer.innerHTML = visual;
        visualizationContainer.classList.add('active');
    }

    function showError(message) {
        resultContainer.innerHTML = `
            <div class="result-summary" style="color: var(--danger-color);">
                ⚠️ ${message}
            </div>
        `;
        resultContainer.classList.add('active');
        visualizationContainer.classList.remove('active');
    }

    function clearInputs() {
        dividendInput.value = '';
        divisorInput.value = '';
        chainDividendInput.value = '';
        chainDivisorsInput.value = '';
        resultContainer.classList.remove('active');
        visualizationContainer.classList.remove('active');
        
        if (currentMode === 'simple') {
            dividendInput.focus();
        } else {
            chainDividendInput.focus();
        }
    }

    function loadExample() {
        if (currentMode === 'simple') {
            const examples = [
                { dividend: 156, divisor: 12 },
                { dividend: 567, divisor: 8 },
                { dividend: 9876, divisor: 23 },
                { dividend: 4567, divisor: 13 },
                { dividend: 1234, divisor: 17 },
                { dividend: 8888, divisor: 11 }
            ];
            
            const example = examples[Math.floor(Math.random() * examples.length)];
            dividendInput.value = example.dividend;
            divisorInput.value = example.divisor;
        } else {
            const examples = [
                { dividend: 1000, divisors: '5, 4, 10' },
                { dividend: 720, divisors: '2, 3, 4' },
                { dividend: 10000, divisors: '25, 8, 5' },
                { dividend: 8640, divisors: '12, 6, 4' },
                { dividend: 5040, divisors: '7, 6, 5' }
            ];
            
            const example = examples[Math.floor(Math.random() * examples.length)];
            chainDividendInput.value = example.dividend;
            chainDivisorsInput.value = example.divisors;
        }
        
        performCalculation();
    }

    function addToHistory(dividend, divisor, result) {
        const historyItem = {
            type: 'simple',
            dividend: dividend,
            divisor: divisor,
            quotient: result.quotient,
            remainder: result.remainder,
            timestamp: new Date().toISOString()
        };

        calculationHistory.unshift(historyItem);
        
        // Keep only last 10 items
        if (calculationHistory.length > 10) {
            calculationHistory = calculationHistory.slice(0, 10);
        }

        // Save to localStorage
        localStorage.setItem('divisionHistory', JSON.stringify(calculationHistory));
        
        displayHistory();
    }
    
    function addChainToHistory(startNumber, divisors, result) {
        const historyItem = {
            type: 'chain',
            startNumber: startNumber,
            divisors: divisors,
            finalResult: result.finalResult,
            expression: result.expression,
            timestamp: new Date().toISOString()
        };

        calculationHistory.unshift(historyItem);
        
        // Keep only last 10 items
        if (calculationHistory.length > 10) {
            calculationHistory = calculationHistory.slice(0, 10);
        }

        // Save to localStorage
        localStorage.setItem('divisionHistory', JSON.stringify(calculationHistory));
        
        displayHistory();
    }

    function displayHistory() {
        if (calculationHistory.length === 0) {
            historyList.innerHTML = '<p style="color: var(--text-light); text-align: center;">No calculation history yet</p>';
            return;
        }

        let html = '';
        calculationHistory.forEach((item, index) => {
            const date = new Date(item.timestamp);
            const timeStr = date.toLocaleTimeString();
            
            let content = '';
            if (item.type === 'chain') {
                content = `${item.startNumber} ÷ ${item.divisors.join(' ÷ ')} = ${item.finalResult}`;
            } else {
                content = `${item.dividend} ÷ ${item.divisor} = ${item.quotient} R${item.remainder}`;
            }
            
            const badge = item.type === 'chain' ? '<span style="background: var(--secondary-color); color: white; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; margin-right: 0.5rem;">CHAIN</span>' : '';
            
            html += `
                <div class="history-item" data-index="${index}" data-type="${item.type}">
                    <div class="history-item-content">
                        ${badge}${content}
                    </div>
                    <div class="history-item-time">${timeStr}</div>
                </div>
            `;
        });

        historyList.innerHTML = html;

        // Add click handlers to history items
        document.querySelectorAll('.history-item').forEach(item => {
            item.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                const historyItem = calculationHistory[index];
                
                if (historyItem.type === 'chain') {
                    switchMode('chain');
                    chainDividendInput.value = historyItem.startNumber;
                    chainDivisorsInput.value = historyItem.divisors.join(', ');
                } else {
                    switchMode('simple');
                    dividendInput.value = historyItem.dividend;
                    divisorInput.value = historyItem.divisor;
                }
                
                performCalculation();
            });
        });
    }

    function clearHistory() {
        if (confirm('Are you sure you want to clear all calculation history?')) {
            calculationHistory = [];
            localStorage.removeItem('divisionHistory');
            displayHistory();
        }
    }

    // Input validation - only allow numbers and decimal point
    [dividendInput, divisorInput, chainDividendInput].forEach(input => {
        input.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9.]/g, '');
            // Ensure only one decimal point
            const parts = this.value.split('.');
            if (parts.length > 2) {
                this.value = parts[0] + '.' + parts.slice(1).join('');
            }
        });
    });
    
    // Chain divisors input - allow numbers, commas, and spaces
    chainDivisorsInput.addEventListener('input', function(e) {
        this.value = this.value.replace(/[^0-9,.\s]/g, '');
    });

    // Add input animation
    [dividendInput, divisorInput, chainDividendInput, chainDivisorsInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker registration failed, but app still works
        });
    });
}

