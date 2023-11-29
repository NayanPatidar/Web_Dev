let valuesArray = [0, 0];

    // Function to update the array value and the box text
    function updateValue(index) {
      valuesArray[index]++;
      document.getElementById(`box${index + 1}`).innerText = `${valuesArray[index]}`;
    }
