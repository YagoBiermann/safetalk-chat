import type { NextApiRequest, NextApiResponse } from 'next'
import { generate } from 'generate-password'

const generateCode = () => {
  const code = generate({
    length: 12,
    numbers: true
  })
  return code
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).end('Method Not Allowed')
  }

  const code = generateCode()
  res.status(201).json({ code })
}
