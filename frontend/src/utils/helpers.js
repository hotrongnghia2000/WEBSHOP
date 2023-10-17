import jwt_decode from "jwt-decode";
import icons from "../icons";
export const splitPrice = (price) => {
  return Number(Math.round(price)).toLocaleString().split(",").join(".");
};

// function này sẽ trả về một array, vd:
// [1,2,3,4,5,6]
// [1,2,3,4,DOTS,7]
// [1,DOTS,4,5,6,7]
// [1,DOTS,10,11,DOTS,20]
// totalItem là tổng số mục cần được phân trang
// current là trang hiện tại
// sibling là số lượng trang liền  kề với current
const createArr = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (el, index) => start + index);
};
export const paginationArr = (totalItem, current, sibling = 1) => {
  const pageSize = import.meta.env.VITE_BASE_PAGINATION_SIZE;
  const paginations = Math.ceil(totalItem / pageSize);
  const length = sibling + 5;
  if (paginations <= length) return createArr(1, paginations);
  const isShowLeft = current - sibling > 2;
  const isShowRight = current + sibling < paginations - 1;
  if (isShowLeft && !isShowRight) {
    const rightStart = paginations - 4;
    const rightRange = createArr(rightStart, paginations);
    return [1, "DOTS", ...rightRange];
  }
  if (!isShowLeft && isShowRight) {
    const leftRange = createArr(1, 5);
    return [...leftRange, "DOTS", paginations];
  }

  const siblingLeft = Math.max(current - sibling, 1);
  const siblingRight = Math.min(current + sibling, paginations);
  if (isShowLeft && isShowRight) {
    const middleRange = createArr(siblingLeft, siblingRight);
    return [1, "DOTS", ...middleRange, "DOTS", paginations];
  }
};

export const showStar = (numberStar) => {
  const stars = [];
  for (let i = 0; i < numberStar; i++) {
    stars.push({
      icon: icons.IconStar,
    });
  }
  for (let i = 5; i > numberStar; i--) {
    stars.push({
      icon: icons.IconEmptyStar,
    });
  }
  return stars;
};

export const updateOjectArray = (arr, id, newObject) => {
  var index = arr.findIndex((x) => x.id === id);
  if (index !== -1)
    return [
      ...arr.slice(0, index),
      { ...arr[index], ...newObject },
      ...arr.slice(index + 1),
    ];
};

export const checkTokenIsExpire = (token) => {
  const decoded = jwt_decode(token);
  if (decoded.exp * 1000 < Date.now()) {
    return true;
  }
  return false;
};

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
