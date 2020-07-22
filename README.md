# -back-end



export const category = db.define("category", {
  /**
   * 0721 - 유진
   * 프라이머리 키를 꼭 지정해줘야한다.
   * 지정 안해주면 자동으로 id 필드명이 들어가서 Unknown column ~ 오류 발생
   */
  category_idx: { type: Sequelize.INTEGER, primaryKey: true },
  category_name: { type: Sequelize.STRING },
});

export const user = db.define("user", {
  user_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  user_name: { type: Sequelize.STRING },
  user_age: { type: Sequelize.NUMBER },
  user_email: { type: Sequelize.STRING },
  user_password: { type: Sequelize.STRING },
  user_createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  user_updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
});
