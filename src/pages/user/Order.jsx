import React, { useState } from "react";
import UserMainHeader from "../../components/UserMainHeader";
import { useLocation } from "react-router-dom";

const Order = () => {
  const location = useLocation();
  const { key, img, title, price } = location?.state || {};

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    date: "",
    shape: "",
    size: "",
    flavor: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div>
      <UserMainHeader title={"주문서"} />
      <div className="orderTitle">
        <img src={img} alt={title} />
        <h2>{title}</h2>
        <p>가격 {price}</p>
      </div>

      <form onSubmit={handleSubmit}>
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

export default Order;
