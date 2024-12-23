import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

// Types for states
type Operator = "+" | "-" | "*" | "/" | "";
type NumberString = string;

// Calculator component
const Calculator: React.FC = () => {
  const [firstNumber, setFirstNumber] = useState<NumberString>("");
  const [secondNumber, setSecondNumber] = useState<NumberString>("");
  const [operator, setOperator] = useState<Operator>("");
  const [result, setResult] = useState<NumberString>("");

  // Handler for numbers
  const handleNumber = (num: string): void => {
    if (operator === "") {
      setFirstNumber((prev) => prev + num);
    } else {
      setSecondNumber((prev) => prev + num);
    }
  };

  // Handler for CLEAR button
  const handleClear = (): void => {
    setFirstNumber("");
    setSecondNumber("");
    setOperator("");
    setResult("");
  };

  // Last character removal handler
  const handleDelete = (): void => {
    if (operator === "") {
      setFirstNumber((prev) => prev.slice(0, -1));
    } else {
      setSecondNumber((prev) => prev.slice(0, -1));
    }
  };

  // Handler for operators
  const handleOperator = (op: Operator): void => {
    if (firstNumber && secondNumber) {
      calculateResult();
    }
    setOperator(op);
  };

  // Function to calculate the result
  const calculateResult = (): void => {
    if (firstNumber && secondNumber) {
      const firstNum = parseFloat(firstNumber);
      const secondNum = parseFloat(secondNumber);
      let calcResult: number | undefined;

      switch (operator) {
        case "+":
          calcResult = firstNum + secondNum;
          break;
        case "-":
          calcResult = firstNum - secondNum;
          break;
        case "*":
          calcResult = firstNum * secondNum;
          break;
        case "/":
          calcResult = firstNum / secondNum;
          break;
        default:
          return;
      }

      if (calcResult !== undefined) {
        const resultStr = calcResult.toString();
        setResult(resultStr);
        setFirstNumber(resultStr);
        setSecondNumber("");
        setOperator("");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.calculator}>

        <View style={styles.display}>
          <Text style={styles.displayText} numberOfLines={1} ellipsizeMode="clip">
            {secondNumber || firstNumber || result || "0"}
          </Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <Text style={styles.buttonText}>CLEAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>DEL</Text>
          </TouchableOpacity>
        </View>

        {[
          ["7", "8", "9", "/"],
          ["4", "5", "6", "*"],
          ["1", "2", "3", "-"],
        ].map((row, rowIndex) => (
          <View style={styles.row} key={`row-${rowIndex}`}>
            {row.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.button,
                  item.match(/[0-9]/) ? styles.buttonNum : null,
                  item === "5" ? styles.fiveBatton : null,
                ]}
                onPress={() =>
                  item.match(/[0-9]/)
                    ? handleNumber(item)
                    : handleOperator(item as Operator)
                }
              >
                <Text
                  style={[
                    styles.buttonText,
                    item.match(/[0-9]/) ? styles.buttonNumText : null,
                    item === "5" ? styles.fiveBattonText : null,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.buttonNum, styles.zeroButton]}
            onPress={() => handleNumber("0")}
          >
            <Text style={[styles.buttonText, styles.buttonNumText]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={calculateResult}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleOperator("+")}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#334E58",
  },

  calculator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },

  display: {
    width: "100%",
    height: 80,
    backgroundColor: "#fce8d6",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },

  displayText: {
    fontSize: 40,
    color: "#000",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 5,
  },

  button: {
    flex: 1,
    backgroundColor: "#968c8c",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 8,
  },

  buttonNum: {
    backgroundColor: "#ccc",
  },

  fiveBatton: {
    backgroundColor: "#ce9f48",
  },

  zeroButton: {
    flex: 2.1,
  },

  buttonText: {
    fontSize: 28,
    color: "#fff",
  },

  buttonNumText: {
    color: "#000",
  },

  fiveBattonText: {
    color: "#fff",
  },
});

export default Calculator;
