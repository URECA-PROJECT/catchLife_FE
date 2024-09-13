import React, { useState } from "react";
import UserMainHeader from "../../components/UserMainHeader";

const OrderCustom = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    shape: "",
    size: "",
    flavor: "",
    message: "",
    cakeImage: null, // 케이크 이미지 추가
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // 파일 업로드를 처리할 경우
    if (name === "cakeImage" && files.length > 0) {
      setFormData({
        ...formData,
        cakeImage: files[0], // 첫 번째 파일만 사용
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const submitData = new FormData();
    Object.keys(formData).forEach((key) => {
      submitData.append(key, formData[key]);
    });
  };

  return (
    <div>
      <UserMainHeader title={"커스텀 케이크 주문서"} />

      <form onSubmit={handleSubmit}>
        <label className="orderLabel">
          <div>케이크 디자인</div>
          <input
            type="file"
            name="cakeImage"
            className="orderInput"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </label>

        <label className="orderLabel">
          <div>이름</div>
          <input
            type="text"
            name="name"
            className="orderInput"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="orderLabel">
          <div>연락처</div>
          <input
            type="tel"
            name="contact"
            className="orderInput"
            value={formData.contact}
            onChange={handleChange}
            required
          />
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
          <div>케이크 모양</div>
          <select
            name="shape"
            className="orderInput"
            value={formData.shape}
            onChange={handleChange}
            required
          >
            <option value="">모양을 선택하세요</option>
            <option value="circle">원형</option>
            <option value="square">사각형</option>
            <option value="heart">하트 모양</option>
          </select>
        </label>

        <label className="orderLabel">
          <div>사이즈</div>
          <select
            name="size"
            className="orderInput"
            value={formData.size}
            onChange={handleChange}
            required
          >
            <option value="">사이즈를 선택하세요</option>
            <option value="small">소</option>
            <option value="medium">중</option>
            <option value="large">대</option>
          </select>
        </label>

        <label className="orderLabel">
          <div>맛</div>
          <select
            name="flavor"
            className="orderInput"
            value={formData.flavor}
            onChange={handleChange}
            required
          >
            <option value="">맛을 선택하세요</option>
            <option value="chocolate">초콜릿</option>
            <option value="vanilla">바닐라</option>
            <option value="strawberry">딸기</option>
          </select>
        </label>

        <label className="orderLabel">
          <div>레터링 문구</div>
          <input
            type="text"
            name="message"
            className="orderInput"
            value={formData.message}
            onChange={handleChange}
          />
        </label>

        <div className="orderBtn">
          <button type="submit">주문하기</button>
        </div>
      </form>
    </div>
  );
};

export default OrderCustom;
