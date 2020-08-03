// import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import { KakaoAuthMutationArgs } from '../../types/graph';
// import { User, Image } from '../../db/index';

// export default {
//   Mutation: {
//     kakaoAuth: async (_: any, args: KakaoAuthMutationArgs) => {
//       const SECRET_KEY = process.env.JWT_SECRET_KEY!;
//       const { code } = args;
//       try {
//         const response = await axios.get(
//           `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.KAKAO_KEY}&redirect_uri=${process.env.KAKAO_CALLBACK}&code=${code}&client_secret=${process.env.KAKAO_SECRET}`,
//         );
//         const {
//           data: { access_token },
//         } = response;
//         const profileRequest = await axios.get('https://kapi.kakao.com/v2/user/me', {
//           headers: { Authorization: `Bearer ${access_token}` },
//         });
//         const {
//           data: {
//             properties: { nickname },
//             kakao_account: {
//               email,
//               profile: {
//                 profile_image_url = 'https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png',
//               },
//             },
//           },
//         } = profileRequest;
//         if (email) {
//           const user = await User.findOne({ where: { user_email: email } });
//           if (user) {
//             const jwtToken = jwt.sign({ user }, SECRET_KEY, {
//               expiresIn: '4h',
//             });
//             return jwtToken;
//           } else {
//             const image_result = await Image.create({
//               image_idx: '',
//               image_url: profile_image_url,
//             });
//             const newUser = await User.create({
//               user_idx: '',
//               user_name: nickname,
//               user_email: email,
//               user_profile_image: image_result.image_idx,
//               user_password: '',
//             });
//             const jwtToken = jwt.sign({ newUser }, SECRET_KEY, {
//               expiresIn: '4h',
//             });
//             return jwtToken;
//           }
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     },
//   },
// };
