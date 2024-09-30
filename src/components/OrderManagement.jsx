import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OrderManagement(props) {
  const { storeID } = props;

  const [fields, setFields] = useState([]); // 새로 추가할 항목
  const [existingFields, setExistingFields] = useState([]); // 기존에 저장된 항목 (question 테이블)
  const [newFieldName, setNewFieldName] = useState(""); // 새로 추가할 항목의 이름
  const [newFieldType, setNewFieldType] = useState("text"); // 새로 추가할 항목의 입력 타입
  const [dropdownOptions, setDropdownOptions] = useState("");
  const navigate = useNavigate();

  /* 질문 = field */

  // 기존 질문 데이터 가져오기
  useEffect(() => {
    fetch(`http://localhost:8080/questions/${storeID}`)
      .then((response) => response.json())
      .then((data) => {
        const activeFields = data.filter((question) => question.isActive === 1);
        setExistingFields(activeFields);
      })
      .catch((error) => console.error("Error: ", error));
  }, [storeID]);

  // 서버로 새 필드 전송하는 함수
  function sendFieldToServer(field) {
    const formData = {
      storeID: field.storeID,
      questionText: field.label,
      questionType: field.type,
      questionContent: field.options ? JSON.stringify(field.options) : null,
      isActive: field.isActive,
    };

    fetch("http://localhost:8080/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then(() => {
        alert("주문서 항목이 저장되었습니다.");
      })
      .catch((error) => console.error("Error: ", error));
  }

  // 새 질문 추가 시 서버로 즉시 전송
  function addField() {
    if (newFieldName.trim() === "") {
      alert("항목을 입력해주세요.");
      return;
    }

    const newField = {
      type: newFieldType,
      label: newFieldName,
      storeID: storeID,
      isActive: 1,
      options:
        newFieldType === "dropdown"
          ? dropdownOptions.split(",").map((opt) => opt.trim())
          : null,
      value: "",
    };

    // 새 필드 상태 업데이트 및 서버로 전송
    setFields([...fields, newField]);
    sendFieldToServer(newField);

    // 항목 추가 버튼 클릭 후 초기화
    setDropdownOptions(""); // 드롭다운 항목 추가 후 초기화
    setNewFieldName("");
    setNewFieldType("text");
  }

  // 새로 추가된 질문 삭제
  function removeField(index) {
    const userConfirmed = window.confirm("삭제하시겠습니까?");
    if (userConfirmed) {
      const updatedFields = [...fields];
      const removedField = updatedFields.splice(index, 1); // 삭제된 필드

      setFields(updatedFields);

      if (removedField[0].id) {
        handleDeleteField(removedField[0].id); // 이미 서버에 있는 필드일 경우 삭제
      } else {
        alert("항목이 삭제되었습니다.");
      }
    }
  }

  // 기존 질문 삭제 (isActive를 0으로 업데이트)
  function handleDeleteField(id) {
    const userConfirmed = window.confirm("삭제하시겠습니까?");
    if (userConfirmed) {
      fetch(`http://localhost:8080/questions/delete/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          setExistingFields(existingFields.filter((field) => field.id !== id));
          console.log("항목이 삭제되었습니다.");
        })
        .catch((error) => console.error("Error : ", error));
    }
  }

  return (
    <div className="max-h-[80vh] overflow-y-scroll">
      {/* 항목(필드)의 이름과 유형 설정 */}
      <div className="order-field-add flex flex-wrap justify-center items-center p-4 bg-white shadow-md rounded-lg">
        <div className="flex flex-col mr-4">
          <input
            type="text"
            value={newFieldName}
            onChange={(e) => setNewFieldName(e.target.value)}
            placeholder="항목을 입력하세요."
            className="border border-gray-300 rounded-lg p-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="flex flex-col mr-4">
          <select
            className="border border-gray-300 rounded-lg p-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
            onChange={(e) => setNewFieldType(e.target.value)}
            value={newFieldType}
          >
            <option value="text">텍스트</option>
            <option value="dropdown">드롭다운</option>
          </select>
        </div>

        <div>
          {newFieldType === "text" && (
            <button
              onClick={addField}
              className="bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
            >
              항목 추가
            </button>
          )}

          {newFieldType === "dropdown" && (
            <div className="flex items-center w-full mt-4">
              <div className="flex flex-col mr-4">
                <label className="text-black font-medium">
                  드롭다운 옵션(쉼표로 구분)
                </label>
                <input
                  type="text"
                  value={dropdownOptions}
                  onChange={(e) => setDropdownOptions(e.target.value)}
                  placeholder="옵션1, 옵션2, 옵션3"
                  className="border border-gray-300 rounded-lg p-2 text-black bg-white mt-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={addField}
                  className="bg-black text-white p-2 ml-4 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                  항목 추가
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 기존 질문들 */}
      <div className="mt-4 space-y-2">
        {existingFields.map((field, index) => (
          <div
            key={index}
            className="field-item flex justify-between items-center p-4 bg-gray-100 rounded-lg"
          >
            <label className="text-black font-medium">
              {field.questionText}
            </label>

            {field.questionType === "dropdown" && (
              <select className="border p-2">
                {JSON.parse(field.questionContent || "[]").map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {field.questionType === "text" && (
              <input
                readOnly
                type="text"
                className="border p-2"
                placeholder={"텍스트 입력"}
              />
            )}

            <button
              onClick={() => handleDeleteField(field.id)}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      {/* 새로 추가된 필드들 */}
      <div className="mt-4 space-y-4">
        {fields.map((field, index) => (
          <div
            key={index}
            className="field-item flex justify-between items-center p-4 bg-gray-100 rounded-lg"
          >
            <label className="text-black font-medium">{field.label}</label>

            {field.type === "dropdown" && field.options && (
              <select className="border p-2">
                {field.options.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}

            {field.type === "text" && (
              <input
                readOnly
                type="text"
                className="border p-2"
                placeholder={"텍스트 입력"}
              />
            )}

            <button
              onClick={() => removeField(field.id)}
              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderManagement;
