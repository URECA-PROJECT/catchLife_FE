import React, { useEffect, useState } from "react";
import "../../css/yewon.css";
import { useLocation, useNavigate } from "react-router-dom";
import UserMainHeader from "../../components/UserMainHeader";
import { useLogin } from "../../context/LoginContext";
import API from "../../utils/axios";

function EditStores(props) {
  const navigate = useNavigate();
  const { member, setMember } = useLogin();
  const location = useLocation();
  const store = location.state;
  const [profileImageFile, setProfileImageFile] = useState(
    "/assets/img/profilepicture.png"
  );
  const [storeImageFile, setStoreImageFile] = useState(
    "/assets/img/profilepicture.png"
  );
  const [categoryList, setCategoryList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [id, setId] = useState(0);
  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");
  const [closeDay, setCloseDay] = useState([]); // 휴무일 저장할 배열
  const [openTime, setOpenTime] = useState("00:00");
  const [closeTime, setCloseTime] = useState("00:00");

  useEffect(() => {
    fetch("http://localhost:8080/category")
      .then((response) => response.json())
      .then((data) => setCategoryList(data))
      .catch((error) => console.error("Error: ", error));
  }, []);
  let category = "";
  categoryList.map((c) => {
    if (store.store.categoryId == c.id) {
      category = c.name;
    }
  }, []);

  function handleCloseDayChange(e) {
    const { value, checked } = e.target; // 클릭된 체크박스의 value와 체크 상태를 가져옴

    // 체크박스가 체크된 경우 closeDay 배열에 추가하고, 체크 해제된 경우 배열에서 제거
    setCloseDay((prevCloseDay) => {
      if (checked) {
        return [...prevCloseDay, value];
      } else {
        return prevCloseDay.filter((day) => day !== value);
      }
    });
  }

  useEffect(() => {
    fetch("http://localhost:8080/region")
      .then((response) => response.json())
      .then((data) => setRegionList(data))
      .catch((error) => console.error("Error: ", error));
  }, []);
  let region = "";
  regionList.map((r) => {
    if (store.store.regionId == r.id) {
      region = r.zone + " " + r.city;
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8080/store`)
      .then((response) => response.json())
      .then((data) => {
        const selectedStore = data.find(
          (sd) => sd.storeListId === store.store.id
        );
        if (selectedStore) {
          setId(selectedStore.id);
          setAddress(selectedStore.address);
          setContent(selectedStore.content);
          setOpenTime(selectedStore.openTime);
          setCloseTime(selectedStore.closeTime);
          setStoreImageFile(selectedStore.profileImage);
          setCloseDay(
            selectedStore.closeDay ? selectedStore.closeDay.split(",") : []
          );
          handleGetStoreImage(selectedStore.profileImage);
        }
      })
      .catch((error) => console.error("Error: ", error));
  }, [store.store.id]); // 의존성 배열에 store.store.id를 추가하여 첫 렌더링 시에만 실행되도록 설정

  // 00:00 ~ 23:00 1시간 단위로 선택지를 생성
  const timeOptions = [];
  for (let i = 0; i <= 23; i++) {
    const time = i < 10 ? `0${i}:00` : `${i}:00`;
    timeOptions.push(
      <option key={time} value={time}>
        {time}
      </option>
    );
  }

  const handleGetStoreImage = (fullUrl) => {
    console.log("스토어 fullUrl", fullUrl);
    const fileName = fullUrl.split("/").pop(); // URL의 마지막 부분을 추출
    const backendUrl = `/uploads/${fileName}`; // 백엔드 URL 조합
    console.log("fileName", fileName);
    console.log(backendUrl);
    // Axios로 Blob 요청
    API.get(backendUrl, { responseType: "blob" })
      .then((response) => {
        console.log("응답상태", response);
        // 상태 코드가 200인 경우에만 Blob으로 변환
        if (response.status === 200) {
          console.log(
            "스토어 응답 데이터 타입:",
            response.data instanceof Blob
          );

          const imgURL = URL.createObjectURL(response.data); // Blob을 URL로 변환

          setStoreImageFile(imgURL);
          console.log(storeImageFile, "과연;");
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    const storeData = {
      id: id,
      store: store.store.store, // 매장명
      address: address, // 상세 주소
      closeDay: closeDay.join(","),
      openTime: openTime,
      closeTime: closeTime,
      content: content,
      image: member.profileImage,
      storeListId: store.store.id, // 매장 ID
    };

    // storeData 객체를 JSON으로 변환하여 FormData에 추가
    // formData.append("store", JSON.stringify(storeData));
    formData.append(
      "store",
      new Blob([JSON.stringify(storeData)], { type: "application/json" })
    );

    if (storeImageFile && storeImageFile.startsWith("data:image/")) {
      formData.append("profileImage", storeImageFile); // 프로필 이미지 파일 추가
    }

    // fetch로 POST 요청 보내기
    fetch("http://localhost:8080/store/saveOrUpdate", {
      method: "POST",
      body: formData, // FormData 사용
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("매장 정보 저장", data);
        alert("매장 정보가 저장되었습니다.");
        navigate("/mypage"); // 페이지 이동

        // 이미지 파일 경로 처리
        const imageFileName = data.updatedStore.profileImage.replace("./", ""); // './'를 제거
        const imageUrl = `http://localhost:8080/${imageFileName}`; // 절대 경로로 설정
        console.log("store", imageUrl);
        handleGetStoreImage(imageUrl); // 이미지 처리
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // 프로필 이미지 임시 변경 함수
  function handleImageChange(e) {
    const file = e.target.files[0]; // 파일 가져오기

    if (file) {
      const reader = new FileReader();

      reader.onload = (ev) => {
        setStoreImageFile(ev.target.result); // 이미지 src 변경
      };

      reader.readAsDataURL(file); // 파일을 읽어서 data URL로 변환
    } else {
      setProfileImageFile("/assets/img/profilePicture.png"); // 기본 이미지로 변경
    }
  }

  useEffect(() => {
    handleGetStoreImage(storeImageFile);
  }, []);

  return (
    <div>
      <UserMainHeader center={"매장 정보 수정"} />

      <div className="edit-profile max-h-[85vh] overflow-y-scroll py-10">
        <form className="yewon-form">
          <div className="edit-profile-image text-center">
            <label htmlFor="file-input">
              <img
                src={storeImageFile}
                alt="Profile"
                className="profile-picture w-6/12"
                style={{ margin: "20px auto" }}
              />
            </label>
          </div>
          <input
            id="file-input"
            className="file-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <div className="flex items-center mb-5">
            <label className="w-3/12 text-black text-lg">매장명</label>
            <input
              type="text"
              readOnly
              value={store.store.store}
              style={{ color: "gray" }}
            ></input>
          </div>
          <div className="flex items-center mb-5">
            <label className="w-3/12 text-black text-lg">업종</label>
            <input
              type="text"
              style={{ color: "gray" }}
              readOnly
              value={category}
            ></input>
          </div>
          <div className="flex items-center mb-5">
            <label className="w-3/12 text-black text-lg">지역</label>
            <input
              type="text"
              style={{ color: "gray" }}
              readOnly
              value={region}
            ></input>
          </div>
          <div className="flex items-center mb-5">
            <label className="w-3/12 text-black text-lg">상세 주소</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </div>
          <div className="flex items-center mb-5">
            <label className="w-3/12 text-black text-lg">매장 설명</label>
            <input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></input>
          </div>
          <div className="flex items-center mb-5">
            <label className="w-3/12 text-black text-lg">휴무일</label>
            <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div class="flex items-center ps-3">
                  <input
                    id="mon-checkbox-list"
                    type="checkbox"
                    value="월요일"
                    checked={closeDay.includes("월요일")}
                    onChange={handleCloseDayChange}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="mon-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    style={{ marginTop: "3px" }}
                  >
                    월
                  </label>
                  <input
                    id="tue-checkbox-list"
                    type="checkbox"
                    value="화요일"
                    checked={closeDay.includes("화요일")}
                    onChange={handleCloseDayChange}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="tue-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    style={{ marginTop: "3px" }}
                  >
                    화
                  </label>
                  <input
                    id="wed-checkbox-list"
                    type="checkbox"
                    value="수요일"
                    checked={closeDay.includes("수요일")}
                    onChange={handleCloseDayChange}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="wed-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    style={{ marginTop: "3px" }}
                  >
                    수
                  </label>
                  <input
                    id="thu-checkbox-list"
                    type="checkbox"
                    value="목요일"
                    checked={closeDay.includes("목요일")}
                    onChange={handleCloseDayChange}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="thu-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    style={{ marginTop: "3px" }}
                  >
                    목
                  </label>
                  <input
                    id="fri-checkbox-list"
                    type="checkbox"
                    value="금요일"
                    checked={closeDay.includes("금요일")}
                    onChange={handleCloseDayChange}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="fri-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    style={{ marginTop: "3px" }}
                  >
                    금
                  </label>
                  <input
                    id="sat-checkbox-list"
                    type="checkbox"
                    value="토요일"
                    checked={closeDay.includes("토요일")}
                    onChange={handleCloseDayChange}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="sat-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    style={{ marginTop: "3px" }}
                  >
                    토
                  </label>
                  <input
                    id="sun-checkbox-list"
                    type="checkbox"
                    value="일요일"
                    checked={closeDay.includes("일요일")}
                    onChange={handleCloseDayChange}
                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="sun-checkbox-list"
                    class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    style={{ marginTop: "3px" }}
                  >
                    일
                  </label>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex items-center mb-5">
            <label
              style={{ marginTop: "15px" }}
              className="w-3/12 text-black text-lg"
            >
              오픈 / 마감
            </label>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "baseline",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <select
                value={openTime}
                onChange={(e) => setOpenTime(e.target.value)}
              >
                {timeOptions}
              </select>
              <span style={{ margin: "10px" }}>&nbsp;~&nbsp;</span>
              <select
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
              >
                {timeOptions}
              </select>
            </div>
          </div>
          <div className="button-container" style={{ width: "100%" }}>
            <button
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition duration-300 ease-in-out"
              type="submit"
              onClick={handleSubmit}
            >
              완료
            </button>
            <button
              className="border border-black text-black bg-white px-6 py-2 rounded-lg hover:bg-black hover:text-white transition duration-300 ease-in-out"
              type="button"
              onClick={() => navigate("/mypage")}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStores;
