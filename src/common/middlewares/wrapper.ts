export const wrapper = (callback: Function): Function => {
  console.log("test1111111: ");
  return async (): Promise<void> => {
    try {
      console.log("test2222222: ");
      return await callback();
    } catch (error) {
      console.error("에러가 발생하였습니다. \n 원인: ", error);
      throw new Error("에러가 발생하였습니다.");
    }
  };
};
