class StringCalculator {
    add(numbers) {
        if (!numbers) {
            return 0;
        }

        let delimiters = [',', '\n']; // Default delimiters

        // Check for custom delimiter
        if (numbers.startsWith("//")) {
            const delimiterEndIndex = numbers.indexOf('\n');
            const customDelimiter = numbers.substring(2, delimiterEndIndex);
            delimiters.push(customDelimiter);
            numbers = numbers.substring(delimiterEndIndex + 1);
        }

        // Create regex pattern for delimiters
        const regexPattern = new RegExp(`[${delimiters.map(d => d.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('')}]`);
        const numList = numbers.split(regexPattern);

        let sum = 0;
        const negatives = [];

        for (const num of numList) {
            if (num) {
                const number = parseInt(num, 10);
                if (number < 0) {
                    negatives.push(number);
                }
                sum += number;
            }
        }

        if (negatives.length > 0) {
            throw new Error(`negative numbers not allowed ${negatives}`);
        }

        return sum;
    }
}

// Example Usage
const calculator = new StringCalculator();

try {
    console.log(calculator.add("1\n2,3"));       // Should return 6
    console.log(calculator.add("//;\n1;2;3"));  // Should return 6
    console.log(calculator.add("4,-5,6"));      // Should throw an error
} catch (error) {
    console.error(error.message);
}
