import JwtService from '@/common/jwt.service'

export default function guest ({ next }) {
  if (JwtService.getToken()) {
    return next({ path: '/' })
  }

  return next()
}
