import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";

function ContractBtns() {
  const { state: { contract, accounts } } = useEth();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
    if (/^\d+$|^$/.test(e.target.value)) {
      setInputValue(e.target.value);
    }
  };

  const read = async () => {
    try {
      const index = await contract.methods.getStudentCount().call({ from: accounts[0] });
      console.log(index);
      const value = await contract.methods.getStudents().call({ from: accounts[0] });
      console.log(value);
    } catch (err) {
      console.error(err.message);
    }
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = parseInt(inputValue);
    await contract.methods.write(newValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns" style={{ paddingTop: '100px' }}>

      <button onClick={read}>
        read()
      </button>

      {/* <div onClick={write} className="input-btn">
        write(<input
          type="text"
          placeholder="uint"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div> */}

    </div>
  );
}

export default ContractBtns;
