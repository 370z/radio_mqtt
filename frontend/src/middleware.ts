import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
const protectedPaths = require('./protectedPaths');

export async function middleware(request) {
  const userToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Get the pathname of the request
  const { pathname } = request.nextUrl
  const user = userToken?.user?.user;
  // If the pathname starts with /protected and the user is not an admin, redirect to the home page
  if (protectedPaths.some(path => pathname.startsWith(`/${path}`))   &&
    (!user || user.roles !== 'user')
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Continue with the request if the user is an admin or the route is not protected
  return NextResponse.next()
}