import { NextFunction, Request, Response } from 'express'
import { JwtAdapter } from '../../config'
import { UserModel } from '../../data'

export class AuthMiddleWares {
  static async validateToken (req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers.authorization
    if (!authorization) return res.status(401).json({error: 'token is required'})
    if (!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'Token is invalid'})

    const token = authorization.split(' ').at(1)

    try {
      // Validar token
      const payload = await JwtAdapter.verifyToken<{ id: string }>(token ?? '')
      if (!payload) return res.status(401).json({error: 'Token is not valid'})
      
      // validar usuario
      const user = await UserModel.findById(payload.id)
      if (!user) return res.status(401).json({error: 'User not found' })

      req.body.token = token
      next()
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal server error'});
    }
  }
}