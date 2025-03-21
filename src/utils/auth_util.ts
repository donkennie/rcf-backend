import * as jwt from 'jsonwebtoken';
import { SERVER_CONST } from './common';
import { UsersUtil } from '../components/users/users_controller';
import { NextFunction, Request, Response } from 'express';
import { MemberRole, Users } from '../components/users/users_entity';

export const authorize = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Get the access token from the request headers
    const token = req.headers?.authorization ? req.headers?.authorization?.split('Bearer ')[1] as string : null;
    if (!token) {
         res.status(401).json({ statusCode: 401, status: 'error', message: 'Missing Authorization Token' });
    }

    try {
        // Verify the access token
        const decodedToken = jwt.verify(token, SERVER_CONST.JWTSECRET);
        req.user = {} as any;

        req.user.username = decodedToken['username'] ?? '';
        req.user.email = decodedToken['email'] ?? '';
        if (req.user.username) {
            const user: Users = await UsersUtil.getUserFromUsername(req.user.username);
            req.user.user_id = user.user_id;
            // const rights = await RolesUtil.getAllRightsFromRoles([user.role_id]);
            // req.user.rights = rights;
        }
        // Authorized, proceed to the next middleware
        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ statusCode: 401, status: 'error', message: 'Invalid Token' });
    }
};


export const hasPermission = (memberRole: string): boolean => {
    if (memberRole === MemberRole.Admin) {
        return true;
    } else {
        return false;
    }
};