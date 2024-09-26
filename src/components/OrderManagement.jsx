import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function OrderManagement(props) {

    const [fields, setFields] = useState([]);
    const [newFieldName, setNewFieldName] = useState(''); // 새로 추가할 항목의 이름
    const [newFieldType, setNewFieldType] = useState('text');  // 새로 추가할 항목의 입력 타입
    const [dropdownOptions, setDropdownOptions] = useState('');
    const navigate = useNavigate();

    // 항목 추가
    function addField() {
        // 새로 추가할 필드의 이름과 유형이 반드시 있어야 추가되도록 함
        if (newFieldName.trim() === '') {
            alert('항목의 이름을 입력해주세요.')
            return;
        }

        const newField = {
            type: newFieldType,
            label: newFieldName,
            value: ''
        }
        
        if (newFieldType === 'dropdown') {
            newField.options = dropdownOptions.split(',').map(opt => opt.trim());
        }


        // 항목 추가 버튼 클릭 후 초기화
        setFields([...fields, newField]);
        setDropdownOptions(''); // 드롭다운 항목 추가 후 초기화
        setNewFieldName('');
        setNewFieldType('text');
    }

    // 필드 값 업데이트
    function handleFieldChange(index, value) {
        const updatedFields = [...fields];
        updatedFields[index].value = value;
        setFields(updatedFields);
    }

    // 필드 삭제
    function removeField(index) {
        setFields(fields.filter((_, i) => i !== index));
    }

    // 양식 저장 (서버로 전송)
    function handleSave() {

    }

    // 취소 버튼 클릭 시 처리
    const handleCancel = async () => {
        const userConfirmed = window.confirm('변경 사항을 저장하시겠습니까?');

        if (userConfirmed) {
            // "예" 누를 경우 저장 후 이전 페이지로 이동
            await handleSave();
            navigate(-1);
        } else {
            // "아니오" 누를 경우 저장하지 않고 이전 페이지로 이동
            navigate(-1);
        }
    }


    return (
        <div>
            
            {/* 항목(필드)의 이름과 유형 설정 */}
            <div className='order-field-add flex justify-center items-center space-x-4 p-4 bg-white shadow-md rounded-lg'>
                <div className="flex flex-col">
                    <input
                        type="text"
                        value={newFieldName}
                        onChange={(e) => setNewFieldName(e.target.value)}
                        placeholder='항목을 입력하세요.'
                        className='border border-gray-300 rounded-lg p-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black'
                    />
                </div>

                <div className="flex flex-col">
                    <select
                        className='border border-gray-300 rounded-lg p-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black'
                        onChange={(e) => setNewFieldType(e.target.value)}
                        value={newFieldType}
                    >
                        <option value="text">텍스트</option>
                        <option value="date">날짜</option>
                        <option value="dropdown">드롭다운</option>
                        <option value="file">파일 업로드</option>
                    </select>
                </div>

                {newFieldType === 'dropdown' && (
                    <div className="flex flex-col">
                        <label className='text-black font-medium'>드롭다운 옵션(쉼표로 구분)</label>
                        <input
                            type="text"
                            value={dropdownOptions}
                            onChange={(e) => setDropdownOptions(e.target.value)}
                            placeholder='옵션1, 옵션2, 옵션3'
                            className='border border-gray-300 rounded-lg p-2 text-black bg-white mt-2 focus:outline-none focus:ring-2 focus:ring-black'
                        />
                    </div>
                )}

                <button 
                    onClick={addField}
                    className='bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out'
                >
                    항목 추가
                </button>
            </div>

            <div className="mt-4 space-y-4">
                {fields.map((field, index) => (
                    <div key={index} className="field-item flex flex-col p-4 bg-gray-100 rounded-lg">
                        <label className='text-black font-medium'>{field.label}</label>

                        {/* 텍스트 필드 */}
                        {field.type === 'text' && (
                            <input
                                type="text"
                                value={field.value}
                                onChange={(e) => handleFieldChange(index, e.target.value)}
                                className='border border-gray-300 rounded-lg p-2 mt-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black'
                            />
                        )}

                        {/* 날짜 필드 */}
                        {field.type === 'date' && (
                            <input
                                type="date"
                                value={field.value}
                                onChange={(e) => handleFieldChange(index, e.target.value)}
                                className='border border-gray-300 rounded-lg p-2 mt-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black'
                            />
                        )}

                        {/* 드롭다운 필드 */}
                        {field.type === 'dropdown' && (
                            <select
                                value={field.value}
                                onChange={(e) => handleFieldChange(index, e.target.value)}
                                className='border border-gray-300 rounded-lg p-2 mt-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black'
                            >
                                <option value="">선택하세요</option>
                                {field.options.map((option, i) => (
                                    <option key={i} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}

                        {/* 파일 업로드 필드 */}
                        {field.type === 'file' && (
                            <input
                                type="file"
                                onChange={(e) => handleFieldChange(index, e.target.files[0])}
                                className='border border-gray-300 rounded-lg p-2 mt-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-black'
                            />
                        )}

                        <button
                            onClick={() => removeField(index)}
                            className='mt-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 transition duration-300 ease-in-out'
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>

            {/* 양식 제출 */}
            <div className="flex justify-center space-x-4 mt-6">
                {/* 저장 버튼 */}
                <button
                    onClick={() => {
                        const userConfirmed = window.confirm('저장하시겠습니까?');

                        if (userConfirmed) {
                            // '확인'을 누르면 서버로 양식 전송
                            handleSave();
                        } else {
                            // '취소' 누르면 알림창 닫힘
                        }
                    }}
                    className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
                >
                    저장
                </button>

                {/* 취소 버튼 */}
                <button
                    onClick={handleCancel}
                    className="border border-black text-black bg-white px-6 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300 ease-in-out"
                >
                    취소
                </button>
            </div>
            </div>
    );
}

export default OrderManagement;