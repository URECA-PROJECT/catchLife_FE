import React, { useEffect, useState } from "react";
import UserMainHeader from "../../components/UserMainHeader";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../utils/axios";
import { images } from "../../utils/images";
import { useLogin } from "../../context/LoginContext";

const Order = () => {
  const navigate = useNavigate();
  const param = useParams();
  const urlStoreId = param.storeId;
  const urlProductId = param.productId;
  const { member } = useLogin();

  const [questions, setQuestions] = useState([]);
  const [product, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    memberId: 0,
    storeId: 0,
    productId: 0,
    date: 0,
    time: 0,
    content: "",
  });

  useEffect(() => {
    // 매장 질문 조회
    API.get(`/questions/${urlStoreId}`)
      .then((response) => {
        const data = response.data;
        setQuestions(data);

        console.log("question", data);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });

    // 매장 상품 조회
    API.get(`/products/${urlStoreId}/${urlProductId}`)
      .then((response) => {
        const data = response.data;
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });

    // 기본정보 담기
    setFormData({
      ...formData,
      memberId: member.id,
      storeId: urlStoreId,
      productId: urlProductId,
    });
  }, []);

  // Default
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // questions - content에 담기
  const handleContentChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      content: {
        ...prevFormData.content,
        [name]: value,
      },
    }));
  };
  console.log(formData)

  // 최종 예약
  const handleSubmit = async (e) => {
    e.preventDefault();

    const preparedContent = typeof formData.content === "object"
        ? JSON.stringify(formData.content)
        : formData.content;

    // 준비된 formData를 가져옴
    const dataToSend = {
        ...formData,
        content: preparedContent,
    };

    console.log("dataToSend : ", dataToSend)

    // POST 요청
    fetch(`http://localhost:8080/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (response.ok) {
          alert("예약이 완료되었습니다.");
          navigate("/"); // 예약 완료 후 메인 페이지로 이동
        } else {
          alert("예약이 정상적으로 처리되지 않았습니다.");
        }
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  return (
    <div>
      <UserMainHeader center={product.name} />
      <div>
        {/* <img src={product.image} alt=''className="w-9/12 mx-auto rounded-xl" /> */}
        <img
          src={images.nailStore}
          alt=""
          className="w-9/12 mx-auto rounded-xl"
        />

        <form onSubmit={handleSubmit} className="py-5  mx-auto ">
          {/* default */}
          <label className="orderLabel">
            <div>이름</div>
            <div>{member?.name}</div>
          </label>

          <label className="orderLabel">
            <div>연락처</div>
            <div>{member?.phone}</div>
          </label>

          <label className="orderLabel">
            <div>날짜</div>
            <input
              type="date"
              name="date"
              className="orderInput"
              value={formData?.date}
              onChange={handleChange}
              required
            />
          </label>

          <label className="orderLabel">
            <div>시간</div>
            <input
              type="time"
              name="time"
              className="orderInput"
              value={formData?.time}
              onChange={handleChange}
              required
            />
          </label>

          {/* default */}

          {questions?.map((q) => (
            <>
              {/* 텍스트 */}
              {q.questionType == "text" ? (
                <label className="orderLabel">
                  <div>{q.questionText}</div>
                  <input
                    type='text'
                    name={q.questionText}
                    className="orderInput"
                    value={formData.content[q.questionText] || ""} // 해당 질문에 대한 값을 content에서 가져옴
                    onChange={handleContentChange}
                    required
                  />
                </label>
              ) : (
                <label className="orderLabel">
                  <div>{q.questionText}</div>
                  <select
                    name={q.questionText}
                    className="orderInput"
                    value={formData.content[q.questionText] || ""} // 해당 질문에 대한 값을 content에서 가져옴
                    onChange={handleContentChange}
                    required
                  >
                    <option value="default" disabled>
                      옵션을 선택해주세요.
                    </option>
                    {q.questionContent
                      ? JSON.parse(q.questionContent).map((menu) => (
                          <option value={menu} key={menu}>
                            {menu}
                          </option>
                        ))
                      : null}
                  </select>
                </label>
              )}
            </>
          ))}

          <p className="orderLabel text-[red]">
            <div>최종 가격</div>
            {product.price}원
          </p>

          <div className="orderBtn bg-[#ededed] w-10/12 mx-auto rounded-2xl p-2">
            <button type="submit">예약하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Order;
