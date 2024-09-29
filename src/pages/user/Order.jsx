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

        console.log(data);
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

  // 최종 예약
  const handleSubmit = (e) => {
    e.preventDefault();

    setFormData((prevFormData) => {
      const newContent =
        typeof prevFormData.content === "object"
          ? JSON.stringify(prevFormData.content) // content가 객체인 경우에만 문자열로 변환
          : prevFormData.content; // 이미 문자열이라면 그대로 사용

      return {
        ...prevFormData,
        content: newContent,
      };
    });

    API.post(`/orders`, formData)
      .then((response) => {
        if (response.status === 200) {
          alert("예약 완료되었습니다.");
          navigate("/"); // 회원가입 후 메인 페이지로 이동
        } else {
          alert("예약 실패");
        }
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  return (
    <div>
      <UserMainHeader center={product.name} />
      {/* <img src={product.image} alt=''className="w-11/12 mx-auto rounded-xl" /> */}
      <img
        src={images.nailStore}
        alt=""
        className="w-11/12 mx-auto rounded-xl"
      />

      <form onSubmit={handleSubmit} className="py-5">
        {/* default */}
        <label className="orderLabel">
          <div>이름</div>
          <div>{member.name}</div>
        </label>

        <label className="orderLabel">
          <div>연락처</div>
          <div>{member.phone}</div>
        </label>

        <label className="orderLabel">
          <div>날짜</div>
          <input
            type="date"
            name="date"
            className="orderInput"
            value={formData.date}
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
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>
        {/* default */}

        {questions?.map((q) => (
          <>
            {/* 텍스트 */}
            {q.questions_type === "text" ? (
              <label className="orderLabel">
                <div>{q.question_text}</div>
                <input
                  type={q.question_type}
                  name={q.question_text}
                  className="orderInput"
                  value={formData.content[q.question_text] || ""} // 해당 질문에 대한 값을 content에서 가져옴
                  onChange={handleContentChange}
                  required
                />
              </label>
            ) : (
              <label className="orderLabel">
                <div>{q.question_text}</div>
                <select
                  name={q.question_text}
                  className="orderInput"
                  value={formData.content[q.question_text] || ""} // 해당 질문에 대한 값을 content에서 가져옴
                  onChange={handleContentChange}
                  required
                >
                  <option value="default" disabled>
                    옵션을 선택해주세요.
                  </option>
                  {JSON.parse(q.question_content)?.map((menu) => (
                    <option value={menu}>{menu}</option>
                  ))}
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
  );
};

export default Order;
