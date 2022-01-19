interface IAuthenticator {
  validateToken(cookie: string, secret: string): void
  generateToken(id: string, secret: string, expiresIn: string | number): string
}

interface IAuthFactory {
  createAuthenticator(): IAuthenticator
}

export { IAuthenticator, IAuthFactory }
