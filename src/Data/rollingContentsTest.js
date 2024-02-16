// 롤링페이퍼 타임캡슐 내용 테스트하기 위한 데이터

const rollingContentsTest = {
  capsule_number: "testMember1_15337",
  pcapsule_name: "테스트 0216",
  open_date: "2024-02-16T15:00:00.000Z",
  dear_name: "위트",
  theme: 1,
  rolling_data: [
    {
      id: 1,
      sender: "레나",
      content_type: 1,
      contents: [
        {
          body: "안녕",
          image_url: null,
        },
        {
          body: null,
          image_url: "../assets/arrow.png",
        },
        {
          body: null,
          image_url: "../assets/Recording_icon.png",
        },
        {
          body: "이 사진 기억나?",
          image_url: null,
        },
      ],
      align_type: "left",
    },
    {
      id: 2,
      sender: "서린",
      content_type: 2,
      contents: "../assets/조정석-01-아로하.mp3",
    },
  ],
};

export default rollingContentsTest;
