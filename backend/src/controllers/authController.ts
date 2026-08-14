import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both admin email and security password.',
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'suuman.maity@gmail.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'Sumanisadmin';

    if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase() || password !== adminPass) {
      return res.status(401).json({
        success: false,
        message: 'Access Denied: Invalid admin credentials.',
      });
    }

    const secret = process.env.JWT_SECRET || 'super_secret_portfolio_key_9988776655_xyz';
    const token = jwt.sign(
      { email: adminEmail, role: 'admin', authenticatedAt: new Date().toISOString() },
      secret,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      token,
      message: 'Admin authentication successful.',
      user: {
        email: adminEmail,
        role: 'admin',
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.',
      error: (error as Error).message,
    });
  }
};

export const verifySession = async (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Admin session is active and valid.',
  });
};
