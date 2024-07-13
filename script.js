document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = Array.from(document.querySelectorAll(".btn"));
    let currentInput = "";
    let previousInput = "";
    let operation = null;

    buttons.map(button => {
        button.addEventListener("click", (e) => {
            const value = e.target.innerText;

            if (!isNaN(value) || value === ".") {
                handleNumber(value);
            } else if (value === "AC") {
                handleClear();
            } else if (value === "=") {
                handleEqual();
            } else if (value === "^2") {
                handleSquare();
            } else if (value === "DEL") {
                handleBackspace();
            } else {
                handleOperation(value);
            }

            updateDisplay();
        });
    });

    function handleNumber(value) {
        if (currentInput.includes(".") && value === ".") return;
        currentInput += value;
    }

    function handleClear() {
        currentInput = "";
        previousInput = "";
        operation = null;
    }

    function handleEqual() {
        if (operation && previousInput && currentInput) {
            currentInput = operate(parseFloat(previousInput), parseFloat(currentInput), operation).toString();
            operation = null;
            previousInput = "";
        }
    }

    function handleSquare() {
        if (currentInput) {
            currentInput = (parseFloat(currentInput) ** 2).toString();
        }
    }

    function handleBackspace() {
        currentInput = currentInput.slice(0, -1);
    }

    function handleOperation(op) {
        if (currentInput === "") return;
        if (previousInput !== "") {
            handleEqual();
        }
        operation = op;
        previousInput = currentInput;
        currentInput = "";
    }

    function updateDisplay() {
        display.innerText = currentInput;
    }

    function operate(a, b, op) {
        switch (op) {
            case "+": return a + b;
            case "-": return a - b;
            case "*": return a * b;
            case "/": return b === 0 ? "error" : a / b;
            case "%": return a % b;
            default: return 0;
        }
    }
});
