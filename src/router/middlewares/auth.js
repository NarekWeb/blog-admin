import JwtService from '@/common/jwt.service'

export default function auth ({ next }) {
  if (!JwtService.getToken()) {
    JwtService.unsetToken()
    return next({ path: '/login' })
  }

  return next()
}
