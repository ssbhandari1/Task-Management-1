
// import { NextResponse } from 'next/server';
// import { getCookie } from '../utils/cookies';
// import { verifyToken } from '../lib/auth';

// export const middleware = async (req: Request) => {
//   const token = getCookie(req);
//   if (!token) {
//     return new NextResponse('Unauthorized', { status: 401 });
//   }

//   const decoded = verifyToken(token);
//   if (!decoded) {
//     return new NextResponse('Invalid token', { status: 401 });
//   }

//   return NextResponse.next();
// };